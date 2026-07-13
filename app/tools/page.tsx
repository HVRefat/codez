import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Tools",
  description:
    "Free security tools and checklists from Code Z — coming soon.",
  alternates: { canonical: "/tools" },
};

const PLANNED_TOOLS = [
  {
    title: "Password Breach Checker",
    description:
      "Check whether an email or password has appeared in a known data breach.",
  },
  {
    title: "Scam-Alert Checklist",
    description:
      "A step-by-step checklist for verifying a suspicious message, call, or job offer before you act.",
  },
  {
    title: "Mobile Financial Services Security Guide",
    description:
      "A practical checklist for locking down MFS accounts against SIM-swap and OTP-theft attacks.",
  },
  {
    title: "Incident Response One-Pager",
    description:
      "What to do in the first hour after you suspect an account, device, or business system has been compromised.",
  },
];

export default function ToolsPage() {
  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="label-eyebrow mb-2 text-xs text-accent">Tools</p>
        <h1 className="font-display text-3xl font-extrabold text-text sm:text-4xl">
          Free Security Tools &amp; Checklists
        </h1>
        <p className="prose-max mt-4 text-base leading-relaxed text-text-dim">
          A growing set of practical, no-signup tools and checklists to help
          you check exposure and harden accounts. Currently in development.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLANNED_TOOLS.map((tool) => (
          <div key={tool.title} className="panel flex flex-col gap-3 p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-text">
                {tool.title}
              </h2>
              <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-text-dim">
                Soon
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-dim">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
