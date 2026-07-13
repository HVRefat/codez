"use client";

import { useRouter } from "next/navigation";

export default function RetryState({ message }: { message?: string }) {
  const router = useRouter();

  return (
    <div className="panel flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-text-dim">
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
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" />
        </svg>
      </span>
      <div>
        <p className="font-display text-lg font-bold text-text">
          {message ?? "Couldn't load this content"}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-text-dim">
          Please check your connection and try again.
        </p>
      </div>
      <button type="button" onClick={() => router.refresh()} className="btn-secondary">
        Try again
      </button>
    </div>
  );
}
