import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-gold/20 text-gold",
        success: "bg-emerald-500/20 text-emerald-300",
        warning: "bg-yellow-400/20 text-yellow-200",
        orange: "bg-orange-500/20 text-orange-300",
        danger: "bg-red-500/20 text-red-300",
        muted: "bg-white/10 text-white/70"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
