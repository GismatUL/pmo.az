import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProgramCatalogue } from "@/components/ProgramCatalogue";
import { getCatalogue } from "@/lib/api";

export const metadata: Metadata = {
  title: "Təlimlər",
  description:
    "Beynəlxalq sertifikasiya hazırlığı və praktik layihə idarəetmə proqramları. Ətraflı məlumat və qeydiyyat pmu.az saytındadır.",
};

const GUIDANCE = [
  [
    "Kompetensiyalarınızı inkişaf etdirin",
    "Layihə idarəetməsi bilik və təcrübənizi beynəlxalq yanaşmalarla tamamlayın.",
    "IPMA ICB4 · PMP®",
  ],
  ["Dayanıqlı dəyər yaradın", "Layihələrin insanlara, planetə və rifaha təsirini idarə etməyi öyrənin.", "GPM-b"],
  [
    "İxtisaslaşmış yanaşma seçin",
    "Layihə metodologiyası, İT xidmətləri və ya dövlət-özəl tərəfdaşlığı üzrə inkişaf edin.",
    "PRINCE2® · ITIL® · CP3P",
  ],
];

export default async function ProgramsPage() {
  const programs = await getCatalogue();

  return (
    <div className="inner">
      <PageHero
        crumb="Təlimlər"
        title={
          <>
            İnkişaf yolunuzu
            <br />
            özünüz seçin.
          </>
        }
        intro="Beynəlxalq sertifikasiya hazırlığı və praktik layihə idarəetmə proqramları. Ətraflı məlumat və qeydiyyat pmu.az saytındadır."
      />

      {/* Catalogue — 16:329 */}
      <section className="section bg-cream catalogue" aria-label="Proqram kataloqu">
        <ProgramCatalogue programs={programs} />
      </section>

      {/* Guidance — 16:330 */}
      <section className="section bg-green guidance">
        <p className="t-label c-lime">MƏQSƏDİNİZƏ UYĞUN SEÇİM</p>
        <h2 className="t-h1 c-white">Hansı istiqamət sizə uyğundur?</h2>
        <div className="col-row">
          {GUIDANCE.map(([title, text, tags]) => (
            <div className="col-item" key={title}>
              <h3 className="t-h2 c-white">{title}</h3>
              <p className="t-body c-cream">{text}</p>
              <p className="t-label c-lime">{tags}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Seçim etməkdə dəstək lazımdır?"
        text="Məqsədinizə və təcrübənizə uyğun proqramı birlikdə müəyyən edək."
      />
    </div>
  );
}
