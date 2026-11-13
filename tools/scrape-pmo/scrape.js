// Builds structured seed data (JSON) from the downloaded pmo.az pages.
// usage: node scrape.js <outDir>
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const DIR = __dirname;
const OUT = process.argv[2];
const text = (f) => execSync(`node "${path.join(DIR, "extract.js")}" "${path.join(DIR, f)}"`, { encoding: "utf8" }).split("\n");
const slugOf = (f) => f.replace(/^[a-z]+_/, "").replace(/\.html$/, "");
const images = new Set();
const img = (l) => {
  const m = l.match(/^\[IMG (\S.*)\]$/);
  if (!m) return null;
  images.add(m[1]);
  return m[1];
};
const isDate = (l) => /^\d{2}\.\d{2}\.\d{4}$/.test(l);
const iso = (d) => d.split(".").reverse().join("-");

// ---------- News / blog posts ----------
const listing = text("home.html").concat(text("news.html"), fs.existsSync(path.join(DIR, "news_page_2.html")) ? text("news_page_2.html") : []);
const coverByTitle = {};
for (let i = 0; i < listing.length; i++) {
  const c = img(listing[i]);
  if (c && isDate(listing[i + 1] || "")) coverByTitle[listing[i + 2]] = { cover: c, date: iso(listing[i + 1]) };
}

const classify = (t) => {
  if (/^\p{Lu}\p{Ll}+ \p{Lu}\p{Ll}+ ilə /u.test(t)) return "Müsahibələr";
  if (/workshop|günü|layihəmiz|tədbir/i.test(t)) return "Tədbirlər";
  if (/start verdik|statusunu|akkredit/i.test(t)) return "Xəbərlər";
  return "Məqalələr";
};

const posts = [];
for (const f of fs.readdirSync(DIR).filter((f) => /^news_(?!page).+\.html$/.test(f))) {
  const L = text(f);
  const h = L.findIndex((l) => l.startsWith("## "));
  if (h < 0) continue;
  const title = L[h].slice(3).trim();
  const body = [];
  let cover = null;
  let date = null;
  for (let i = h + 1; i < L.length; i++) {
    const l = L[i];
    if (isDate(l)) {
      date = iso(l);
      break;
    }
    const im = img(l);
    if (im) {
      if (!cover) cover = im;
      else body.push({ type: "image", src: im });
      continue;
    }
    if (l.startsWith("## ")) body.push({ type: "h2", text: l.slice(3) });
    else body.push({ type: "p", text: l });
  }
  const meta = Object.entries(coverByTitle).find(([t]) => title.startsWith(t.replace(/\s*\.\.\.$/, "").trim()));
  const category = classify(title);
  posts.push({
    slug: slugOf(f),
    title,
    category,
    published_at: date || meta?.[1].date || null,
    cover: cover || meta?.[1].cover || null,
    excerpt: (body.find((b) => b.type === "p")?.text || "").slice(0, 220),
    body,
    source_url: `https://pmo.az/az/news/${slugOf(f)}`,
  });
}
posts.sort((a, b) => (b.published_at || "").localeCompare(a.published_at || ""));

// ---------- Experts ----------
const experts = [];
for (const f of fs.readdirSync(DIR).filter((f) => /^experts_.+\.html$/.test(f))) {
  const L = text(f);
  const h = L.findIndex((l) => l.startsWith("## "));
  const name = L[h].slice(3).trim();
  const photo = img(L[h + 1] || "");
  const rawPos = L[h + (photo ? 2 : 1)] || "";
  const position = rawPos.startsWith("## ") || /^Şəxsi səhifə/.test(rawPos) ? null : rawPos;
  const articles = [];
  const b = L.indexOf("PMO.az Blog yazıları", h);
  if (b > 0 && b < h + 8) {
    for (let i = b + 1; i < L.length && !L[i].startsWith("[IMG"); i++) articles.push(L[i]);
  }
  const titleCase = name
    .toLocaleLowerCase("az")
    .split(/\s+/)
    .map((w) => w.charAt(0).toLocaleUpperCase("az") + w.slice(1))
    .join(" ");
  experts.push({ slug: slugOf(f), name: titleCase, position, photo, articles, source_url: `https://pmo.az/az/experts/${slugOf(f)}` });
}
const order = ["resad-ibrahimov"];
experts.sort((a, b) => (order.includes(b.slug) ? 1 : 0) - (order.includes(a.slug) ? 1 : 0) || a.name.localeCompare(b.name, "az"));

// ---------- Long-form pages (services, about, greenpm …) ----------
const STOP = /^(\[IMG \/images\/partners|MÜRACİ|Videokursu al|Kitabı al)/;
const section = (f, firstHeading = 0) => {
  const L = text(f);
  const hs = L.map((l, i) => (l.startsWith("## ") ? i : -1)).filter((i) => i >= 0);
  const h = hs[firstHeading] ?? 0;
  const out = [];
  for (let i = h + 1; i < L.length; i++) {
    if (STOP.test(L[i])) break;
    const im = img(L[i]);
    if (im) out.push({ type: "image", src: im });
    else if (L[i].startsWith("## ")) out.push({ type: "h2", text: L[i].slice(3) });
    else out.push({ type: "p", text: L[i] });
  }
  return { title: L[h]?.slice(3).trim(), body: out };
};

const pages = {};
for (const [key, f, n] of [
  ["about", "about.html", 0],
  ["greenpm", "greenpm.html", 0],
  ["greenpm-about", "greenpm_about.html", 0],
  ["assistances", "assistances.html", 0],
]) {
  if (fs.existsSync(path.join(DIR, f))) pages[key] = section(f, n);
}

const pillars = [];
for (const [slug, f] of [
  ["telimler", "services_telimler.html"],
  ["tedbiq", "services_tedbiq.html"],
  ["sertifikasiya", "services_sertifikasiya.html"],
]) {
  if (!fs.existsSync(path.join(DIR, f))) continue;
  const s = section(f, 0);
  // drop the tab labels "Təlimlər / Tədbiq / Sertifikasiya" that precede the copy
  s.body = s.body.filter((b, i) => !(i < 4 && b.type === "p" && /^(Təlimlər|Tədbiq|Sertifikasiya)$/.test(b.text)));
  pillars.push({ slug, ...s, source_url: `https://pmo.az/az/services/${slug}` });
}

// Consulting / support topics listed on the home page ("Xidmətlərimiz")
const H = text("home.html");
const topics = [];
const ti = H.findIndex((l) => l.startsWith("## Xidmətlərimiz"));
for (let i = ti + 1; i < H.length && !/partners/.test(H[i]); i++) {
  const im = img(H[i]);
  if (im) topics.push({ icon: im, title: H[i + 1] });
}

const partners = [...new Set(H.filter((l) => /\/images\/partners\//.test(l)).map(img))];

// ---------- Books & video courses ----------
const books = [];
{
  const L = text("books.html");
  for (let i = 0; i < L.length; i++) {
    if (L[i + 1] !== undefined && L[i] === "Ətraflı") continue;
  }
  const end = L.findIndex((l) => /\/images\/partners\//.test(l));
  const start = L.indexOf("Kitabı al");
  let cur = null;
  for (let i = start + 1; i < end; i++) {
    if (L[i] === "Ətraflı") {
      if (cur) books.push(cur);
      cur = null;
      continue;
    }
    if (!cur) cur = { title: L[i], lines: [] };
    else cur.lines.push(L[i]);
  }
}
const PRICES = [60, 9.9, 19.9]; // from the approved design (Home → Knowledge)
books.forEach((b, i) => {
  b.price = PRICES[i] ?? null;
  b.format = "Elektron kitab";
  b.excerpt = b.lines.join(" ").replace(/\s*\.\.\.$/, "…");
  delete b.lines;
});

const courses = [];
for (const f of fs.readdirSync(DIR).filter((f) => /^videocourse(_\d+)?\.html$/.test(f))) {
  const s = section(f, 1);
  if (s.title && !courses.find((c) => c.title === s.title)) courses.push({ slug: f.replace(/\.html$/, ""), ...s });
}

// ---------- Testimonials ----------
const testimonials = [];
{
  const L = text("books.html");
  for (let i = 0; i < L.length; i++) {
    const m = L[i].match(/^\[IMG (\/images\/feedback\/.+)\]$/);
    if (!m) continue;
    images.add(m[1]);
    const lines = [];
    let j = i + 1;
    for (; j < L.length && !L[j].startsWith("[IMG") && !/^MÜRACİ/.test(L[j]); j++) lines.push(L[j].replace(/^## /, ""));
    const name = lines.pop();
    const role = lines.pop();
    testimonials.push({ photo: m[1], quote: lines.join("\n"), role, name });
  }
}

fs.mkdirSync(OUT, { recursive: true });
const write = (n, d) => fs.writeFileSync(path.join(OUT, `${n}.json`), JSON.stringify(d, null, 2) + "\n");
write("posts", posts);
write("experts", experts);
write("service_pillars", pillars);
write("consulting_topics", topics);
write("partners", partners);
write("books", books);
write("video_courses", courses);
write("testimonials", testimonials);
write("pages", pages);
fs.writeFileSync(path.join(DIR, "images.txt"), [...images].join("\n") + "\n");
console.log({
  posts: posts.length,
  experts: experts.length,
  pillars: pillars.length,
  topics: topics.length,
  partners: partners.length,
  books: books.length,
  courses: courses.length,
  testimonials: testimonials.length,
  pages: Object.keys(pages),
  images: images.size,
});
