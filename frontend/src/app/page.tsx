import Link from "next/link";
import { LinkButton, TextLink } from "@/components/Button";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ProgramFilter } from "@/components/ProgramFilter";
import { getBooks, getContact, getFeaturedPost, getFeaturedPrograms, getPosts, getServices, getStats } from "@/lib/api";
import { longDate } from "@/lib/posts";

const PARTNERS = ["IPMA / AzPMA", "GPM Global", "PeopleCert", "APMG International", "PMI imtahan hazırlığı"];

export default async function HomePage() {
  const [stats, programs, { pillars }, posts, books, contact] = await Promise.all([
    getStats(),
    getFeaturedPrograms(),
    getServices(),
    getPosts(),
    getBooks(),
    getContact(),
  ]);
  const news = await getFeaturedPost(posts);

  return (
    <>
      {/* Hero — Figma 10:4 / 10:14 */}
      <section className="section bg-green home-hero">
        <div className="home-hero__story">
          <div className="home-hero__copy">
            <p className="eyebrow">LAYİHƏ DÜŞÜNCƏ MƏKTƏBİ</p>
            <h1 className="home-hero__title">
              Layihə düşüncəsi.
              <br />
              Beynəlxalq təcrübə.
              <br />
              Real nəticələr.
            </h1>
            <p className="home-hero__lead">
              Peşəkar inkişafınızdan təşkilatınızın transformasiyasına — təlim, sertifikasiya və konsaltinq ilə
              yanınızdayıq.
            </p>
            <div className="home-hero__actions">
              <LinkButton href="/programs" label="Proqramları kəşf et" />
              <TextLink className="light" href="/services" label="Korporativ həllər" />
            </div>
          </div>
          <figure className="photo-card">
            <img
              className="photo-card__img"
              src="/images/hero-workshop.jpg"
              alt="PMO.az iştirakçıları ADA Universitetində təlimdə"
              width={1600}
              height={900}
              fetchPriority="high"
            />
            <figcaption className="photo-card__caption">
              <span>BİLİKDƏN TƏCRÜBƏYƏ</span>
              <strong>Birlikdə öyrənirik. Birlikdə inkişaf edirik.</strong>
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

      {/* Trust — Figma 10:5 */}
      <section className="trust" aria-label="Akkreditasiya və tərəfdaşlar">
        <p className="eyebrow">BEYNƏLXALQ STANDARTLAR. YERLİ EKSPERTİZA.</p>
        <ul className="trust__list">
          {PARTNERS.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      {/* Programs — Figma 10:6 */}
      <section className="section bg-cream home-programs" id="programs">
        <p className="eyebrow">01 / PEŞƏKAR İNKİŞAF</p>
        <div className="section-head">
          <h2 className="h-section">
            Növbəti addımınız
            <br />
            buradan başlayır.
          </h2>
          <TextLink href="/programs" label="Bütün proqramlar" />
        </div>
        <ProgramFilter programs={programs} />
        <p className="footnote">Proqram detalları və qeydiyyat üçün pmu.az saytına keçid edilir.</p>
      </section>

      {/* Services — Figma 10:7 */}
      <section className="section bg-green home-services">
        <p className="eyebrow">02 / TƏŞKİLATLAR ÜÇÜN</p>
        <div className="home-services__body">
          <div className="home-services__intro">
            <h2 className="h-section">
              Təkcə öyrətmirik.
              <br />
              Birlikdə tətbiq edirik.
            </h2>
            <p className="lead">
              Komandanızın potensialını gücləndirin, proseslərinizi təkmilləşdirin və layihələriniz üçün ölçülə bilən
              dəyər yaradın.
            </p>
            <TextLink href="/contact" label="Konsultasiya üçün müraciət et" />
          </div>
          <ul className="service-lines">
            {pillars.map(({ n, title, homeText: text, href }) => (
              <li key={n}>
                <Link className="service-line" href={href}>
                  <span className="service-line__num">{n}</span>
                  <span className="service-line__copy">
                    <strong>{title}</strong>
                    <span>{text}</span>
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

      {/* Case study — Figma 10:8 */}
      <section className="section bg-pale home-case">
        <p className="eyebrow">03 / GREENPM · TƏCRÜBƏDƏ DAYANIQLILIQ</p>
        <div className="home-case__body">
          <div className="home-case__story">
            <h2 className="h-section">
              Dayanıqlılıq,
              <br />
              real layihələrdə.
            </h2>
            <h3 className="home-case__project">
              Hilton Garden Inn Baku
              <br />
              by PMD Projects
            </h3>
            <p className="lead">
              GPM360 yanaşması ilə layihənin insanlara, planetə və rifaha təsirinin qiymətləndirilməsi və
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
      </section>

      {/* Knowledge — Figma 10:9 */}
      <section className="section bg-cream home-knowledge" id="learning">
        <p className="eyebrow">04 / BİLİK VƏ İCMA</p>
        <h2 className="h-section">Öyrənməyə davam edin.</h2>
        <div className="home-knowledge__body">
          <article className="news-feature">
            <img
              className="news-feature__img"
              src={news.image ?? "/images/news-avrora.jpg"}
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
            <p className="eyebrow">KİTABLAR VƏ İŞ DƏFTƏRLƏRİ</p>
            <h3 className="books__title">
              Təcrübəniz üçün
              <br />
              masaüstü mənbələr.
            </h3>
            <ul className="books__list">
              {books.map(({ title, format, price }) => (
                <li key={title}>
                  <span>
                    <strong>{title}</strong>
                    <small>{format}</small>
                  </span>
                  <b>{price}</b>
                </li>
              ))}
            </ul>
            <TextLink href="https://pmbook.az" label="Bütün kitablar" />
          </div>
        </div>
        <div className="learn-banner">
          <div className="learn-banner__copy">
            <p className="learn-banner__eyebrow">EDU.PMO.AZ / VİDEOKURSLAR</p>
            <p className="learn-banner__title">Öz tempinizdə, hər yerdən öyrənin.</p>
            <p className="learn-banner__text">Videodərslər, praktik materiallar və testlər bir platformada.</p>
          </div>
          <LinkButton variant="secondary" href="https://edu.pmo.az" label="Platformaya keç" />
        </div>
      </section>

      {/* Contact — Figma 10:10 */}
      <section className="section bg-lime home-contact" id="contact">
        <div className="home-contact__intro">
          <p className="eyebrow">05 / BİRLİKDƏ İNKİŞAF EDƏK</p>
          <h2 className="home-contact__title">
            Növbəti layihəniz
            <br />
            haqqında danışaq.
          </h2>
          <p className="home-contact__lead">
            Sizə uyğun proqramı və ya təşkilatınız üçün doğru həlli birlikdə müəyyən edək.
          </p>
          <a className="home-contact__phone" href={contact.phoneHref}>
            {contact.phone}
          </a>
          <a className="home-contact__email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
        <EnquiryForm source="home" className="home-contact__form" />
      </section>
    </>
  );
}
