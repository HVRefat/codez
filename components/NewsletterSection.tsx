export default function NewsletterSection() {
  return (
    <section className="border-t border-line bg-surface-2">
      <div className="container-max flex flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="label-eyebrow mb-2 text-xs text-accent">Stay briefed</p>
          <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
            New threat reports, straight to your inbox.
          </h2>
        </div>
        <form className="flex w-full max-w-sm gap-2 md:w-auto" aria-label="Newsletter signup">
          <label htmlFor="home-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="home-newsletter-email"
            type="email"
            required
            placeholder="you@email.com"
            className="min-h-11 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-text placeholder:text-text-dim focus:border-brand"
          />
          <button type="submit" className="btn-primary shrink-0 text-sm">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
