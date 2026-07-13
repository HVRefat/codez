import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";
import EmptyState from "@/components/EmptyState";
import RetryState from "@/components/RetryState";
import { getArticles, getCategories } from "@/lib/api";

const LIMIT = 9;

type ArticlesPageProps = {
  searchParams: Promise<{ page?: string; category?: string }>;
};

export async function generateMetadata({
  searchParams,
}: ArticlesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  return {
    title: "Articles",
    description:
      "Cyber security, technology, and crime analysis articles from Code Z.",
    alternates: { canonical: "/articles" },
    ...(page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const category = params.category;

  const [articlesRes, categoriesRes] = await Promise.all([
    getArticles({ page, limit: LIMIT, category }),
    getCategories(),
  ]);

  const categories = categoriesRes ?? [];

  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="label-eyebrow mb-2 text-xs text-accent">Articles</p>
        <h1 className="font-display text-3xl font-extrabold text-text sm:text-4xl">
          Security, Technology &amp; Crime Analysis
        </h1>
      </header>

      {categories.length > 0 && (
        <div className="mb-8">
          <CategoryFilter categories={categories} basePath="/articles" active={category} />
        </div>
      )}

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
              basePath="/articles"
              currentPage={page}
              totalPages={articlesRes.total_pages}
              searchParams={{ category }}
            />
          </div>
        </>
      ) : (
        <EmptyState
          title={category ? "No articles in this category yet" : "New articles coming soon"}
          description="Security, technology, and crime analysis articles will appear here."
        />
      )}
    </div>
  );
}
