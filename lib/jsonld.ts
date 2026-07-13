import type { Article, Report } from "./types";

export function jsonLdHtml(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const SITE_URL = "https://codez.monmoto.com";
export const SITE_NAME = "Code Z";
export const FOUNDER_NAME = "Habibul Islam Refat";

// TODO: add real profile URLs once created, e.g. "https://www.facebook.com/codez...",
// then they'll automatically be included in the Organization JSON-LD below.
const SOCIAL_PROFILES: string[] = [];

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: ["CodeZ", "Code Z Bangladesh"],
    description:
      "Cyber security, technology and crime analysis publication from Bangladesh.",
    inLanguage: ["en", "bn"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "CodeZ",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    founder: { "@type": "Person", name: FOUNDER_NAME },
    parentOrganization: {
      "@type": "Organization",
      name: "Monmoto",
      url: "https://monmoto.com",
    },
    ...(SOCIAL_PROFILES.length > 0 ? { sameAs: SOCIAL_PROFILES } : {}),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: FOUNDER_NAME,
    url: `${SITE_URL}/about`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
}

export function aboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about/#page`,
    url: `${SITE_URL}/about`,
    name: "About Code Z",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image ?? undefined,
    datePublished: article.created_at,
    dateModified: article.updated_at,
    articleSection: article.category,
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
    author: { "@id": `${SITE_URL}/#founder` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function reportJsonLd(report: Report) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: report.title,
    description: `${report.severity[0].toUpperCase()}${report.severity.slice(1)} severity ${report.report_type.replace(/-/g, " ")} report: ${report.summary}`,
    about: report.report_type.replace(/-/g, " "),
    datePublished: report.created_at,
    articleSection: report.report_type,
    mainEntityOfPage: `${SITE_URL}/reports/${report.slug}`,
    author: { "@id": `${SITE_URL}/#founder` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
