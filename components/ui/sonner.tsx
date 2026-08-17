"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="light"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "rounded-card border border-line bg-white text-ink shadow-card-hover",
          title: "font-semibold text-primary",
          description: "text-ink-muted",
          success: "border-l-4 border-l-success",
          error: "border-l-4 border-l-error"
        }
      }}
    />
  );
}
