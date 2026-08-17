import { getRequestConfig } from "next-intl/server";
import { defaultLocale, formatLocaleFor, isLocale } from "./config";
import { loadMessages } from "@/messages";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
    timeZone: "Africa/Lagos",
    formats: {
      dateTime: {
        short: { day: "2-digit", month: "short", year: "numeric" }
      },
      number: {
        naira: {
          style: "currency",
          currency: "NGN",
          maximumFractionDigits: 0
        }
      }
    },
    // A missing key is a content gap, not a crash: fall back silently in
    // production and surface it loudly in development.
    onError(error) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n:${locale}] ${error.message}`);
      }
    },
    getMessageFallback({ key, namespace }) {
      return namespace ? `${namespace}.${key}` : key;
    },
    // Kept so `Intl` calls made through next-intl agree with our own helpers.
    now: new Date()
  };
});

export { formatLocaleFor };
