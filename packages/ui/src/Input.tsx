import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className={`field${className ? ` ${className}` : ""}`} htmlFor={inputId}>
      {label ? <span className="field-label">{label}</span> : null}
      <input id={inputId} className={`field-input${error ? " field-input-error" : ""}`} {...props} />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
