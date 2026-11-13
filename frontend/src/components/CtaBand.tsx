import { LinkButton } from "./Button";

/** Lime call-to-action band used at the bottom of inner pages (Figma "CTA" / "Community"). */
export function CtaBand({
  title,
  text,
  label = "Bizimlə əlaqə saxlayın",
  href = "/contact",
}: {
  title: string;
  text: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="section bg-lime cta-band">
      <div className="cta-band__copy c-ink">
        <h2 className="t-h2">{title}</h2>
        <p className="t-body">{text}</p>
      </div>
      <LinkButton variant="secondary" href={href} label={label} />
    </section>
  );
}
