import Link from "next/link";

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  searchParams?: Record<string, string | undefined>;
};

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string | undefined>
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value) params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4 border-t border-line pt-6"
    >
      {prevDisabled ? (
        <span className="cursor-not-allowed text-sm font-medium text-text-dim/40">
          &larr; Previous
        </span>
      ) : (
        <Link
          href={buildHref(basePath, currentPage - 1, searchParams)}
          prefetch={false}
          className="text-sm font-medium text-text-dim transition-colors hover:text-brand"
        >
          &larr; Previous
        </Link>
      )}

      <span className="text-sm text-text-dim">
        Page {currentPage} of {totalPages}
      </span>

      {nextDisabled ? (
        <span className="cursor-not-allowed text-sm font-medium text-text-dim/40">
          Next &rarr;
        </span>
      ) : (
        <Link
          href={buildHref(basePath, currentPage + 1, searchParams)}
          prefetch={false}
          className="text-sm font-medium text-text-dim transition-colors hover:text-brand"
        >
          Next &rarr;
        </Link>
      )}
    </nav>
  );
}
