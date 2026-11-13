import Image from "next/image";
import Link from "next/link";

const nav = [
  ["Proqramlar", "/programs"],
  ["Xidmətlər", "/services"],
  ["Haqqımızda", "/about"],
  ["Bloq", "/#learning"],
  ["Əlaqə", "/contact"],
] as const;

export function Header({ active }: { active?: string }) {
  return (
    <header className="header">
      <Link href="/" aria-label="PMO.az ana səhifə">
        <Image
          className="logo"
          src="/assets/78586.png"
          alt="PMO.az"
          width={136}
          height={52}
          priority
        />
      </Link>
      <nav className="desktop-nav" aria-label="Əsas naviqasiya">
        {nav.map(([label, href]) => (
          <Link className={active === label ? "active" : ""} href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-tools">
        <span>AZ&nbsp; / &nbsp;RU&nbsp; / &nbsp;EN</span>
        <span className="login">Daxil ol ↗</span>
        <details className="mobile-menu">
          <summary aria-label="Menyunu aç">☰</summary>
          <nav>
            {nav.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/assets/78586.png" alt="PMO.az" width={150} height={58} />
          <p>
            Beynəlxalq təcrübə.
            <br />
            Yerli dəyər. Real nəticələr.
          </p>
          <p>LinkedIn · Instagram · YouTube</p>
        </div>
        <div>
          <strong>Kəşf edin</strong>
          <Link href="/programs">Proqramlar</Link>
          <Link href="/services">Xidmətlər</Link>
          <Link href="/about">Haqqımızda</Link>
          <span>Ekspertlər</span>
          <span>Xəbərlər</span>
        </div>
        <div>
          <strong>PMO ekosistemi</strong>
          <span>pmu.az ↗</span>
          <span>greenpm.az ↗</span>
          <span>pppcenter.az ↗</span>
          <span>pmbook.az ↗</span>
          <span>edu.pmo.az ↗</span>
        </div>
        <div>
          <strong>Bizimlə əlaqə</strong>
          <a href="tel:+994552056000">(+994 55) 205 60-00</a>
          <a href="mailto:info@pmo.az">info@pmo.az</a>
          <span>
            8 Noyabr prospekti, 25
            <br />
            Bakı Ağ Şəhər biznes mərkəzi
          </span>
          <span>B.e. – Cümə / 09:00–18:00</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PMO.az. Bütün hüquqlar qorunur.</span>
        <span>Məxfilik siyasəti · AZ / RU / EN</span>
      </div>
    </footer>
  );
}

export function InnerHero({
  active,
  title,
  intro,
}: {
  active: string;
  title: React.ReactNode;
  intro: string;
}) {
  return (
    <>
      <Header active={active} />
      <section className="inner-hero">
        <p className="breadcrumb">Ana səhifə&nbsp; / &nbsp;{active}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
    </>
  );
}

export function CTA({ title, text }: { title: string; text: string }) {
  return (
    <section className="cta">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <Link className="button dark" href="/contact">
        Bizimlə əlaqə saxlayın ↗
      </Link>
    </section>
  );
}
