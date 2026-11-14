import Link from "next/link";
import { LinkButton, TextLink } from "@/components/Button";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getContact, getFeaturedPost, getPosts, getServices, getStats } from "@/lib/api";
import { asset } from "@/lib/asset";
import { longDate } from "@/lib/posts";
import { APPROACH, EXPERIENCE, VALUE } from "@/lib/services";

const STANDARDS = ["ISO 21500 / 21502", "IPMA ICB4 · Delta®", "ISO 10006", "GPM P5 · GPM360®", "APMG · PeopleCert"];

const TRAINING = [
  ["Korporativ təlimlər", "Komandanızın ehtiyacına uyğun proqramlar"],
  ["Sertifikasiya hazırlığı", "IPMA ICB4, PRINCE2®, PMP® və digərləri"],
  ["Videokurslar", "edu.pmo.az platformasında"],
  ["Kitablar və iş dəftərləri", "pmbook.az"],
];

export default async function HomePage() {
  const [stats, { consulting }, posts, contact] = await Promise.all([
    getStats(),
    getServices(),
    getPosts(),
    getContact(),
  ]);
  const news = await getFeaturedPost(posts);

  return (
    <>
      {/* Hero — Figma 10:4 / 10:14 */}
      <section className="section bg-green home-hero">
        <div className="home-hero__story">
          <div className="home-hero__copy">
            <p className="eyebrow">LAYİHƏ İDARƏETMƏSİ ÜZRƏ KONSALTİNQ</p>
            <h1 className="home-hero__title">
              Strategiyadan icraya.
              <br />
              Sistemli idarəetmə.
              <br />
              Nəzarətdə layihələr.
            </h1>
            <p className="home-hero__lead">
              Təşkilatlara PMO qurmağa, layihə portfelini idarə etməyə və mürəkkəb layihələri strateji məqsədlərə
              uyğun icra etməyə kömək edirik.
            </p>
            <div className="home-hero__actions">
              <LinkButton href="/services" label="Xidmətlərlə tanış olun" />
              <TextLink className="light" href="#contact" label="Konsultasiya istəyin" />
            </div>
          </div>
          <figure className="photo-card">
            <img
              className="photo-card__img"
              src={asset("/images/hero-workshop.jpg")}
              alt="PMO.az komandasının keçirdiyi praktik layihə idarəetmə sessiyası"
              width={1600}
              height={900}
              fetchPriority="high"
            />
            <figcaption className="photo-card__caption">
              <span>KOMANDANIZLA BİRLİKDƏ</span>
              <strong>Metodologiyanı gündəlik işə çeviririk.</strong>
            </figcaption>
          </figure>
        </div>
        <dl className="stats">
          {stats.map(({ value, label }) => (
            <div className="stats__item" key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Standards — Figma 10:5 */}
      <section className="trust" aria-label="Standartlar və beynəlxalq tərəfdaşlar">
        <p className="eyebrow">BEYNƏLXALQ STANDARTLARA ƏSASLANAN YANAŞMA</p>
        <ul className="trust__list">
          {STANDARDS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Consulting services — Figma 10:7 layout */}
      <section className="section bg-green home-services" id="services">
        <p className="eyebrow">01 / KONSALTİNQ XİDMƏTLƏRİ</p>
        <div className="home-services__body">
          <div className="home-services__intro">
            <h2 className="h-section">
              Layihələrinizi
              <br />
              sistemlə idarə edin.
            </h2>
            <p className="lead">
              Layihə idarəetməsini ayrı-ayrı təşəbbüslərdən təşkilatın idarəetmə sisteminə çeviririk: aydın qaydalar,
              şəffaf hesabatlılıq və vaxtında qəbul edilən qərarlar.
            </p>
            <TextLink href="/services" label="Bütün xidmətlər" />
          </div>
          <ul className="service-lines">
            {consulting.slice(0, 5).map(({ n, slug, title, summary }) => (
              <li key={slug}>
                <Link className="service-line" href={`/services/${slug}`}>
                  <span className="service-line__num">{n}</span>
                  <span className="service-line__copy">
                    <strong>{title}</strong>
                    <span>{summary}</span>
                  </span>
                  <span className="service-line__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why — value of professional project management */}
      <section className="section bg-cream home-why">
        <p className="eyebrow">02 / NİYƏ PEŞƏKAR LAYİHƏ İDARƏETMƏSİ</p>
        <div className="section-head">
          <h2 className="h-section">
            Yaxşı ideya kifayət deyil.
            <br />
            Nəticəni icra müəyyən edir.
          </h2>
        </div>
        <p className="lead home-why__lead">
          PMO.az beynəlxalq standartları yerli təcrübə ilə birləşdirir. Komandamız layihə, proqram və portfel
          idarəetməsi üzrə milli standartların hazırlanmasında iştirak edib, IPMA, GPM Global və APMG ilə əməkdaşlıq
          edir.
        </p>
        <div className="card-row">
          {VALUE.map(([title, text], i) => (
            <article className="pillar-card" key={title}>
              <p className="t-label c-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="home-card__title">{title}</h3>
              <p className="t-body c-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="section bg-green home-approach">
        <p className="eyebrow">03 / YANAŞMAMIZ</p>
        <h2 className="h-section">
          Əvvəl anlayırıq.
          <br />
          Sonra birlikdə tətbiq edirik.
        </h2>
        <ol className="col-row home-approach__steps">
          {APPROACH.map(([title, text], i) => (
            <li className="col-item" key={title}>
              <p className="t-label c-lime">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="home-card__title c-white">{title}</h3>
              <p className="t-body c-cream">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience — Figma 10:8 case study + selected engagements */}
      <section className="section bg-pale home-case">
        <p className="eyebrow">04 / TƏCRÜBƏ</p>
        <div className="home-case__body">
          <div className="home-case__story">
            <h2 className="h-section">
              Real təşkilatlar.
              <br />
              Real layihələr.
            </h2>
            <h3 className="home-case__project">
              Hilton Garden Inn Baku
              <br />
              by PMD Projects
            </h3>
            <p className="lead">
              GPM360® modeli ilə layihənin insanlara, planetə və rifaha təsirinin qiymətləndirilməsi və
              sertifikatlaşdırılması.
            </p>
            <TextLink href="https://greenpm.az" label="Layihə ilə tanış ol" />
          </div>
          <div className="gpm-panel">
            <p className="eyebrow on-dark">GPM360® / 3P YANAŞMASI</p>
            <p className="gpm-panel__title">
              People.
              <br />
              Planet.
              <br />
              Prosperity.
            </p>
            <p className="gpm-panel__steps">İlkin qiymətləndirmə → Qiymətləndirmə → Sertifikasiya</p>
            <TextLink className="light" href="https://greenpm.az" label="GreenPM haqqında daha çox" />
          </div>
        </div>
        <div className="card-row">
          {EXPERIENCE.map(([title, text]) => (
            <article className="pillar-card" key={title}>
              <h3 className="home-card__title">{title}</h3>
              <p className="t-body c-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Training and knowledge — secondary offering (Figma 10:9 layout) */}
      <section className="section bg-cream home-knowledge" id="learning">
        <p className="eyebrow">05 / TƏLİM VƏ BİLİK</p>
        <h2 className="h-section">Komandanızın inkişafı üçün.</h2>
        <div className="home-knowledge__body">
          <article className="news-feature">
            <img
              className="news-feature__img"
              src={asset(news.image ?? "https://pmo.az/images/news/pmoaz-news-1_1782123411.jpg")}
              alt={news.imageCaption ?? news.title}
              width={1600}
              height={900}
              loading="lazy"
            />
            <p className="eyebrow">{`${news.kind}  /  ${longDate(news.date)}`}</p>
            <h3 className="news-feature__title">{news.shortTitle ?? news.title}</h3>
            <TextLink href={`/blog/${news.slug}`} label="Xəbəri oxu" />
          </article>
          <div className="books">
            <p className="eyebrow">TƏLİM VƏ SERTİFİKASİYA</p>
            <h3 className="books__title">
              Konsaltinqi tamamlayan
              <br />
              proqramlar.
            </h3>
            <ul className="books__list">
              {TRAINING.map(([title, text]) => (
                <li key={title}>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </li>
              ))}
            </ul>
            <TextLink href="/programs" label="Təlim proqramları" />
          </div>
        </div>
      </section>

      {/* Contact — Figma 10:10 */}
      <section className="section bg-lime home-contact" id="contact">
        <div className="home-contact__intro">
          <p className="eyebrow">06 / KONSULTASİYA</p>
          <h2 className="home-contact__title">
            Layihə ehtiyacınızı
            <br />
            müzakirə edək.
          </h2>
          <p className="home-contact__lead">
            PMO qurmaq, portfeli prioritetləşdirmək və ya mürəkkəb layihəni nəzarətə götürmək — vəziyyətinizi qısaca
            yazın, uyğun yanaşmanı birlikdə müəyyən edək.
          </p>
          <a className="home-contact__phone" href={contact.phoneHref}>
            {contact.phone}
          </a>
          <a className="home-contact__email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
        <EnquiryForm
          source="home"
          className="home-contact__form"
          fields={["name", "company", "email", "message"]}
          submitLabel="Konsultasiya istəyin"
          messagePlaceholder="Təşkilatınız və layihə idarəetməsi ilə bağlı ehtiyacınız"
        />
      </section>
    </>
  );
}
