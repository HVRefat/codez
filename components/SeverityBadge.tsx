import type { Severity } from "@/lib/types";

const SEVERITY_STYLES: Record<Severity, { label: string; color: string }> = {
  low: { label: "Low", color: "var(--severity-low)" },
  medium: { label: "Medium", color: "var(--severity-medium)" },
  high: { label: "High", color: "var(--severity-high)" },
  critical: { label: "Critical", color: "var(--severity-critical)" },
};

export default function SeverityBadge({ severity }: { severity: Severity }) {
  const style = SEVERITY_STYLES[severity] ?? SEVERITY_STYLES.low;

  return (
    <span
      className="label-eyebrow inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
      style={{
        color: style.color,
        backgroundColor: `color-mix(in srgb, ${style.color} 14%, transparent)`,
      }}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: style.color }}
      />
      {style.label}
    </span>
  );
}
