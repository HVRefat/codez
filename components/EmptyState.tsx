import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

const DefaultIcon = (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="panel flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-text-dim">
        {icon ?? DefaultIcon}
      </span>
      <p className="font-display text-lg font-bold text-text">{title}</p>
      {description && <p className="max-w-sm text-sm leading-relaxed text-text-dim">{description}</p>}
    </div>
  );
}
