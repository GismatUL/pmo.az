import Image from "next/image";
import { CTA, Footer, InnerHero } from "@/components/SiteChrome";

const stats = [
  ["2000+", "məzun"],
  ["500+", "sertifikasiya"],
  ["100+", "həyata keçirilən layihə"],
  ["50+", "ekspert və təlimçi"],
];
const standards = [
  [
    "AZS ISO 21500 / 21502",
    "Azərbaycanda layihə, proqram və portfel idarəetməsi üzrə milli standartların hazırlanmasında iştirak.",
  ],
  ["ISO 9001:2015", "Keyfiyyət idarəetmə sisteminə əsaslanan təşkilati yanaşma."],
  [
    "Beynəlxalq əməkdaşlıq",
    "IPMA, AzPMA, GPM Global, PeopleCert və APMG istiqamətlərində təcrübə.",
  ],
];

export default function AboutPage() {
  return (
    <main>
      <InnerHero
        active="Haqqımızda"
        title={
          <>
            Layihə düşüncəsi ilə
            <br />
            gələcəyi qururuq.
          </>
        }
        intro="PMO.az — qlobal təcrübəni yerli ehtiyaclarla birləşdirən Layihə Düşüncə Məktəbi."
      />
      <section className="section about-mission">
        <div>
          <small>BİZ KİMİK?</small>
          <h2>
            Sadəcə təlim deyil.
            <br />
            Düşüncə məktəbi.
          </h2>
          <p>
            PMO.az peşəkarları və təşkilatları layihə idarəetməsi ətrafında birləşdirir. Beynəlxalq
            təcrübəni yerli ehtiyaclara uyğunlaşdırır, bilikləri praktik alət və yanaşmalarla
            tamamlayır.
          </p>
          <p>
            Məqsədimiz Azərbaycanda layihə idarəetmə mədəniyyətinin inkişaf etdirilməsi, metod və
            proseslərin sistemli tətbiqinə dəstək olmaqdır.
          </p>
        </div>
        <figure>
          <Image
            src="/assets/467bf.png"
            alt="ADA Universitetinin tələbələri ilə PM Game workshop"
            width={1600}
            height={900}
          />
          <figcaption>ADA Universitetinin tələbələri ilə PM Game workshop-u</figcaption>
        </figure>
      </section>
      <section className="about-stats">
        <small>TƏCRÜBƏMİZ RƏQƏMLƏRLƏ</small>
        <div className="stats">
          {stats.map(([v, l]) => (
            <div key={l}>
              <strong>{v}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="section founder">
        <div>
          <small>TƏSİSÇİ VƏ DİREKTOR</small>
          <h2>Rəşad İbrahimov</h2>
          <p>
            Layihə idarəetməsi üzrə ekspert və konsultant. PMO.az-ın təsisçisi və direktoru, layihə
            düşüncəsinin təbliğatçısı.
          </p>
        </div>
        <blockquote>
          “Layihələrinizin effektivliyinə optimizasiya və sistemliliklə çatınq!”
          <small>Rəşad İbrahimov / PMO.az</small>
        </blockquote>
      </section>
      <section className="section">
        <h2>
          Etibarın arxasında
          <br />
          standartlar dayanır.
        </h2>
        <div className="standard-grid">
          {standards.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CTA
        title="Birlikdə daha çoxuna nail olaq."
        text="Komandanız, karyeranız və layihələriniz üçün yeni imkanlar."
      />
      <Footer />
    </main>
  );
}
