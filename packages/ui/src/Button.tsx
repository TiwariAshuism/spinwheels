import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "yellow" | "outline-light" | "outline" | "ghost";

type SharedProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "yellow",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "yellow"
      ? "btn-yellow"
      : variant === "outline-light"
        ? "btn-outline-light"
        : variant === "outline"
          ? "btn-outline"
          : "btn-ghost";

  const classes = ["btn", variantClass, className].filter(Boolean).join(" ");

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
