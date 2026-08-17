import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  as = "h2",
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Title = as;
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow",
            light ? "text-accent" : "text-secondary"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Title
        className={cn(
          "mt-3 font-serif text-h2 font-bold",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
      </Title>
      <span className="accent-rule mt-4" />
      {description ? (
        <p
          className={cn(
            "mt-5 text-body-lg",
            light ? "text-white/75" : "text-ink-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function TextLink({
  href,
  children,
  light = false
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 text-small font-semibold transition-colors",
        light ? "text-accent hover:text-accent-light" : "text-secondary hover:text-primary"
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
