import type { Metadata } from "next";
import Link from "next/link";
import ReportCard from "@/components/ReportCard";
import Pagination from "@/components/Pagination";
import { getReports } from "@/lib/api";

const LIMIT = 9;

const REPORT_TYPES = [
  { value: "cybercrime", label: "Cybercrime" },
  { value: "fraud", label: "Fraud" },
  { value: "breach", label: "Breach" },
  { value: "scam-alert", label: "Scam Alert" },
];

const SEVERITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

type ReportsPageProps = {
  searchParams: Promise<{ page?: string; type?: string; severity?: string }>;
};

export async function generateMetadata({
  searchParams,
}: ReportsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  return {
    title: "Threat Reports",
    description:
      "Crime and cyber threat reports covering cybercrime, fraud, breaches, and scam alerts.",
    alternates: { canonical: "/reports" },
    ...(page > 1 ? { robots: { index: false, follow: true } } : {}),
  };
}

function FilterRow({
  basePath,
  options,
  active,
  paramName,
  otherParams,
}: {
  basePath: string;
  options: { value: string; label: string }[];
  active?: string;
  paramName: string;
  otherParams?: Record<string, string | undefined>;
}) {
  const buildHref = (value?: string) => {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(otherParams ?? {})) {
      if (val) params.set(key, val);
    }
    if (value) params.set(paramName, value);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref(undefined)}
        prefetch={false}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          !active
            ? "border-brand bg-brand/10 text-brand"
            : "border-line text-text-dim hover:border-brand hover:text-brand"
        }`}
      >
        All
      </Link>
      {options.map((option) => (
        <Link
          key={option.value}
          href={buildHref(option.value)}
          prefetch={false}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === option.value
              ? "border-brand bg-brand/10 text-brand"
              : "border-line text-text-dim hover:border-brand hover:text-brand"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const type = params.type;
  const severity = params.severity;

  const { data: reports, total_pages } = await getReports({
    page,
    limit: LIMIT,
    type,
    severity,
  });

  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <header className="mb-8">
        <p className="label-eyebrow mb-2 text-xs text-accent">Reports</p>
        <h1 className="font-display text-3xl font-extrabold text-text sm:text-4xl">
          Threat Reports
        </h1>
      </header>

      <div className="mb-6 flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold text-text-dim">Type</p>
          <FilterRow
            basePath="/reports"
            options={REPORT_TYPES}
            active={type}
            paramName="type"
            otherParams={{ severity }}
          />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-text-dim">Severity</p>
          <FilterRow
            basePath="/reports"
            options={SEVERITIES}
            active={severity}
            paramName="severity"
            otherParams={{ type }}
          />
        </div>
      </div>

      {reports.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="panel p-10 text-center">
          <p className="text-sm text-text-dim">No reports found for this filter.</p>
        </div>
      )}

      <div className="mt-10">
        <Pagination
          basePath="/reports"
          currentPage={page}
          totalPages={total_pages}
          searchParams={{ type, severity }}
        />
      </div>
    </div>
  );
}
