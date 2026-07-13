// Static visual shown in the scrolly stage before the canvas fades in (and
// permanently, if the 3D scene is ineligible, e.g. low-memory desktop).
export default function StoryVisualFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 480 480"
        width="100%"
        height="100%"
        role="img"
        aria-label="Abstract security formation of particles"
      >
        <defs>
          <radialGradient id="storyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="240" cy="240" r="220" fill="url(#storyGlow)" />
        <circle cx="240" cy="240" r="150" fill="none" stroke="var(--line)" strokeWidth="1" />
        <circle
          cx="240"
          cy="240"
          r="150"
          fill="none"
          stroke="var(--brand)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          const r = 150;
          const cx = 240 + Math.cos(angle) * r;
          const cy = 240 + Math.sin(angle) * r;
          return <circle key={i} cx={cx} cy={cy} r={2} fill="var(--brand)" opacity={0.7} />;
        })}
      </svg>
    </div>
  );
}
