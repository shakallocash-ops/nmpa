"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Status =
  | "PLANNING"
  | "ONGOING"
  | "COMPLETED"
  | "VIABLE"
  | "NON_VIABLE"
  | "NOT_ASSESSED"
  | "PENDING"
  | "IN_MEDIATION"
  | "RESOLVED"
  | "ESCALATED";

const styles: Record<Status, string> = {
  PLANNING: "border-info/30 bg-info/10 text-[#1F5C96]",
  ONGOING: "border-warning/30 bg-warning/10 text-[#A2521F]",
  COMPLETED: "border-success/30 bg-success/10 text-success",
  VIABLE: "border-success/30 bg-success/10 text-success",
  NON_VIABLE: "border-error/30 bg-error/10 text-error",
  NOT_ASSESSED: "border-line-strong bg-mist text-ink-muted",
  PENDING: "border-line-strong bg-mist text-ink-muted",
  IN_MEDIATION: "border-warning/30 bg-warning/10 text-[#A2521F]",
  RESOLVED: "border-success/30 bg-success/10 text-success",
  ESCALATED: "border-error/30 bg-error/10 text-error"
};

/** Prisma enum values mapped onto keys in the `status` namespace. */
const messageKeys: Record<Status, string> = {
  PLANNING: "planning",
  ONGOING: "ongoing",
  COMPLETED: "completed",
  VIABLE: "viable",
  NON_VIABLE: "nonViable",
  NOT_ASSESSED: "notAssessed",
  PENDING: "pending",
  IN_MEDIATION: "inMediation",
  RESOLVED: "resolved",
  ESCALATED: "escalated"
};

export function StatusBadge({
  status,
  className
}: {
  status: Status;
  className?: string;
}) {
  const t = useTranslations("status");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-caption font-semibold tracking-normal",
        styles[status],
        className
      )}
    >
      {t(messageKeys[status])}
    </span>
  );
}
