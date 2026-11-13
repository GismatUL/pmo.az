"use client";

import { useState } from "react";
import { ProgramCard, type Program } from "./ProgramCard";

export type FilterableProgram = Program & { family: string };

const FAMILIES = ["IPMA", "PMI", "GPM", "PeopleCert", "APMG"];

/** Filter chips + program card grid. */
export function ProgramFilter({
  programs,
  families = FAMILIES,
  gridClassName = "program-grid",
}: {
  programs: FilterableProgram[];
  families?: string[];
  gridClassName?: string;
}) {
  const [active, setActive] = useState("Hamısı");
  const visible = active === "Hamısı" ? programs : programs.filter((p) => p.family === active);

  return (
    <>
      <div className="chips" role="group" aria-label="Proqram filtri">
        {["Hamısı", ...families].map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={active === f} onClick={() => setActive(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className={gridClassName}>
        {visible.length > 0 ? (
          visible.map((p) => <ProgramCard key={p.title} {...p} />)
        ) : (
          <p className="program-empty">Bu kateqoriya üzrə proqramlar tezliklə əlavə olunacaq.</p>
        )}
      </div>
    </>
  );
}
