"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ARROW, NAV } from "@/lib/site";
import { asset } from "@/lib/asset";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`site-header ${pathname === "/" ? "" : "site-header--inner"}`}>
      <Link className="site-header__logo" href="/" aria-label="PMO.az — ana səhifə">
        <img src={asset("/images/logo.png")} alt="PMO.az" width={136} height={52} />
      </Link>

      <nav className="site-nav" aria-label="Əsas naviqasiya">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="site-header__tools">
        <span className="lang-switch">{"AZ  /  RU  /  EN"}</span>
        <a className="site-header__login" href="https://edu.pmo.az" target="_blank" rel="noopener noreferrer">
          {`Daxil ol${ARROW}`}
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobil naviqasiya" hidden={!open}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
        <a href="https://edu.pmo.az" target="_blank" rel="noopener noreferrer">
          {`Daxil ol${ARROW}`}
        </a>
      </nav>
    </header>
  );
}
