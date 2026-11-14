/**
 * Content layer. At build time (static export) every page reads from the
 * Laravel API in backend/ when PMO_API_URL is set, e.g.
 *   PMO_API_URL=http://127.0.0.1:8000/api/v1 npm run build
 * Without it — or if the API is unreachable — the bundled design content in
 * lib/*.ts is used, so the frontend always builds on its own.
 */
import type { FilterableProgram } from "@/components/ProgramFilter";
import { CATALOGUE, FEATURED_PROGRAMS } from "./programs";
import { FEATURED_SLUG, getPost as getLocalPost, POSTS, type Block, type Post } from "./posts";
import { CONSULTING, PILLARS, type ConsultingService, type Pillar } from "./services";
import { CONTACT } from "./site";

const API = process.env.PMO_API_URL?.replace(/\/+$/, "");

async function get<T>(path: string): Promise<T | null> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}${path}`, { headers: { Accept: "application/json" }, cache: "force-cache" });
    if (!res.ok) {
      if (res.status !== 404) console.warn(`[api] ${path} → ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[api] ${path} unreachable, using bundled content`, (error as Error).message);
    return null;
  }
}

/* ---------- Posts ---------- */

type ApiPost = {
  slug: string;
  category: Post["category"];
  kind: string;
  title: string;
  short_title: string | null;
  excerpt: string | null;
  image: string | null;
  image_caption: string | null;
  is_featured: boolean;
  date: string | null;
  body?: Block[];
  toc?: string[] | null;
  tags?: string[] | null;
};

const toPost = (p: ApiPost): Post => ({
  slug: p.slug,
  category: p.category,
  kind: p.kind,
  date: p.date ?? "",
  title: p.title,
  shortTitle: p.short_title ?? undefined,
  excerpt: p.excerpt ?? undefined,
  image: p.image ?? undefined,
  imageCaption: p.image_caption ?? undefined,
  featured: p.is_featured,
  body: p.body,
  toc: p.toc ?? undefined,
  tags: p.tags ?? undefined,
});

export async function getPosts(): Promise<Post[]> {
  const res = await get<{ data: ApiPost[] }>("/posts?per_page=50");
  return res ? res.data.map(toPost) : POSTS;
}

export async function getFeaturedPost(posts: Post[]): Promise<Post> {
  return posts.find((p) => p.featured) ?? posts.find((p) => p.slug === FEATURED_SLUG) ?? posts[0];
}

export async function getPostWithRelated(slug: string): Promise<{ post: Post; related: Post[] } | null> {
  const res = await get<{ data: ApiPost; related: ApiPost[] }>(`/posts/${encodeURIComponent(slug)}`);
  if (res) return { post: toPost(res.data), related: res.related.map(toPost) };
  if (API) return null;

  const post = getLocalPost(slug);
  if (!post) return null;
  const related = post.related?.length
    ? post.related.map(getLocalPost).filter((p): p is Post => Boolean(p))
    : POSTS.filter((p) => p.slug !== slug).slice(0, 2);
  return { post, related };
}

/* ---------- Programs ---------- */

type ApiProgram = {
  slug: string;
  family: string;
  meta: string;
  title: string;
  summary: string;
  home_meta: string | null;
  home_summary: string | null;
  price: number | null;
  price_note: string;
  url: string | null;
};

const priceLabel = (p: ApiProgram) =>
  p.price !== null ? `${p.price.toLocaleString("az-AZ", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ₼` : p.price_note;

export async function getCatalogue(): Promise<FilterableProgram[]> {
  const res = await get<{ data: ApiProgram[] }>("/programs");
  return res
    ? res.data.map((p) => ({ family: p.family, meta: p.meta, title: p.title, text: p.summary, price: priceLabel(p), href: p.url ?? undefined }))
    : CATALOGUE;
}

export async function getFeaturedPrograms(): Promise<FilterableProgram[]> {
  const res = await get<{ data: ApiProgram[] }>("/programs?featured=1");
  return res
    ? res.data.map((p) => ({
        family: p.family,
        meta: p.home_meta ?? p.meta,
        title: p.title,
        text: p.home_summary ?? p.summary,
        price: priceLabel(p),
        href: p.url ?? undefined,
      }))
    : FEATURED_PROGRAMS;
}

/* ---------- Services ---------- */

type ApiPillar = {
  slug: string;
  title: string;
  summary: string;
  home_summary: string | null;
  highlights: string[];
  link_label: string | null;
  link_url: string | null;
};
type ApiConsulting = {
  n: string;
  slug: string;
  title: string;
  crumb: string;
  summary: string;
  intro: string | null;
  detail: Record<string, unknown> | null;
};

const toConsulting = (c: ApiConsulting): ConsultingService => {
  const d = c.detail as Record<string, never> | null;
  return {
    n: c.n,
    slug: c.slug,
    title: c.title,
    crumb: c.crumb,
    summary: c.summary,
    intro: c.intro ?? undefined,
    detail: d
      ? {
          heroTitle: d.hero_title,
          intro: c.intro ?? c.summary,
          eyebrow: d.eyebrow,
          purposeTitle: d.purpose_title,
          purpose: d.purpose,
          outcomes: d.outcomes,
          processTitle: d.process_title,
          process: d.process,
          experienceTitle: d.experience_title,
          experience: d.experience,
          ctaTitle: d.cta_title,
          ctaText: d.cta_text,
        }
      : undefined,
  };
};

export async function getServices(): Promise<{ pillars: Pillar[]; consulting: ConsultingService[] }> {
  const res = await get<{ data: { pillars: ApiPillar[]; consulting: ApiConsulting[] } }>("/services");
  if (!res) return { pillars: PILLARS, consulting: CONSULTING };
  return {
    pillars: res.data.pillars.map((p, i) => ({
      n: String(i + 1).padStart(2, "0"),
      slug: p.slug,
      title: p.title,
      text: p.summary,
      homeText: p.home_summary ?? p.summary,
      items: p.highlights,
      link: p.link_label ?? "Daha ətraflı",
      href: p.link_url ?? "/services",
    })),
    consulting: res.data.consulting.map(toConsulting),
  };
}

export async function getConsulting(slug: string): Promise<ConsultingService | null> {
  const res = await get<{ data: ApiConsulting }>(`/services/${encodeURIComponent(slug)}`);
  if (res) return toConsulting(res.data);
  return API ? null : (CONSULTING.find((s) => s.slug === slug) ?? null);
}

/* ---------- Site-wide ---------- */

export type Stat = { value: string; label: string };
export type Book = { title: string; format: string; price: string };

const STATS: Stat[] = [
  { value: "2000+", label: "məzun" },
  { value: "500+", label: "sertifikasiya" },
  { value: "100+", label: "həyata keçirilən layihə" },
  { value: "50+", label: "ekspert və təlimçi" },
];

const BOOKS: Book[] = [
  { title: "Layihə Jurnalı", format: "Elektron kitab", price: "60 ₼" },
  { title: "Layihə menecerinin yol xəritəsi", format: "Elektron kitab", price: "9,90 ₼" },
  { title: "Fərdi kompetensiya əsasları — Cild 1", format: "Elektron kitab", price: "19,90 ₼" },
];

export async function getStats(): Promise<Stat[]> {
  const res = await get<{ data: { stats: Stat[] } }>("/site");
  return res?.data.stats.length ? res.data.stats : STATS;
}

export async function getContact(): Promise<typeof CONTACT> {
  const res = await get<{ data: { settings: Record<string, string | null> } }>("/site");
  const s = res?.data.settings;
  if (!s) return CONTACT;
  return {
    phone: (s.phone ?? CONTACT.phone).replace(/-(\d+)$/, "‑$1"),
    phoneHref: s.phone_href ? `tel:${s.phone_href}` : CONTACT.phoneHref,
    email: s.email ?? CONTACT.email,
    address: [s.address_line1 ?? CONTACT.address[0], s.address_line2 ?? CONTACT.address[1]],
    hours: s.hours ?? CONTACT.hours,
  };
}

export type Links = { linkedin?: string; instagram?: string; youtube?: string; telegram?: string; maps?: string };

/** Social / external links managed in the CMS (Parametrlər). Unset links render as plain text. */
export async function getLinks(): Promise<Links> {
  const res = await get<{ data: { settings: Record<string, string | null> } }>("/site");
  const s = res?.data.settings ?? {};
  const v = (k: string) => s[k] || undefined;
  return {
    linkedin: v("linkedin_url"),
    instagram: v("instagram_url"),
    youtube: v("youtube_url"),
    telegram: v("telegram_url"),
    maps: v("maps_url") ?? "https://www.google.com/maps/search/?api=1&query=8+Noyabr+prospekti+25+Bak%C4%B1",
  };
}

export async function getBooks(): Promise<Book[]> {
  const res = await get<{ data: Array<{ title: string; format: string; price: number | null }> }>("/books");
  if (!res) return BOOKS;
  return res.data.slice(0, 3).map((b) => ({
    title: b.title,
    format: b.format,
    price: b.price !== null ? `${b.price.toLocaleString("az-AZ", { maximumFractionDigits: 2, minimumFractionDigits: b.price % 1 ? 2 : 0 })} ₼` : "",
  }));
}
