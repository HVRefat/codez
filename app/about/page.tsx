import type { Metadata } from "next";
import { aboutPageJsonLd, jsonLdHtml, personJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Code Z is a Bangladesh-focused cyber security, technology, and crime analysis publication built by Habibul Islam Refat.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(aboutPageJsonLd())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(personJsonLd())}
      />

      <header className="mb-10">
        <p className="label-eyebrow mb-2 text-xs text-accent">About</p>
        <h1 className="font-display text-3xl font-extrabold text-text sm:text-4xl">
          About Code Z
        </h1>
      </header>

      <div className="prose-max flex flex-col gap-5 text-base leading-relaxed text-text">
        <p>
          Code Z is a Bangladesh-focused publication covering cyber security,
          technology, and crime analysis. We treat every story like a case
          file: verified, sourced, and stripped of sensationalism — because
          the audience reading about a scam network today could be its next
          target tomorrow.
        </p>
        <p>
          The site covers three beats. Security tracks vulnerabilities,
          breaches, and the defensive tooling that matters to ordinary users
          and small businesses, not just enterprise security teams.
          Technology follows the infrastructure and product shifts reshaping
          how Bangladesh gets online. Crime analysis reconstructs cybercrime
          and fraud cases from the evidence outward, and flags active scam
          patterns before they spread further.
        </p>
        <p>
          Code Z is a subdomain property of{" "}
          <a
            href="https://monmoto.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Monmoto
          </a>
          , a Bangladesh e-commerce platform, but operates with its own
          editorial identity, built for readers on low-bandwidth connections
          and budget Android devices first.
        </p>
      </div>

      <div className="panel prose-max mt-12 p-6">
        <p className="label-eyebrow mb-2 text-[11px] text-text-dim">Author</p>
        <h2 className="font-display text-xl font-semibold text-text">
          Habibul Islam Refat
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-dim">
          Founder and builder of Code Z. Focused on making cyber security and
          crime analysis reporting accessible, evidence-driven, and fast to
          load — even on the class of devices most of the intended audience
          actually owns.
        </p>
      </div>
    </div>
  );
}
