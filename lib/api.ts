import type { Article, Category, Paginated, Report } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://apicodez.monmoto.com";
const REVALIDATE_SECONDS = 300;

/**
 * Returns parsed JSON on success, or null on any failure (network error,
 * non-2xx, bad JSON). Callers distinguish a null result (error → retry state)
 * from an empty-but-valid payload (→ empty state). There is no mock data.
 */
async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export type ArticleListParams = {
  page?: number;
  limit?: number;
  category?: string;
};

export async function getArticles(
  params: ArticleListParams = {}
): Promise<Paginated<Article> | null> {
  const { page = 1, limit = 6, category } = params;
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(category ? { category } : {}),
  });
  return apiFetch<Paginated<Article>>(`/articles?${qs.toString()}`);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return apiFetch<Article>(`/articles/${slug}`);
}

export type ReportListParams = {
  page?: number;
  limit?: number;
  type?: string;
  severity?: string;
};

export async function getReports(
  params: ReportListParams = {}
): Promise<Paginated<Report> | null> {
  const { page = 1, limit = 6, type, severity } = params;
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(type ? { type } : {}),
    ...(severity ? { severity } : {}),
  });
  return apiFetch<Paginated<Report>>(`/reports?${qs.toString()}`);
}

export async function getReportBySlug(slug: string): Promise<Report | null> {
  return apiFetch<Report>(`/reports/${slug}`);
}

export async function getCategories(): Promise<Category[] | null> {
  return apiFetch<Category[]>("/categories");
}
