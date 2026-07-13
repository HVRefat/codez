"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import ArticleCard from "@/components/ArticleCard";
import ReportCard from "@/components/ReportCard";
import { getArticles, getReports } from "@/lib/api";
import type { Article, Report } from "@/lib/types";

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  async function runSearch(term: string) {
    const trimmed = term.trim();
    if (!trimmed) {
      setStatus("idle");
      setArticles([]);
      setReports([]);
      return;
    }

    setStatus("loading");
    try {
      const [articleResult, reportResult] = await Promise.all([
        getArticles({ limit: 50 }),
        getReports({ limit: 50 }),
      ]);

      const needle = trimmed.toLowerCase();
      setArticles(
        articleResult.data.filter(
          (a) =>
            a.title.toLowerCase().includes(needle) ||
            a.excerpt.toLowerCase().includes(needle)
        )
      );
      setReports(
        reportResult.data.filter(
          (r) =>
            r.title.toLowerCase().includes(needle) ||
            r.summary.toLowerCase().includes(needle)
        )
      );
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    runSearch(query);
  }

  const hasResults = articles.length > 0 || reports.length > 0;

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-10 flex gap-2" role="search">
        <label htmlFor="search-query" className="sr-only">
          Search articles and reports
        </label>
        <input
          id="search-query"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles and reports…"
          className="min-h-11 flex-1 rounded-lg border border-line bg-surface px-4 text-sm text-text placeholder:text-text-dim focus:border-brand"
        />
        <button type="submit" className="btn-primary shrink-0 text-sm">
          Search
        </button>
      </form>

      {status === "loading" && (
        <p className="text-sm text-text-dim">Searching…</p>
      )}

      {status === "error" && (
        <p className="text-sm text-danger">Search unavailable — try again later.</p>
      )}

      {status === "done" && !hasResults && (
        <div className="panel p-10 text-center">
          <p className="text-sm text-text-dim">
            No results for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}

      {reports.length > 0 && (
        <section className="mb-10">
          <p className="label-eyebrow mb-4 text-xs text-accent">
            {`Reports (${reports.length})`}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section>
          <p className="label-eyebrow mb-4 text-xs text-accent">
            {`Articles (${articles.length})`}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {status === "idle" && (
        <p className="text-sm text-text-dim">
          Try{" "}
          <Link href="/articles" className="font-semibold text-brand hover:underline">
            browsing articles
          </Link>{" "}
          or{" "}
          <Link href="/reports" className="font-semibold text-brand hover:underline">
            threat reports
          </Link>{" "}
          instead.
        </p>
      )}
    </>
  );
}
