export default function HeroStatic() {
  return (
    <div className="hero-float absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 480 480"
        width="100%"
        height="100%"
        role="img"
        aria-label="Abstract illustration of a security shield formed by concentric rings and nodes"
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="240" cy="240" r="220" fill="url(#heroGlow)" />

        <circle cx="240" cy="240" r="170" fill="none" stroke="var(--line)" strokeWidth="1" />
        <circle
          cx="240"
          cy="240"
          r="130"
          fill="none"
          stroke="var(--brand)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle cx="240" cy="240" r="90" fill="none" stroke="var(--line)" strokeWidth="1" />

        {/* Shield */}
        <path
          d="M240 120 L316 150 V236 C316 288 284 322 240 340 C196 322 164 288 164 236 V150 Z"
          fill="var(--surface)"
          stroke="var(--brand)"
          strokeWidth="3"
        />
        <path
          d="M212 238 L232 258 L272 210"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Orbit nodes */}
        <circle cx="240" cy="70" r="6" fill="var(--accent)" />
        <circle cx="410" cy="240" r="5" fill="var(--brand)" />
        <circle cx="70" cy="240" r="5" fill="var(--brand)" />
        <circle cx="356" cy="356" r="4" fill="var(--accent)" />
        <circle cx="124" cy="356" r="4" fill="var(--line)" />
        <circle cx="356" cy="124" r="4" fill="var(--line)" />
      </svg>
    </div>
  );
}
