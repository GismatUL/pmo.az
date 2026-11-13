import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PMO.az — Layihə Düşüncə Məktəbi",
  description: "Layihə idarəetməsi üzrə beynəlxalq təcrübə, sertifikasiya və konsaltinq.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az">
      <body>{children}</body>
    </html>
  );
}
