export default function Loading() {
  return (
    <div className="container-max px-4 py-12 sm:px-6">
      <div className="skeleton mb-3 h-3 w-32 rounded" />
      <div className="skeleton mb-10 h-9 w-64 rounded" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="panel overflow-hidden">
            <div className="skeleton aspect-video w-full" />
            <div className="flex flex-col gap-3 p-5">
              <div className="skeleton h-3 w-24 rounded" />
              <div className="skeleton h-5 w-full rounded" />
              <div className="skeleton h-5 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
