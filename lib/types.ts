export type Article = {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

export type ReportType = "cybercrime" | "fraud" | "breach" | "scam-alert" | string;

export type Severity = "low" | "medium" | "high" | "critical";

export type Report = {
  id: number;
  title: string;
  slug: string;
  report_type: ReportType;
  summary: string;
  content: string;
  severity: Severity;
  status: "draft" | "published";
  created_at: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Paginated<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};
