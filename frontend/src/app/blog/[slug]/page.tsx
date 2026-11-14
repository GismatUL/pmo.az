import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/BlogList";
import { CtaBand } from "@/components/CtaBand";
import { getLinks } from "@/lib/api";
import { ProgramCard } from "@/components/ProgramCard";
import { ShareLinks } from "@/components/ShareLinks";
import { getPostWithRelated, getPosts } from "@/lib/api";
import { longDate, shortDate } from "@/lib/posts";
import { asset } from "@/lib/asset";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPostWithRelated(slug))?.post;
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const found = await getPostWithRelated(slug);
  if (!found) notFound();
  const { post, related } = found;

  return (
    <div className="inner">
      {/* Article header — 16:496 */}
      <section className="section bg-green article-header">
        <nav className="t-label c-cream page-hero__crumb" aria-label="Breadcrumb">
          <Link href="/">Ana səhifə</Link>
          {"  /  "}
          <Link href="/blog">Bloq</Link>
          {"  /  "}
          <span aria-current="page">{post.category}</span>
        </nav>
        <h1 className="t-display c-white">{post.title}</h1>
        <p className="t-label c-cream">{`${post.kind}  ·  ${longDate(post.date)}  ·  PMO.az`}</p>
      </section>

      {/* Article body — 16:497 */}
      <section className="section bg-cream article-body">
        {post.image && (
          <figure className="article-figure">
            <img src={asset(post.image)} alt={post.imageCaption ?? post.title} width={1600} height={900} />
            {post.imageCaption && <figcaption className="t-label c-muted">{post.imageCaption}</figcaption>}
          </figure>
        )}
        <div className="article-layout">
          <div className="article-text c-ink">
            {post.body?.length ? (
              post.body.map((b, i) =>
                b.type === "image" ? (
                  <img className="article-inline-img" key={i} src={asset(b.src)} alt={b.alt ?? ""} loading="lazy" />
                ) : b.type === "h2" ? (
                  <h2 className="t-h2" key={i}>
                    {b.text}
                  </h2>
                ) : (
                  <p className="t-body" key={i}>
                    {b.text}
                  </p>
                ),
              )
            ) : (
              <p className="t-body">{post.excerpt ?? "Məqalənin tam mətni tezliklə dərc olunacaq."}</p>
            )}
            {post.tags && (
              <ul className="article-tags t-label c-muted">
                {post.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            <div className="article-share">
              <p className="t-label c-muted">MƏQALƏNİ PAYLAŞ</p>
              <ShareLinks />
            </div>
          </div>
          <aside className="article-aside">
            {post.toc && (
              <div className="toc-card">
                <p className="t-h2 c-ink">Bu yazıda</p>
                <ul className="t-body c-muted">
                  {post.toc.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
            <ProgramCard
              meta="ƏLAQƏLİ PROQRAM"
              title="IPMA ICB4"
              text="Kompetensiyalarınızı beynəlxalq təcrübə ilə inkişaf etdirin."
              action="pmu.az-da ətraflı"
            />
          </aside>
        </div>
      </section>

      {/* Related articles — 16:498 */}
      <section className="section bg-white stack-32">
        <h2 className="t-h1 c-ink">Oxumağa davam edin</h2>
        <div className="article-grid">
          {related.map((p) => (
            <ArticleCard key={p.slug} post={p} label={shortDate(p.date)} action="Məqaləni oxu" short />
          ))}
        </div>
      </section>

      <CtaBand
        title="Bilik paylaşdıqca dəyərlənir."
        text="Daha çox təcrübə və müzakirə üçün icmamıza qoşulun."
        label="Telegram-a keç"
        href={(await getLinks()).telegram ?? "/contact"}
      />
    </div>
  );
}
