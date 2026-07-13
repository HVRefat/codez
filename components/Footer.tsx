import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/articles", label: "Articles" },
  { href: "/reports", label: "Threat Reports" },
  { href: "/tools", label: "Security Tools" },
  { href: "/category/scam-alerts", label: "Scam Alerts" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "Report a Tip" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="container-max grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" className="font-display text-lg font-extrabold tracking-tight">
            Code <span className="text-brand">Z</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-dim">
            Bangladesh&apos;s cyber security and crime analysis publication —
            threat reports, case studies, and technology coverage you can
            trust.
          </p>
        </div>

        <div>
          <p className="label-eyebrow mb-4 text-xs text-text-dim">Explore</p>
          <nav className="flex flex-col gap-3">
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-text-dim transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="label-eyebrow mb-4 text-xs text-text-dim">Company</p>
          <nav className="flex flex-col gap-3">
            {COMPANY_LINKS.map((link, i) => (
              <Link
                key={`${link.label}-${i}`}
                href={link.href}
                className="text-sm text-text-dim transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="label-eyebrow mb-4 text-xs text-text-dim">Stay Briefed</p>
          <p className="mb-4 text-sm leading-relaxed text-text-dim">
            New threat reports and analysis, straight to your inbox.
          </p>
          <form className="flex gap-2" aria-label="Newsletter signup">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              placeholder="you@email.com"
              className="min-h-11 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-text placeholder:text-text-dim focus:border-brand"
            />
            <button type="submit" className="btn-primary shrink-0 px-4 text-sm">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-max flex flex-col gap-2 px-4 py-6 text-xs text-text-dim sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>&copy; {new Date().getFullYear()} Code Z. All rights reserved.</span>
          <span>
            Built by Habibul Islam Refat —{" "}
            <a
              href="https://monmoto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              a Monmoto property
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
