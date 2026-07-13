import Link from "next/link";
import HeroStatic from "@/components/HeroStatic";
import Hero3DMount from "@/components/Hero3DMount";

export default function HeroSection() {
  return (
    <section className="container-max grid items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
      <div className="order-2 lg:order-1">
        <p className="label-eyebrow mb-4 text-xs text-accent">
          Cyber Security &middot; Crime Analysis
        </p>
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight text-text">
          <span className="sr-only">Code Z — </span>
          Understand the threats. Protect what matters.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-[1.6] text-text-dim sm:text-lg">
          Code Z tracks the cyber security incidents, scams, and technology
          shifts shaping Bangladesh — verified threat reports and clear
          analysis, built for readers and businesses who need to stay ahead
          of the risk.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/reports" className="btn-primary">
            Latest Threat Reports
          </Link>
          <Link href="/articles" className="btn-secondary">
            Explore Articles
          </Link>
        </div>
      </div>

      <div className="order-1 flex justify-center lg:order-2">
        {/* Fixed-aspect box reserves space server-side (zero CLS). The static
            SVG is the hero immediately; the 3D canvas cross-fades in over it. */}
        <div className="relative aspect-square w-full max-w-md">
          <HeroStatic />
          <Hero3DMount />
        </div>
      </div>
    </section>
  );
}
