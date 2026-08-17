import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { defaultLocale } from "@/i18n/config";
import { SITE_URL } from "@/lib/i18n/metadata";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0B1F33",
  width: "device-width",
  initialScale: 1
};

/**
 * Only site-wide defaults live here. Titles, descriptions, Open Graph data and
 * `hreflang` alternates are produced per locale in `app/[locale]`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Ministry of Nomadic and Pastoral Affairs — Niger State Government",
    template: "%s | Ministry of Nomadic and Pastoral Affairs"
  },
  description:
    "Official website of the Ministry of Nomadic and Pastoral Affairs, Niger State.",
  applicationName: "Ministry of Nomadic and Pastoral Affairs",
  authors: [{ name: "Niger State Government" }],
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // `/admin`, `/api` and `/unauthorized` sit outside the locale tree, so the
  // document element is declared here with the default locale and reconciled by
  // `LocaleDocument` once a localised page mounts.
  return (
    <html
      lang={defaultLocale}
      dir="ltr"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-paper font-sans text-body text-ink antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
