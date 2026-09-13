import type { ReactNode } from "react";

type KickerProps = {
  children: ReactNode;
  light?: boolean;
  className?: string;
};

export function Kicker({ children, light = false, className = "" }: KickerProps) {
  const classes = ["kicker", light ? "kicker-light" : "", className].filter(Boolean).join(" ");
  return <p className={classes}>{children}</p>;
}
