import Link from "next/link";
import type { Report } from "@/lib/types";
import { formatDate } from "@/lib/format";
import SeverityBadge from "./SeverityBadge";

export default function ReportCard({ report }: { report: Report }) {
  return (
    <article className="panel panel-hover flex flex-col p-5">
      <Link href={`/reports/${report.slug}`} prefetch={false} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="label-eyebrow rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-text-dim">
            {report.report_type.replace(/-/g, " ")}
          </span>
          <SeverityBadge severity={report.severity} />
        </div>

        <h3 className="font-display text-lg font-bold leading-snug text-text">
          {report.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-text-dim">
          {report.summary}
        </p>

        <div className="mt-1 flex items-center justify-between">
          <time dateTime={report.created_at} className="text-xs text-text-dim">
            {formatDate(report.created_at)}
          </time>
          <span className="text-sm font-semibold text-brand">View report &rarr;</span>
        </div>
      </Link>
    </article>
  );
}
