"use client";

export default function AdminError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const unreachable =
    error.message.includes("Can't reach database") ||
    error.message.includes("Timed out fetching a new connection");

  return (
    <div className="mx-auto max-w-xl space-y-4 rounded-card border border-gold/20 bg-[#12293F] p-6">
      <h1 className="text-xl font-bold text-gold">
        {unreachable ? "Database is offline" : "Something went wrong"}
      </h1>
      <p className="text-sm text-white/75">
        {unreachable
          ? "Neon cannot be reached. You can still upload the ministry logo without the database."
          : error.message}
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="/admin/content/branding"
          className="inline-flex h-11 items-center rounded-btn bg-accent px-5 text-small font-semibold text-primary-dark"
        >
          Upload logo
        </a>
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center rounded-btn border border-white/40 px-5 text-small font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
