import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getStats } from "@/lib/api";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "PMO.az — təşkilatlara layihə idarəetmə sistemləri qurmağa və layihələri strateji məqsədlərə uyğun icra etməyə kömək edən konsaltinq şirkəti.",
};

const STANDARDS = [
  [
    "AZS ISO 21500 / 21502",
    "Azərbaycanda layihə, proqram və portfel idarəetməsi üzrə milli standartların hazırlanmasında iştirak.",
  ],
  ["ISO 9001:2015", "Keyfiyyət idarəetmə sisteminə əsaslanan təşkilati yanaşma."],
  [
    "Beynəlxalq əməkdaşlıq",
    "IPMA / AzPMA, GPM Global, PeopleCert və APMG istiqamətlərində təcrübə və tərəfdaşlıq.",
  ],
];

export default async function AboutPage() {
  const stats = await getStats();

  return (
    <div className="inner">
      <PageHero
        crumb="Haqqımızda"
        title={
          <>
            Layihə idarəetməsində
            <br />
            etibarlı tərəfdaş.
          </>
        }
        intro="PMO.az — təşkilatlara layihə idarəetmə sistemləri qurmağa və layihələri strateji məqsədlərə uyğun icra etməyə kömək edən konsaltinq şirkəti."
      />

      {/* Mission — 16:241 */}
      <section className="section bg-cream">
        <div className="split split--48">
          <div>
            <p className="t-label c-muted">BİZ KİMİK?</p>
            <h2 className="t-h1 c-ink">
              Metodologiya deyil,
              <br />
              işləyən sistem.
            </h2>
            <p className="t-body c-ink">
              PMO.az layihə idarəetməsi üzrə konsaltinq və məsləhət xidmətləri göstərir: PMO qurulması, portfel
              idarəetməsi, layihələrin planlaşdırılması, monitorinqi və nəzarəti. Həm dəstəkverici, həm də birbaşa
              layihələrdə iştirak edən PMO modelində işləyirik.
            </p>
            <p className="t-body c-muted">
              Məqsədimiz təşkilatlarda davamlı və sistemli layihə mədəniyyəti formalaşdırmaqdır. Təlim və
              sertifikasiya proqramlarımız da bu məqsədə xidmət edir.
            </p>
          </div>
          <figure className="figure">
            <img
              src={asset("/images/hero-workshop.jpg")}
              alt="ADA Universitetinin tələbələri ilə PM Game workshop-u"
              width={1600}
              height={900}
              loading="lazy"
            />
            <figcaption className="t-label c-muted">ADA Universitetinin tələbələri ilə PM Game workshop-u</figcaption>
          </figure>
        </div>
      </section>

      {/* Impact — 16:242 */}
      <section className="section bg-green stack-32">
        <p className="t-label c-lime">TƏCRÜBƏMİZ RƏQƏMLƏRLƏ</p>
        <dl className="col-row impact">
          {stats.map(({ value, label }) => (
            <div className="col-item" key={label}>
              <dt className="t-display c-lime">{value}</dt>
              <dd className="t-body c-cream">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Founder — 16:243 */}
      <section className="section bg-cream" id="founder">
        <div className="split split--48">
          <div>
            <p className="t-label c-muted">TƏSİSÇİ VƏ DİREKTOR</p>
            <h2 className="t-h1 c-ink">Rəşad İbrahimov</h2>
            <p className="t-body c-ink">
              Layihə idarəetməsi üzrə ekspert və konsultant. PMO.az-ın təsisçisi və direktoru, layihə düşüncəsinin
              təbliğatçısı.
            </p>
          </div>
          <blockquote className="quote-card c-ink">
            <p className="t-h2">“Layihələrinizin effektivliyinə optimizasiya və sistemliklə çatırıq!”</p>
            <cite className="t-label">Rəşad İbrahimov / PMO.az</cite>
          </blockquote>
        </div>
      </section>

      {/* Standards — 16:244 */}
      <section className="section bg-white stack-32">
        <h2 className="t-h1 c-ink">
          Etibarın arxasında
          <br />
          standartlar dayanır.
        </h2>
        <div className="card-row card-row--24">
          {STANDARDS.map(([title, text]) => (
            <div className="related-item" key={title}>
              <h3 className="t-h2 c-ink">{title}</h3>
              <p className="t-body c-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Layihələriniz üçün etibarlı tərəfdaş axtarırsınız?"
        text="Təşkilatınızın ehtiyacını bizimlə bölüşün, uyğun yanaşmanı birlikdə müəyyən edək."
        label="Konsultasiya istəyin"
        href="/contact#enquiry"
      />
    </div>
  );
}
