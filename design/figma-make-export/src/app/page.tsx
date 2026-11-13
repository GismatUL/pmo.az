import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Footer, Header } from "@/components/SiteChrome";

const stats = [
  ["2000+", "məzun"],
  ["500+", "sertifikasiya"],
  ["100+", "həyata keçirilən layihə"],
  ["50+", "ekspert və təlimçi"],
];
const programs = [
  ["IPMA ICB4", "Layihə idarəetmə kompetensiyalarınızı beynəlxalq səviyyədə təsdiqləyin."],
  ["PMP® hazırlığı", "Qlobal layihə idarəetmə yanaşmalarını öyrənin və imtahana hazırlaşın."],
  ["GPM-b", "Layihələrə insan, planet və rifah prizmasından baxın."],
];

export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="home-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <small>LAYİHƏ DÜŞÜNCƏ MƏKTƏBİ</small>
            <h1>
              Layihə düşüncəsi.
              <br />
              Beynəlxalq təcrübə.
              <br />
              Real nəticələr.
            </h1>
            <p>
              Peşəkar inkişafınızdan təşkilatınızın transformasiyasına — təlim, sertifikasiya və
              konsaltinq ilə yanınızdayıq.
            </p>
            <div className="actions">
              <Link className="button lime" href="/programs">
                Proqramları kəşf et ↗
              </Link>
              <Link href="/services">Korporativ həllər ↗</Link>
            </div>
          </div>
          <div className="hero-photo">
            <Image
              src="/assets/467bf.png"
              alt="PMO.az workshop at ADA University"
              width={1600}
              height={900}
              priority
            />
            <div>
              <small>BİLİKDƏN TƏCRÜBƏYƏ</small>
              <strong>Birlikdə öyrənirik. Birlikdə inkişaf edirik.</strong>
            </div>
          </div>
        </div>
        <div className="stats">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="trust">
        <small>BEYNƏLXALQ STANDARTLAR. YERLİ EKSPERTİZA.</small>
        <div>
          <span>IPMA / AzPMA</span>
          <span>GPM Global</span>
          <span>PeopleCert</span>
          <span>APMG International</span>
          <span>PMI imtahan hazırlığı</span>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <small>01 / PEŞƏKAR İNKİŞAF</small>
            <h2>
              Növbəti addımınızı
              <br />
              buradan başlayın.
            </h2>
          </div>
          <Link href="/programs">Bütün proqramlar ↗</Link>
        </div>
        <div className="program-grid">
          {programs.map(([title, text], i) => (
            <article className="program-card" key={title}>
              <small>0{i + 1} / SERTİFİKASİYA</small>
              <h3>{title}</h3>
              <p>{text}</p>
              <strong>Qiymət təsdiqlənir</strong>
              <Link href="/programs">Proqrama bax ↗</Link>
            </article>
          ))}
        </div>
      </section>
      <section className="green-section split">
        <div>
          <small>02 / TƏŞKİLATINIZ ÜÇÜN</small>
          <h2>
            Təkcə öyrətmirik.
            <br />
            Birlikdə tətbiq edirik.
          </h2>
          <p>Ehtiyaclarınızı proseslərə, sistemlərə və nəticələrə çeviririk.</p>
        </div>
        <div className="service-links">
          <Link href="/services">
            <span>Təlimlər</span>↗
          </Link>
          <Link href="/services">
            <span>Sertifikasiya</span>↗
          </Link>
          <Link href="/services">
            <span>Tətbiq</span>↗
          </Link>
        </div>
      </section>
      <section className="section sustainability">
        <div>
          <small>03 / YAŞIL DÜŞÜNCƏ</small>
          <h2>
            Dayanıqlılıq,
            <br />
            real layihələrdə.
          </h2>
          <h3>
            Həlləri dəyərlə birgə
            <br />
            by PMO Projects
          </h3>
          <p>İnsanlara, planetə və rifaha təsiri ölçən layihə idarəetmə yanaşmaları.</p>
        </div>
        <aside>
          <small>SUSTAINABLE PROJECT THINKING</small>
          <strong>
            People.
            <br />
            <em>Planet.</em>
            <br />
            Prosperity.
          </strong>
          <p>İnsanlar · Planet · Rifah</p>
        </aside>
      </section>
      <section className="section learning" id="learning">
        <small>04 / ÖYRƏNMƏ MƏRKƏZİ</small>
        <h2>Öyrənməyə davam edin.</h2>
        <div className="learning-grid">
          <div>
            <Image
              src="/assets/e38b7.png"
              alt="Avrora komandası ilə IPMA ICB4 təlimi"
              width={1600}
              height={900}
            />
            <h3>Avrora komandası ilə IPMA ICB4 təliminə start verdik.</h3>
          </div>
          <div className="article-list">
            <h3>Təcrübəniz üçün masaüstü mənbələr.</h3>
            <a>
              Layihə Jurnalı <span>80 s.</span>
            </a>
            <a>
              Layihə menecerləri üçün poster <span>0.00 s.</span>
            </a>
            <a>
              Risk kommunikasiya modeli <span>35.00 s.</span>
            </a>
          </div>
        </div>
      </section>
      <section className="home-contact">
        <div>
          <small>05 / BİZİMLƏ ƏLAQƏ</small>
          <h2>
            Növbəti layihəniz
            <br />
            haqqında danışaq.
          </h2>
          <p>Siz nəyi qurmaq və dəyişmək üçün bu gün qərar verirsiniz?</p>
          <strong>(+994 55) 205 60-00</strong>
        </div>
        <ContactForm compact />
      </section>
      <Footer />
    </main>
  );
}
