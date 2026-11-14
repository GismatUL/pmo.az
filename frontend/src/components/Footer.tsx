import Link from "next/link";
import { getContact, getLinks } from "@/lib/api";
import { ARROW, ECOSYSTEM } from "@/lib/site";
import { asset } from "@/lib/asset";

const EXPLORE = [
  { label: "Xidmətlər", href: "/services" },
  { label: "Təlimlər", href: "/programs" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Ekspertlər", href: "/about#founder" },
  { label: "Xəbərlər", href: "/blog" },
];

export async function Footer() {
  const [CONTACT, links] = await Promise.all([getContact(), getLinks()]);
  const SOCIAL = [
    { label: "LinkedIn", href: links.linkedin },
    { label: "Instagram", href: links.instagram },
    { label: "YouTube", href: links.youtube },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__nav">
        <div className="site-footer__brand">
          <img src={asset("/images/logo.png")} alt="PMO.az" width={150} height={58} loading="lazy" />
          <p className="site-footer__tagline">
            Layihə idarəetməsi üzrə
            <br />
            konsaltinq və məsləhət.
          </p>
          <p className="site-footer__social">
            {SOCIAL.map((s, i) => (
              <span key={s.label}>
                {i > 0 && "  ·  "}
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
              </span>
            ))}
          </p>
        </div>

        <div className="site-footer__col">
          <h2>Kəşf edin</h2>
          {EXPLORE.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="site-footer__col">
          <h2>PMO ekosistemi</h2>
          {ECOSYSTEM.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
              {`${l.label}${ARROW}`}
            </a>
          ))}
        </div>

        <div className="site-footer__col">
          <h2>Bizimlə əlaqə</h2>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <p>
            {CONTACT.address[0]}
            <br />
            {CONTACT.address[1]}
          </p>
          <p>{CONTACT.hours}</p>
        </div>
      </div>

      <div className="site-footer__legal">
        <p>© 2026 PMO.az. Bütün hüquqlar qorunur.</p>
        <p>{"Məxfilik siyasəti  ·  AZ / RU / EN"}</p>
      </div>
    </footer>
  );
}
