import Link from "next/link";
import type { Category } from "@/lib/types";

export default function TopicsBand({ categories }: { categories: Category[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="container-max px-4 py-16 sm:px-6">
      <p className="label-eyebrow mb-2 text-xs text-accent">Topics</p>
      <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
        Browse by coverage area
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            prefetch={false}
            className="panel panel-hover flex items-center justify-between p-6"
          >
            <span className="font-display text-lg font-bold text-text">{category.name}</span>
            <span aria-hidden="true" className="text-xl text-brand">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
