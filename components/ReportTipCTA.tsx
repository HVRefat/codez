import Link from "next/link";

export default function ReportTipCTA() {
  return (
    <section className="container-max px-4 py-16 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-brand px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div>
          <p className="label-eyebrow mb-2 text-xs text-white/70">Seen something suspicious?</p>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Report a cybercrime tip
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Share a scam, breach, or fraud attempt with our team — every tip
            helps build the next threat report.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-white px-6 font-semibold text-brand-strong transition-transform hover:-translate-y-0.5"
        >
          Report a Tip
        </Link>
      </div>
    </section>
  );
}
