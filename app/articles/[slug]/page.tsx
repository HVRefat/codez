import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, getArticles } from "@/lib/api";
import { formatDate, readingTime } from "@/lib/format";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  FOUNDER_NAME,
  jsonLdHtml,
  SITE_URL,
} from "@/lib/jsonld";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt.slice(0, 155),
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt.slice(0, 155),
      url: `/articles/${article.slug}`,
      images: [article.cover_image ?? "/opengraph-image"],
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      authors: [FOUNDER_NAME],
      section: article.category,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const { data: relatedAll } = await getArticles({
    category: article.category,
    limit: 4,
  });
  const related = relatedAll.filter((a) => a.slug !== article.slug).slice(0, 3);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Articles", url: `${SITE_URL}/articles` },
    { name: article.title, url: `${SITE_URL}/articles/${article.slug}` },
  ]);

  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(articleJsonLd(article))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(breadcrumb)}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-dim">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/articles" className="hover:text-brand">
          Articles
        </Link>
      </nav>

      <article className="prose-max mx-auto">
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <Link
              href={`/category/${article.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand"
            >
              {article.category}
            </Link>
            <span className="text-text-dim">&middot;</span>
            <time dateTime={article.created_at} className="text-text-dim">
              {formatDate(article.created_at)}
            </time>
            <span className="text-text-dim">&middot;</span>
            <span className="text-text-dim">{readingTime(article.content)} min read</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight text-text sm:text-4xl">
            {article.title}
          </h1>
        </header>

        {article.cover_image ? (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg border border-line">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-5 text-base leading-relaxed text-text">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-max mt-16 border-t border-line pt-12">
          <p className="label-eyebrow mb-6 text-xs text-accent">Related Articles</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
