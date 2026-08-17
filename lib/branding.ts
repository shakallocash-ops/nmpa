import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { list } from "@vercel/blob";

export const BRANDING_SLOTS = [
  "logo",
  "hero",
  "homeAbout",
  "projectDefault"
] as const;

export type BrandingSlot = (typeof BRANDING_SLOTS)[number];

export type Branding = {
  logoUrl: string | null;
  heroUrl: string | null;
  homeAboutUrl: string | null;
  projectDefaultUrl: string | null;
  updatedAt: string | null;
};

export const SLOT_FIELDS = {
  logo: "logoUrl",
  hero: "heroUrl",
  homeAbout: "homeAboutUrl",
  projectDefault: "projectDefaultUrl"
} as const satisfies Record<BrandingSlot, keyof Branding>;

const empty: Branding = {
  logoUrl: null,
  heroUrl: null,
  homeAboutUrl: null,
  projectDefaultUrl: null,
  updatedAt: null
};

/**
 * On Vercel the filesystem is read-only, so uploads live in Vercel Blob
 * storage (requires BLOB_READ_WRITE_TOKEN). Locally we fall back to
 * public/uploads + data/branding.json so the CMS works without any cloud
 * setup.
 */
export function usingBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export const BLOB_PREFIX = "site/";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "branding.json");
export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Short-lived memory cache so public renders don't hit the Blob API on
// every request. Uploads reset it via bustBrandingCache().
let cached: { value: Branding; at: number } | null = null;
const CACHE_MS = 10_000;

export function bustBrandingCache() {
  cached = null;
}

async function getBlobBranding(): Promise<Branding> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.value;
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX });
    const newest = (slot: BrandingSlot) =>
      blobs
        .filter((b) => b.pathname.startsWith(`${BLOB_PREFIX}${slot}-`))
        .sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        )[0] ?? null;

    const value: Branding = { ...empty };
    let latest = 0;
    for (const slot of BRANDING_SLOTS) {
      const blob = newest(slot);
      value[SLOT_FIELDS[slot]] = blob?.url ?? null;
      if (blob) {
        latest = Math.max(latest, new Date(blob.uploadedAt).getTime());
      }
    }
    value.updatedAt = latest ? new Date(latest).toISOString() : null;

    cached = { value, at: Date.now() };
    return value;
  } catch {
    return cached?.value ?? empty;
  }
}

function getLocalBranding(): Branding {
  try {
    if (!existsSync(DATA_PATH)) return empty;
    const parsed = JSON.parse(readFileSync(DATA_PATH, "utf8")) as Partial<Branding>;
    return {
      logoUrl: parsed.logoUrl ?? null,
      heroUrl: parsed.heroUrl ?? null,
      homeAboutUrl: parsed.homeAboutUrl ?? null,
      projectDefaultUrl: parsed.projectDefaultUrl ?? null,
      updatedAt: parsed.updatedAt ?? null
    };
  } catch {
    return empty;
  }
}

export async function getBranding(): Promise<Branding> {
  if (usingBlobStorage()) return getBlobBranding();
  return getLocalBranding();
}

export function saveLocalBranding(next: Branding) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_PATH, JSON.stringify(next, null, 2), "utf8");
}

export function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
}
