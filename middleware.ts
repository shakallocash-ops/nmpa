import type { UserRole } from "@prisma/client";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { routing } from "@/i18n/routing";

const leadershipRoles = new Set<UserRole>([
  "SUPER_ADMIN",
  "COMMISSIONER",
  "PERM_SECRETARY",
  "DIRECTOR"
]);

const intlMiddleware = createIntlMiddleware(routing);

/** Paths that are deliberately outside the locale tree. */
function isUnlocalised(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/unauthorized")
  );
}

function isLoginPath(pathname: string) {
  return pathname === "/admin" || pathname === "/admin/";
}

function isAllowed(pathname: string, role: UserRole) {
  if (pathname === "/admin/users" || pathname.startsWith("/admin/users/")) {
    return role === "SUPER_ADMIN";
  }

  if (pathname === "/admin/audit" || pathname.startsWith("/admin/audit/")) {
    return (
      role === "SUPER_ADMIN" ||
      role === "COMMISSIONER" ||
      role === "PERM_SECRETARY"
    );
  }

  if (leadershipRoles.has(role)) {
    return true;
  }

  if (role === "CONTENT_EDITOR") {
    return (
      pathname === "/admin/dashboard" ||
      pathname.startsWith("/admin/dashboard/") ||
      pathname === "/admin/schools" ||
      pathname.startsWith("/admin/schools/") ||
      pathname === "/admin/projects" ||
      pathname.startsWith("/admin/projects/") ||
      pathname === "/admin/content" ||
      pathname.startsWith("/admin/content/")
    );
  }

  if (role === "ENUMERATOR") {
    return (
      pathname === "/admin/dashboard" ||
      pathname.startsWith("/admin/dashboard/") ||
      pathname === "/admin/households" ||
      pathname.startsWith("/admin/households/")
    );
  }

  if (role === "VIEWER") {
    return (
      pathname === "/admin/dashboard" ||
      pathname.startsWith("/admin/dashboard/")
    );
  }

  return false;
}

function withSecurityHeaders(response: NextResponse) {
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  return response;
}

async function adminMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (isLoginPath(pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/admin", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    );
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  }

  if (!isAllowed(pathname, session.user.role)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return withSecurityHeaders(NextResponse.next());
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return adminMiddleware(request);
  }

  if (isUnlocalised(pathname)) {
    return withSecurityHeaders(NextResponse.next());
  }

  // Public pages: next-intl resolves the locale from the pathname, then the
  // NEXT_LOCALE cookie, then Accept-Language, and redirects when the prefix is
  // missing so that a bare `/projects` lands on `/en/projects`.
  return withSecurityHeaders(intlMiddleware(request));
}

export const config = {
  matcher: [
    // Everything except Next internals, the metadata files and anything with a
    // file extension (images, fonts, downloads).
    "/((?!_next/|_vercel/|favicon\\.ico|icon\\.svg|robots\\.txt|sitemap\\.xml|.*\\..*).*)"
  ]
};
