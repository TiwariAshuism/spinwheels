export function HeroArt() {
  return (
    <div className="hero-art">
      <svg viewBox="0 0 320 300" width="100%" role="img" aria-label="A car pin on a map with a 2 hour pickup badge">
        <circle cx="160" cy="150" r="120" fill="var(--teal-mid)" />
        <path
          d="M60 190 L120 100 L200 100 L260 190"
          stroke="var(--trust-green)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="3 8"
          strokeLinecap="round"
        />
        <rect x="95" y="160" width="130" height="70" rx="14" fill="var(--bg)" />
        <rect x="110" y="178" width="40" height="24" rx="6" fill="var(--teal-dark)" />
        <circle cx="120" cy="212" r="9" fill="var(--teal-deep)" />
        <circle cx="195" cy="212" r="9" fill="var(--teal-deep)" />
        <rect x="150" y="178" width="55" height="18" rx="4" fill="var(--teal-deep)" />
        <g>
          <circle cx="230" cy="90" r="34" fill="var(--yellow)" />
          <text
            x="230"
            y="85"
            textAnchor="middle"
            fontFamily="Space Grotesk"
            fontWeight="700"
            fontSize="16"
            fill="var(--teal-deep)"
          >
            2 hrs
          </text>
          <text
            x="230"
            y="101"
            textAnchor="middle"
            fontFamily="IBM Plex Sans"
            fontSize="9"
            fill="var(--teal-deep)"
          >
            to pickup
          </text>
        </g>
      </svg>
    </div>
  );
}
