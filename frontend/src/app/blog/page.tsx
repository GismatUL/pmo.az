import type { Metadata } from "next";
import Link from "next/link";
import { BlogList } from "@/components/BlogList";
import { CtaBand } from "@/components/CtaBand";
import { getLinks } from "@/lib/api";
import { PageHero } from "@/components/PageHero";
import { getFeaturedPost, getPosts } from "@/lib/api";
import { shortDate } from "@/lib/posts";
import { ARROW } from "@/lib/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Bloq",
  description:
    "Layihə idarəetməsi, dayanıqlılıq və peşəkar inkişaf haqqında xəbərlər, müsahibələr və praktik biliklər.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = await getFeaturedPost(posts);
  const rest = posts.filter((p) => p.slug !== featured.slug).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="inner">
      <PageHero
        crumb="Bloq"
        title={
          <>
            Yeni baxışlar.
            <br />
            Dəyərli təcrübələr.
          </>
        }
        intro="Layihə idarəetməsi, dayanıqlılıq və peşəkar inkişaf haqqında xəbərlər, müsahibələr və praktik biliklər."
      />

      {/* Featured — 16:413 */}
      <section className="section bg-cream stack-32">
        <p className="t-label c-muted">SEÇİLMİŞ YAZI</p>
        <article className="featured-post">
          <Link href={`/blog/${featured.slug}`} className="featured-post__media" tabIndex={-1}>
            <img src={asset(featured.image)} alt={featured.imageCaption ?? featured.title} width={1600} height={900} />
          </Link>
          <div className="featured-post__copy">
            <p className="t-label c-muted">{`${featured.kind}  /  ${shortDate(featured.date)}`}</p>
            <h2 className="t-h2 c-ink">
              <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="t-body c-muted">{featured.excerpt}</p>
            <Link className="label-link c-ink" href={`/blog/${featured.slug}`}>
              {`Məqaləni oxu${ARROW}`}
            </Link>
          </div>
        </article>
      </section>

      {/* Articles — 16:414 */}
      <section className="section bg-white stack-32 articles">
        <BlogList posts={rest} />
      </section>

      <CtaBand
        title="Layihə düşüncə icmasına qoşulun."
        text="Araşdırmalar, podkastlar və müzakirələr — öyrənməyə davam edin."
        label="Telegram-a keç"
        href={(await getLinks()).telegram ?? "/contact"}
      />
    </div>
  );
}
