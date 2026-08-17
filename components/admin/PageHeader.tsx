import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gold">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-white/60">{description}</p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-400">{message}</p>;
}
