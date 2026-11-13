import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getServices } from "@/lib/api";
import { ARROW } from "@/lib/site";

export const metadata: Metadata = {
  title: "Xidmətlər",
  description: "Peşəkarlar, layihələr və şirkətlər üçün təlim, sertifikasiya və konsaltinq həlləri.",
};

const STEPS = [
  ["01", "Təhlil", "Ehtiyacları, mövcud vəziyyəti və məqsədləri müəyyən edirik."],
  ["02", "Həll", "Məqsədə uyğun yanaşma və fəaliyyət istiqamətlərini seçirik."],
  ["03", "Tətbiq", "Komandanızla birlikdə metodologiyanı praktikaya keçiririk."],
  ["04", "İnkişaf", "Öyrənilən dərslər əsasında prosesi təkmilləşdiririk."],
];

export default async function ServicesPage() {
  const { pillars, consulting } = await getServices();

  return (
    <div className="inner">
      <PageHero
        crumb="Xidmətlər"
        title={
          <>
            Bilikdən tətbiqə.
            <br />
            Tətbiqdən nəticəyə.
          </>
        }
        intro="Peşəkarlar, layihələr və şirkətlər üçün təlim, sertifikasiya və konsaltinq həlləri."
      />

      {/* Service pillars — 16:155 */}
      <section className="section bg-cream stack-32">
        <h2 className="t-h1 c-ink">Üç istiqamət. Vahid yanaşma.</h2>
        <div className="card-row">
          {pillars.map((p) => (
            <article className="pillar-card" key={p.n}>
              <p className="t-h2 c-muted">{p.n}</p>
              <h3 className="t-h2 c-ink">{p.title}</h3>
              <p className="t-body c-muted">{p.text}</p>
              <ul className="t-body c-ink">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <Link className="label-link c-ink" href={p.href}>
                {`${p.link}${ARROW}`}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Consulting areas — 16:156 */}
      <section className="section bg-green stack-32" id="consulting">
        <p className="t-label c-lime">KONSALTİNQ VƏ TƏTBİQ</p>
        <h2 className="t-h1 c-white">Təşkilatınıza uyğun həllər</h2>
        {consulting.map((s) => (
          <div className="area-row" key={s.slug}>
            <div className="area-row__name">
              <p className="t-label c-lime">{s.n}</p>
              <h3 className="t-h2 c-white">{s.title}</h3>
            </div>
            <div className="area-row__summary">
              <p className="t-body c-cream">{s.summary}</p>
              <Link className="label-link c-lime" href={`/services/${s.slug}`}>
                {`Xidmət haqqında${ARROW}`}
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Approach — 16:157 */}
      <section className="section bg-cream stack-32">
        <h2 className="t-h1 c-ink">Əvvəl anlayırıq. Sonra hərəkət edirik.</h2>
        <ol className="steps">
          {STEPS.map(([n, title, text]) => (
            <li className="step" key={n}>
              <p className="t-h1 c-muted">{n}</p>
              <h3 className="t-h2 c-ink">{title}</h3>
              <p className="t-body c-muted">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand
        title="Təşkilatınız üçün doğru həlli tapaq."
        text="Ehtiyaclarınızı paylaşın, uyğun xidmət istiqamətini birlikdə seçək."
      />
    </div>
  );
}
