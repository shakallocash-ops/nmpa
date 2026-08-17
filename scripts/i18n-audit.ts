import { defaultLocale, locales, type Locale } from "../i18n/config";
import { loadMessages } from "../messages";
import en from "../messages/en";

type Leaf = { path: string; value: unknown };

function walk(value: unknown, prefix = ""): Leaf[] {
  if (typeof value === "string" || typeof value === "number") {
    return [{ path: prefix, value }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      walk(item, prefix ? `${prefix}.${index}` : String(index))
    );
  }
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(
      ([key, child]) => walk(child, prefix ? `${prefix}.${key}` : key)
    );
  }
  return [];
}

function englishLeaves() {
  return walk(en);
}

async function missingFor(locale: Locale) {
  const { default: raw } = await import(`../messages/${locale}`);
  const translated = new Set(walk(raw).map((leaf) => leaf.path));
  return englishLeaves()
    .map((leaf) => leaf.path)
    .filter((path) => !translated.has(path));
}

async function main() {
  const target = (process.argv[2] as Locale | undefined) ?? undefined;
  const list = target ? [target] : locales.filter((code) => code !== defaultLocale);

  for (const locale of list) {
    const missing = await missingFor(locale);
    const total = englishLeaves().length;
    console.log(
      `\n${locale}: ${total - missing.length}/${total} keys (${missing.length} falling back to English)`
    );
    if (missing.length && missing.length <= 80) {
      for (const path of missing) console.log(`  - ${path}`);
    } else if (missing.length) {
      for (const path of missing.slice(0, 40)) console.log(`  - ${path}`);
      console.log(`  … ${missing.length - 40} more`);
    }
    await loadMessages(locale);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
