import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "@/styles/base.css";
import "@/styles/components.css";
import "@/styles/pages.css";
import "@/styles/inner.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "PMO.az — Layihə düşüncə məktəbi", template: "%s — PMO.az" },
  description:
    "Peşəkar inkişafınızdan təşkilatınızın transformasiyasına — təlim, sertifikasiya və konsaltinq ilə yanınızdayıq.",
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#103e34",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
