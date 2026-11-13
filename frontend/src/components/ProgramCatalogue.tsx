"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ARROW } from "@/lib/site";
import { Button } from "./Button";
import { Field } from "./Field";
import { ProgramCard } from "./ProgramCard";
import type { FilterableProgram } from "./ProgramFilter";

const FAMILIES = ["IPMA", "PMI", "GPM", "PeopleCert", "APMG"];

/** Programs page catalogue: search, certification-body chips and card grid (Figma 16:329). */
export function ProgramCatalogue({ programs }: { programs: FilterableProgram[] }) {
  const [family, setFamily] = useState("Hamısı");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("az");
    return programs.filter(
      (p) =>
        (family === "Hamısı" || p.family === family) &&
        (!q || `${p.title} ${p.meta} ${p.text}`.toLocaleLowerCase("az").includes(q)),
    );
  }, [programs, family, query]);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    setQuery(draft);
  }

  return (
    <>
      <form className="catalogue-search" role="search" onSubmit={onSearch}>
        <Field
          label="Proqram axtar"
          name="q"
          type="search"
          placeholder="Proqram və ya sertifikasiya adı"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (!e.target.value) setQuery("");
          }}
        />
        <Button type="submit">Axtar</Button>
      </form>

      <div className="chips chips--label" role="group" aria-label="Sertifikasiya qurumu">
        {["Hamısı", ...FAMILIES].map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={family === f} onClick={() => setFamily(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="catalogue-summary t-label">
        <p className="c-ink" aria-live="polite">
          Seçilmiş {visible.length} proqram
        </p>
        <a className="c-muted" href="https://pmu.az" target="_blank" rel="noopener noreferrer">
          {`Tam kataloq: pmu.az${ARROW}`}
        </a>
      </div>

      <p className="notice t-label c-muted">
        Proqram qiymətləri təsdiq gözləyir. Detallar, formatlar və qeydiyyat pmu.az saytındadır.
      </p>

      <div className="program-grid program-grid--catalogue">
        {visible.length > 0 ? (
          visible.map((p) => <ProgramCard key={p.title} {...p} action="pmu.az-da ətraflı" />)
        ) : (
          <p className="program-empty">Axtarışınıza uyğun proqram tapılmadı.</p>
        )}
      </div>
    </>
  );
}
