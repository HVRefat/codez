import type { Article, Category, Paginated, Report } from "./types";
import {
  MOCK_ARTICLES,
  MOCK_CATEGORIES,
  MOCK_REPORTS,
  paginate,
} from "./mock";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://apicodez.monmoto.com";
const REVALIDATE_SECONDS = 300;

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
): Promise<Paginated<Article>> {
  const { page = 1, limit = 6, category } = params;
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(category ? { category } : {}),
  });
  const data = await apiFetch<Paginated<Article>>(`/articles?${qs.toString()}`);
  if (data) return data;

  const filtered = category
    ? MOCK_ARTICLES.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      )
    : MOCK_ARTICLES;
  return paginate(filtered, page, limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await apiFetch<Article>(`/articles/${slug}`);
  if (data) return data;
  return MOCK_ARTICLES.find((a) => a.slug === slug) ?? null;
}

export type ReportListParams = {
  page?: number;
  limit?: number;
  type?: string;
  severity?: string;
};

export async function getReports(
  params: ReportListParams = {}
): Promise<Paginated<Report>> {
  const { page = 1, limit = 6, type, severity } = params;
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(type ? { type } : {}),
    ...(severity ? { severity } : {}),
  });
  const data = await apiFetch<Paginated<Report>>(`/reports?${qs.toString()}`);
  if (data) return data;

  let filtered = MOCK_REPORTS;
  if (type) filtered = filtered.filter((r) => r.report_type === type);
  if (severity) filtered = filtered.filter((r) => r.severity === severity);
  return paginate(filtered, page, limit);
}

export async function getReportBySlug(slug: string): Promise<Report | null> {
  const data = await apiFetch<Report>(`/reports/${slug}`);
  if (data) return data;
  return MOCK_REPORTS.find((r) => r.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await apiFetch<Category[]>("/categories");
  if (data) return data;
  return MOCK_CATEGORIES;
}
