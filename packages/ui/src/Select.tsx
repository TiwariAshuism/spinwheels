import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children: ReactNode;
};

export function Select({ label, error, className = "", id, children, ...props }: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <label className={`field${className ? ` ${className}` : ""}`} htmlFor={selectId}>
      {label ? <span className="field-label">{label}</span> : null}
      <select id={selectId} className={`field-input${error ? " field-input-error" : ""}`} {...props}>
        {children}
      </select>
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
