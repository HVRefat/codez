import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import RetryState from "@/components/RetryState";
import { getArticles, getCategories } from "@/lib/api";

const LIMIT = 9;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const categories = await getCategories();
  const category = categories?.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: category.name,
    description: `Latest ${category.name} coverage from Code Z.`,
    alternates: { canonical: `/category/${category.slug}` },
    ...(page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const categories = await getCategories();

  // API error resolving categories — quiet retry, not a misleading 404.
  if (categories === null) {
    return (
      <div className="container-max px-4 py-12 sm:px-6">
        <RetryState message="Couldn't load this category." />
      </div>
    );
  }

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const articlesRes = await getArticles({
    page,
    limit: LIMIT,
    category: category.name,
  });

  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="label-eyebrow mb-2 text-xs text-accent">Category</p>
        <h1 className="font-display text-3xl font-extrabold text-text sm:text-4xl">
          {category.name}
        </h1>
      </header>

      {articlesRes === null ? (
        <RetryState message="Couldn't load articles." />
      ) : articlesRes.data.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articlesRes.data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-10">
            <Pagination
              basePath={`/category/${category.slug}`}
              currentPage={page}
              totalPages={articlesRes.total_pages}
            />
          </div>
        </>
      ) : (
        <EmptyState
          title="No articles published in this category yet"
          description="Check back soon — new coverage is added regularly."
        />
      )}
    </div>
  );
}
