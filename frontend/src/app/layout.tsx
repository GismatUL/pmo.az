import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { asset } from "@/lib/asset";
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
  title: { default: "PMO.az — Layihə idarəetməsi üzrə konsaltinq", template: "%s — PMO.az" },
  description:
    "PMO qurulması, portfel idarəetməsi, layihələrin planlaşdırılması, monitorinqi və nəzarəti üzrə konsaltinq və məsləhət xidmətləri.",
  icons: { icon: asset("/favicon.png") },
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
