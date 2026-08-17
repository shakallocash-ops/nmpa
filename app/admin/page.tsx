import { redirect } from "next/navigation";
import { getSession } from "@/actions/auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl border border-gold/20 bg-[#12293F] p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Admin access
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gold">Sign in</h1>
        <p className="mt-2 mb-6 text-sm text-white/60">
          Enter your official credentials to continue. Sign-in needs the Neon
          database to be Active at console.neon.tech.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
