import type { MetadataRoute } from "next";
import { getArticles, getCategories, getReports } from "@/lib/api";
import { SITE_URL } from "@/lib/jsonld";

const STATIC_ROUTES = [
  "",
  "/articles",
  "/reports",
  "/tools",
  "/about",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  try {
    const [articlesRes, reportsRes, categories] = await Promise.all([
      getArticles({ limit: 200 }),
      getReports({ limit: 200 }),
      getCategories(),
    ]);

    const articleEntries: MetadataRoute.Sitemap = (articlesRes?.data ?? []).map(
      (article) => ({
        url: `${SITE_URL}/articles/${article.slug}`,
        lastModified: new Date(article.updated_at),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    );

    const reportEntries: MetadataRoute.Sitemap = (reportsRes?.data ?? []).map(
      (report) => ({
        url: `${SITE_URL}/reports/${report.slug}`,
        lastModified: new Date(report.created_at),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    );

    const categoryEntries: MetadataRoute.Sitemap = (categories ?? []).map(
      (category) => ({
        url: `${SITE_URL}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    );

    return [...staticEntries, ...articleEntries, ...reportEntries, ...categoryEntries];
  } catch {
    return staticEntries;
  }
}
