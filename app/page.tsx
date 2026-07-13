import dynamic from "next/dynamic";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import ReportCard from "@/components/ReportCard";
import CategoryFilter from "@/components/CategoryFilter";
import Reveal from "@/components/Reveal";
import { getArticles, getCategories, getReports } from "@/lib/api";

const TrustStrip = dynamic(() => import("@/components/TrustStrip"));
const TopicsBand = dynamic(() => import("@/components/TopicsBand"));
const ReportTipCTA = dynamic(() => import("@/components/ReportTipCTA"));
const NewsletterSection = dynamic(() => import("@/components/NewsletterSection"));

export default async function Home() {
  const [{ data: reports }, { data: articles }, categories] = await Promise.all([
    getReports({ page: 1, limit: 3 }),
    getArticles({ page: 1, limit: 6 }),
    getCategories(),
  ]);

  return (
    <>
      <HeroSection />

      <TrustStrip />

      <section className="container-max px-4 py-16 sm:px-6">
        <Reveal className="mb-6 flex items-end justify-between">
          <div>
            <p className="label-eyebrow mb-2 text-xs text-accent">Threat Reports</p>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
              Latest threat reports
            </h2>
          </div>
          <Link
            href="/reports"
            className="hidden text-sm font-semibold text-brand transition-colors hover:text-brand-strong sm:block"
          >
            View all &rarr;
          </Link>
        </Reveal>

        {reports.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, i) => (
              <Reveal key={report.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <ReportCard report={report} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="panel p-8 text-center">
            <p className="text-sm text-text-dim">No active reports — check back soon.</p>
          </div>
        )}

        <Link
          href="/reports"
          className="mt-6 block text-sm font-semibold text-brand transition-colors hover:text-brand-strong sm:hidden"
        >
          View all &rarr;
        </Link>
      </section>

      <section className="border-t border-line bg-surface-2">
        <div className="container-max px-4 py-16 sm:px-6">
          <Reveal className="mb-6 flex items-end justify-between">
            <div>
              <p className="label-eyebrow mb-2 text-xs text-accent">From the Blog</p>
              <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
                Latest articles
              </h2>
            </div>
            <Link
              href="/articles"
              className="hidden text-sm font-semibold text-brand transition-colors hover:text-brand-strong sm:block"
            >
              View all &rarr;
            </Link>
          </Reveal>

          {categories.length > 0 && (
            <Reveal className="mb-8">
              <CategoryFilter categories={categories} basePath="/articles" />
            </Reveal>
          )}

          {articles.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <Reveal key={article.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="panel p-8 text-center">
              <p className="text-sm text-text-dim">No articles published yet.</p>
            </div>
          )}

          <Link
            href="/articles"
            className="mt-6 block text-sm font-semibold text-brand transition-colors hover:text-brand-strong sm:hidden"
          >
            View all &rarr;
          </Link>
        </div>
      </section>

      <TopicsBand categories={categories} />
      <ReportTipCTA />
      <NewsletterSection />
    </>
  );
}
