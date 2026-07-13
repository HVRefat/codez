"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/reports", label: "Reports" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line">
      <div className="container-max flex h-16 items-center justify-between bg-bg/85 px-4 backdrop-blur-sm sm:px-6">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
          Code <span className="text-brand">Z</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-dim transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text-dim transition-colors hover:text-brand"
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>

          <ThemeToggle />

          <Link href="/contact" className="btn-primary hidden text-sm md:inline-flex">
            Report a Tip
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text transition-colors hover:text-brand md:hidden"
          >
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        data-open={open}
        className="drawer-backdrop fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        data-open={open}
        className="drawer fixed inset-y-0 right-0 z-50 flex h-full w-[78%] max-w-xs flex-col border-l border-line bg-surface p-6 md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="label-eyebrow text-xs text-text-dim">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-text hover:text-brand"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center border-b border-line py-3 font-display text-lg font-semibold text-text transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-6 justify-center"
          >
            Report a Tip
          </Link>
        </nav>
      </div>
    </header>
  );
}
