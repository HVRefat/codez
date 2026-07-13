import type { Metadata } from "next";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Code Z articles and threat reports.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="label-eyebrow mb-2 text-xs text-accent">Search</p>
        <h1 className="font-display text-3xl font-extrabold text-text">Search Code Z</h1>
      </header>

      <SearchClient />
    </div>
  );
}
