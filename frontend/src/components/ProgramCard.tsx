import { TextLink } from "./Button";

export type Program = {
  meta: string;
  title: string;
  text: string;
  price?: string;
  href?: string;
  action?: string;
};

/** PMO / Program card */
export function ProgramCard({
  meta,
  title,
  text,
  price = "Qiymət təsdiqlənir",
  href = "https://pmu.az",
  action = "Proqrama bax",
}: Program) {
  return (
    <article className="program-card">
      <p className="program-card__meta">{meta}</p>
      <h3 className="program-card__title">{title}</h3>
      <p className="program-card__text">{text}</p>
      <p className="program-card__price">{price}</p>
      <TextLink href={href} label={action} />
    </article>
  );
}
