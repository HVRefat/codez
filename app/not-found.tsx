import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-max flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <div className="panel px-6 py-10 sm:px-10">
        <p className="label-eyebrow text-xs text-accent">404</p>
        <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
          Page not found — the trail goes cold here
        </h1>
        <p className="mt-4 text-sm text-text-dim">
          The page you&apos;re looking for may have moved or no longer exists.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Back to home
        </Link>
      </div>
    </div>
  );
}
