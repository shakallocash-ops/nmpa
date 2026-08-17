import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="max-w-md rounded-xl border border-gold/20 bg-[#12293F] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Access restricted
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">Unauthorized</h1>
        <p className="mt-3 text-sm text-white/60">
          Your account does not have permission to view this section of the
          ministry portal.
        </p>
        <Button asChild className="mt-6">
          <Link href="/admin/dashboard">Return to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
