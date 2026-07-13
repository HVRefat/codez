import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReportCard from "@/components/ReportCard";
import SeverityBadge from "@/components/SeverityBadge";
import { getReportBySlug, getReports } from "@/lib/api";
import { formatDate, readingTime } from "@/lib/format";
import {
  breadcrumbJsonLd,
  FOUNDER_NAME,
  jsonLdHtml,
  reportJsonLd,
  SITE_URL,
} from "@/lib/jsonld";

type ReportPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ReportPageProps): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReportBySlug(slug);
  if (!report) return {};

  return {
    title: report.title,
    description: `${report.severity[0].toUpperCase()}${report.severity.slice(1)} severity ${report.report_type.replace(/-/g, " ")} report: ${report.summary}`.slice(
      0,
      155
    ),
    alternates: { canonical: `/reports/${report.slug}` },
    openGraph: {
      type: "article",
      title: report.title,
      description: report.summary.slice(0, 155),
      url: `/reports/${report.slug}`,
      images: ["/opengraph-image"],
      publishedTime: report.created_at,
      authors: [FOUNDER_NAME],
      section: report.report_type,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params;
  const report = await getReportBySlug(slug);

  if (!report) notFound();

  const { data: relatedAll } = await getReports({
    type: report.report_type,
    limit: 4,
  });
  const related = relatedAll.filter((r) => r.slug !== report.slug).slice(0, 3);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Reports", url: `${SITE_URL}/reports` },
    { name: report.title, url: `${SITE_URL}/reports/${report.slug}` },
  ]);

  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(reportJsonLd(report))}
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
        <Link href="/reports" className="hover:text-brand">
          Reports
        </Link>
      </nav>

      <article className="prose-max mx-auto">
        <div className="panel mb-8 p-5">
          <p className="label-eyebrow mb-4 text-xs text-accent">Threat Level</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="mb-1 text-xs font-semibold text-text-dim">Severity</p>
              <SeverityBadge severity={report.severity} />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-text-dim">Type</p>
              <p className="text-sm font-medium capitalize text-text">
                {report.report_type.replace(/-/g, " ")}
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-text-dim">Filed</p>
              <time dateTime={report.created_at} className="text-sm font-medium text-text">
                {formatDate(report.created_at)}
              </time>
            </div>
          </div>
        </div>

        <header className="mb-8">
          <h1 className="font-display text-3xl font-extrabold leading-tight text-text sm:text-4xl">
            {report.title}
          </h1>
          <p className="mt-3 text-sm text-text-dim">
            {readingTime(report.content)} min read
          </p>
        </header>

        <div className="flex flex-col gap-5 text-base leading-relaxed text-text">
          {report.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-max mt-16 border-t border-line pt-12">
          <p className="label-eyebrow mb-6 text-xs text-accent">Related Reports</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ReportCard key={item.id} report={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
