import type { ComponentProps } from "react";

/** PMO / Form field */
export function Field({ label, ...input }: { label: string } & ComponentProps<"input">) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input className="field__input" {...input} />
    </label>
  );
}

/** PMO / Textarea */
export function TextArea({ label, ...input }: { label: string } & ComponentProps<"textarea">) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <textarea className="field__input" {...input} />
    </label>
  );
}
