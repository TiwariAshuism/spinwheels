type SoonPillProps = {
  light?: boolean;
};

export function SoonPill({ light = false }: SoonPillProps) {
  const classes = ["soon-pill", light ? "light" : ""].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      <span className="dot" />
      Coming soon
    </span>
  );
}
