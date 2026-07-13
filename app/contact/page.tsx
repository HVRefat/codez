import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Code Z or report a cybercrime tip.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="label-eyebrow mb-2 text-xs text-accent">Contact</p>
        <h1 className="font-display text-3xl font-extrabold text-text sm:text-4xl">
          Get in Touch
        </h1>
        <p className="prose-max mt-4 text-base leading-relaxed text-text-dim">
          Have a tip, correction, or story lead? Use the form below —
          including if you need to report a cybercrime tip for investigation.
        </p>
      </header>

      <div className="prose-max">
        <ContactForm />
      </div>
    </div>
  );
}
