const ITEMS = [
  {
    title: "Threat Reports",
    description: "Verified write-ups of active cyber threats and incidents.",
    icon: (
      <path d="M12 3 4 6v6c0 4.5 3.2 8.4 8 9 4.8-.6 8-4.5 8-9V6l-8-3Z" />
    ),
  },
  {
    title: "Scam Alerts",
    description: "Early warnings on fraud patterns targeting everyday users.",
    icon: (
      <>
        <path d="M12 9v4M12 17h.01" />
        <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.7 3.86a2 2 0 0 0-3.4 0Z" />
      </>
    ),
  },
  {
    title: "Case Analyses",
    description: "Evidence-based breakdowns of cybercrime investigations.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35M8 11h6" />
      </>
    ),
  },
  {
    title: "Security Guides",
    description: "Practical, plain-language guidance for staying protected.",
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      </>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface-2">
      <div className="container-max grid grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
            </span>
            <p className="font-display text-base font-bold text-text">{item.title}</p>
            <p className="text-sm leading-relaxed text-text-dim">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
