"use client";

import { useMemo, useState } from "react";

const programs = [
  [
    "IPMA / AZPMA",
    "IPMA ICB4",
    "Beynəlxalq layihə idarəetmə kompetensiyalarının inkişafı və sertifikasiya hazırlığı.",
  ],
  [
    "PMI / İMTAHAN HAZIRLIĞI",
    "PMP® hazırlığı",
    "Qlobal layihə idarəetmə yanaşmalarını öyrənin və PMP imtahanına hazırlaşın.",
  ],
  [
    "GPM GLOBAL",
    "GPM-b",
    "Dayanıqlılığı layihələrin qərarlarına və gündəlik idarəetməsinə inteqrasiya edin.",
  ],
  [
    "PEOPLECERT",
    "PRINCE2®",
    "Strukturlaşdırılmış layihə idarəetmə yanaşması ilə biliklərinizi genişləndirin.",
  ],
  [
    "PEOPLECERT",
    "ITIL®",
    "İT xidmətlərinin idarə edilməsi üzrə beynəlxalq yanaşmalarla tanış olun.",
  ],
  [
    "APMG INTERNATIONAL",
    "CP3P / PPP",
    "Dövlət-özəl tərəfdaşlığı layihələri üzrə beynəlxalq sertifikasiya hazırlığı.",
  ],
] as const;
const filters = ["Hamısı", "IPMA", "PMI", "GPM", "PeopleCert", "APMG"];

export function ProgramCatalogue() {
  const [filter, setFilter] = useState("Hamısı");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      programs.filter(([body, title]) => {
        const filterMatch =
          filter === "Hamısı" || body.toLowerCase().includes(filter.toLowerCase());
        return filterMatch && `${body} ${title}`.toLowerCase().includes(query.toLowerCase());
      }),
    [filter, query],
  );

  return (
    <section className="section catalogue">
      <label className="search">
        Proqram axtar
        <span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Proqram və ya sertifikasiya adı"
          />
          <button className="button dark" type="button">
            Axtar ↗
          </button>
        </span>
      </label>
      <div className="filters">
        {filters.map((item) => (
          <button
            className={filter === item ? "selected" : ""}
            key={item}
            onClick={() => setFilter(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="catalogue-summary">
        <span>Seçilmiş {visible.length} proqram</span>
        <span>Tam kataloq: pmu.az ↗</span>
      </div>
      <p className="notice">
        Proqram qiymətləri təsdiq gözləyir. Detallar, formatlar və qeydiyyat pmu.az saytındadır.
      </p>
      <div className="program-grid">
        {visible.map(([body, title, text]) => (
          <article className="program-card" key={title}>
            <small>{body}</small>
            <h3>{title}</h3>
            <p>{text}</p>
            <strong>Qiymət təsdiqlənir</strong>
            <a href="https://pmu.az">pmu.az-da ətraflı ↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}
