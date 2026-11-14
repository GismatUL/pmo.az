import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getConsulting, getServices } from "@/lib/api";
import { ARROW } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { consulting } = await getServices();
  return consulting.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await getConsulting(slug);
  return service ? { title: service.title, description: service.detail?.intro ?? service.intro ?? service.summary } : {};
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const [service, { consulting }] = await Promise.all([getConsulting(slug), getServices()]);
  if (!service) notFound();
  const d = service.detail;
  const related = consulting
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({ title: s.title, text: s.summary, href: `/services/${s.slug}` }));

  return (
    <div className="inner">
      <PageHero
        crumbs={[{ label: "Xidmətlər", href: "/services" }, { label: service.crumb }]}
        title={
          d ? (
            <>
              {d.heroTitle[0]}
              <br />
              {d.heroTitle[1]}
            </>
          ) : (
            service.title
          )
        }
        intro={d?.intro ?? service.intro ?? service.summary}
      >
        <LinkButton href="/contact#enquiry" label="Konsultasiya üçün müraciət et" />
      </PageHero>

      {d && (
        <>
          {/* Outcomes — 16:581 */}
          <section className="section bg-cream stack-32">
            <p className="t-label c-muted">{d.eyebrow}</p>
            <div className="purpose">
              <h2 className="t-h1 c-ink">
                {d.purposeTitle[0]}
                <br />
                {d.purposeTitle[1]}
              </h2>
              <p className="t-body c-muted">{d.purpose}</p>
            </div>
            <div className="outcome-grid">
              {d.outcomes.map(([title, text], i) => (
                <div className="pillar-card" key={title}>
                  <p className="t-label c-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="t-h2 c-ink">{title}</h3>
                  <p className="t-body c-muted">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process — 16:582 */}
          <section className="section bg-green stack-32">
            <p className="t-label c-lime">ƏMƏKDAŞLIQ YANAŞMASI</p>
            <h2 className="t-h1 c-white">
              {d.processTitle[0]}
              <br />
              {d.processTitle[1]}
            </h2>
            <ol className="col-row col-row--28">
              {d.process.map(([title, text], i) => (
                <li className="col-item" key={title}>
                  <p className="t-h1 c-lime">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="t-h2 c-white">{title}</h3>
                  <p className="t-body c-cream">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Experience — 16:583 */}
          <section className="section bg-cream stack-32">
            <p className="t-label c-muted">TƏCRÜBƏMİZDƏN</p>
            <h2 className="t-h1 c-ink">
              {d.experienceTitle[0]}
              <br />
              {d.experienceTitle[1]}
            </h2>
            <div className="card-row card-row--24">
              {d.experience.map(([title, text]) => (
                <article className="pillar-card pillar-card--32" key={title}>
                  <h3 className="t-h2 c-ink">{title}</h3>
                  <p className="t-body c-muted">{text}</p>
                  <Link className="label-link c-ink" href="/about">
                    {`Təcrübə ilə tanış ol${ARROW}`}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Related services — 16:584 */}
      <section className="section bg-white stack-32">
        <h2 className="t-h1 c-ink">Əlaqəli xidmətlər</h2>
        <div className="card-row card-row--24">
          {related.map((r) => (
            <div className="related-item" key={r.title}>
              <h3 className="t-h2 c-ink">{r.title}</h3>
              <p className="t-body c-muted">{r.text}</p>
              <Link className="label-link c-ink" href={r.href}>
                {`Daha ətraflı${ARROW}`}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title={d?.ctaTitle ?? "Təşkilatınız üçün doğru həlli tapaq."}
        text={d?.ctaText ?? `${service.title} haqqında bizimlə danışın.`}
      />
    </div>
  );
}
