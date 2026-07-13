import Link from "next/link";
import type { Category } from "@/lib/types";

type CategoryFilterProps = {
  categories: Category[];
  basePath: string;
  active?: string;
};

export default function CategoryFilter({
  categories,
  basePath,
  active,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="list" aria-label="Filter by category">
      <Link
        href={basePath}
        prefetch={false}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          !active
            ? "border-brand bg-brand/10 text-brand"
            : "border-line text-text-dim hover:border-brand hover:text-brand"
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`${basePath}?category=${category.slug}`}
          prefetch={false}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === category.slug
              ? "border-brand bg-brand/10 text-brand"
              : "border-line text-text-dim hover:border-brand hover:text-brand"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
