import type { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
};

export function Card({ children, className = "", title, subtitle }: CardProps) {
  return (
    <div className={`app-card${className ? ` ${className}` : ""}`}>
      {title ? (
        <div className="app-card-head">
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
