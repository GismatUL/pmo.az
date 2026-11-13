import { CTA, Footer, InnerHero } from "@/components/SiteChrome";

const pillars = [
  [
    "01",
    "Təlimlər",
    "Peşəkar bilikləri praktik təcrübəyə çevirən proqramlar.",
    "Beynəlxalq sertifikasiya hazırlığı · Korporativ təlimlər · Praktik proqramlar",
  ],
  [
    "02",
    "Sertifikasiya",
    "Peşəkarlar, layihələr və təşkilatlar üçün qiymətləndirmə.",
    "IPMA və digər beynəlxalq istiqamətlər · GPM360® · IPMA Delta®",
  ],
  [
    "03",
    "Tətbiq",
    "Layihə idarəetməsini təşkilatınızın gündəlik işinə inteqrasiya edin.",
    "PMO qurulması · Layihə dəstəyi · Transformasiya",
  ],
];
const services = [
  [
    "PMO qurulması və inkişafı",
    "Layihə idarəetmə ofisinin modeli, prosesləri, metodologiyası və inkişafı.",
  ],
  [
    "Layihə və proqram idarəetmə dəstəyi",
    "Layihə sənədləri, risklər, maraqlı tərəflər və hesabatlılıq üzrə metodoloji dəstək.",
  ],
  [
    "Dayanıqlı layihə menecmenti",
    "GPM P5 yanaşmasının tətbiqi, dayanıqlılığın qiymətləndirilməsi və GPM360.",
  ],
  [
    "DÖT / PPP məsləhətçiliyi",
    "Dövlət-özəl tərəfdaşlığı layihələrinin qiymətləndirilməsi və strukturlaşdırılması.",
  ],
  [
    "Transformasiya və dəyişikliklər",
    "Dəyişikliklərin idarə edilməsi və təşkilati transformasiyaya metodoloji dəstək.",
  ],
];
const process = [
  ["01", "Təhlil", "Ehtiyacları və məqsədləri müəyyən edirik."],
  ["02", "Həll", "Məqsədə uyğun yanaşmanı seçirik."],
  ["03", "Tətbiq", "Metodologiyanı praktikaya keçiririk."],
  ["04", "İnkişaf", "Prosesi təkmilləşdiririk."],
];

export default function ServicesPage() {
  return (
    <main>
      <InnerHero
        active="Xidmətlər"
        title={
          <>
            Bilikdən tətbiqə.
            <br />
            Tətbiqdən nəticəyə.
          </>
        }
        intro="Peşəkarlar, layihələr və şirkətlər üçün təlim, sertifikasiya və konsaltinq həlləri."
      />
      <section className="section">
        <h2>Üç istiqamət. Vahid yanaşma.</h2>
        <div className="pillar-grid">
          {pillars.map(([n, title, text, list]) => (
            <article className="white-card" key={n}>
              <b>{n}</b>
              <h3>{title}</h3>
              <p>{text}</p>
              <p>{list}</p>
              <a>Ətraflı bax ↗</a>
            </article>
          ))}
        </div>
      </section>
      <section className="green-section">
        <small>KONSALTİNQ VƏ TƏTBİQ</small>
        <h2>Təşkilatınıza uyğun həllər</h2>
        <div className="service-rows">
          {services.map(([title, text], i) => (
            <article key={title}>
              <div>
                <small>0{i + 1}</small>
                <h3>{title}</h3>
              </div>
              <div>
                <p>{text}</p>
                <a>Xidmət haqqında ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <h2>Əvvəl anlayırıq. Sonra hərəkət edirik.</h2>
        <div className="process-grid">
          {process.map(([n, title, text]) => (
            <article key={n}>
              <b>{n}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA
        title="Təşkilatınız üçün doğru həlli tapaq."
        text="Ehtiyaclarınızı paylaşın, uyğun xidmət istiqamətini birlikdə seçək."
      />
      <Footer />
    </main>
  );
}
