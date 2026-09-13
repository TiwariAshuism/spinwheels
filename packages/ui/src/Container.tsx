import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  const classes = ["wrap", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
