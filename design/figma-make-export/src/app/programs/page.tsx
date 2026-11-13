import { ProgramCatalogue } from "@/components/ProgramCatalogue";
import { CTA, Footer, InnerHero } from "@/components/SiteChrome";

const guidance = [
  [
    "Kompetensiyalarınızı inkişaf etdirin",
    "Layihə idarəetməsi bilik və təcrübənizi beynəlxalq yanaşmalarla tamamlayın.",
    "IPMA ICB4 · PMP®",
  ],
  [
    "Dayanıqlı dəyər yaradın",
    "Layihələrin insanlara, planetə və rifaha təsirini idarə etməyi öyrənin.",
    "GPM-b",
  ],
  [
    "İxtisaslaşmış yanaşma seçin",
    "Layihə metodologiyası, İT xidmətləri və dövlət-özəl tərəfdaşlığı üzrə inkişaf edin.",
    "PRINCE2® · ITIL® · CP3P",
  ],
];

export default function ProgramsPage() {
  return (
    <main>
      <InnerHero
        active="Proqramlar"
        title={
          <>
            İnkişaf yolunuzu
            <br />
            özünüz seçin.
          </>
        }
        intro="Beynəlxalq sertifikasiya hazırlığı və praktik layihə idarəetmə proqramları. Ətraflı məlumat və qeydiyyat pmu.az saytındadır."
      />
      <ProgramCatalogue />
      <section className="green-section">
        <small>MƏQSƏDİNİZƏ UYĞUN SEÇİM</small>
        <h2>Hansı istiqamət sizə uyğundur?</h2>
        <div className="guidance-grid">
          {guidance.map(([title, text, tags]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>{tags}</strong>
            </article>
          ))}
        </div>
      </section>
      <CTA
        title="Seçim etməkdə dəstək lazımdır?"
        text="Məqsədinizə və təcrübənizə uyğun proqramı birlikdə müəyyən edək."
      />
      <Footer />
    </main>
  );
}
