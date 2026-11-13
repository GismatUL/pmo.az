export const NAV = [
  { label: "Proqramlar", href: "/programs" },
  { label: "Xidmətlər", href: "/services" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Bloq", href: "/blog" },
  { label: "Əlaqə", href: "/contact" },
] as const;

export const CONTACT = {
  /** U+2011 non-breaking hyphen keeps "60-00" together, as in the design. */
  phone: "(+994 55) 205 60‑00",
  phoneHref: "tel:+994552056000",
  email: "info@pmo.az",
  address: ["8 Noyabr prospekti, 25", "Bakı Ağ Şəhər biznes mərkəzi"],
  hours: "B.e. – Cümə / 09:00–18:00",
};

export const ECOSYSTEM = [
  { label: "pmu.az", href: "https://pmu.az" },
  { label: "greenpm.az", href: "https://greenpm.az" },
  { label: "pppcenter.az", href: "https://pppcenter.az" },
  { label: "pmbook.az", href: "https://pmbook.az" },
  { label: "edu.pmo.az", href: "https://edu.pmo.az" },
];

/** Arrow suffix used across the design: two spaces + ↗ */
export const ARROW = "  ↗";
