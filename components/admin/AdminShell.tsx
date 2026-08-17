"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import type { UserRole } from "@prisma/client";
import { Sidebar } from "@/components/admin/Sidebar";
import { LogoutButton } from "@/app/admin/logout-button";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AdminShell({
  user,
  children
}: {
  user: { name: string; email: string; role: UserRole };
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-navy">
      <aside className="hidden w-72 shrink-0 border-r border-gold/20 md:block">
        <Sidebar user={user} />
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <Sidebar user={user} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gold/20 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
            <p className="text-sm text-white/80">
              Signed in as{" "}
              <span className="font-semibold text-gold">{user.name}</span>
            </p>
          </div>
          <LogoutButton />
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
