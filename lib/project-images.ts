import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { list } from "@vercel/blob";
import { UPLOAD_DIR, usingBlobStorage } from "@/lib/branding";

/**
 * Per-project photos uploaded by the admin. Stored in Vercel Blob keyed by
 * project id (no database column needed), with a local JSON + public/uploads
 * fallback for development. Blob pathname format: project/<id>-<timestamp>.<ext>
 */
export const PROJECT_BLOB_PREFIX = "project/";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "project-images.json");

let cached: { value: Record<string, string>; at: number } | null = null;
const CACHE_MS = 10_000;

export function bustProjectImagesCache() {
  cached = null;
}

function parseProjectId(pathname: string) {
  // "project/<id>-<timestamp>.<ext>" — the id may itself contain dashes,
  // so split on the LAST dash.
  const rest = pathname.slice(PROJECT_BLOB_PREFIX.length);
  const lastDash = rest.lastIndexOf("-");
  return lastDash > 0 ? rest.slice(0, lastDash) : null;
}

async function getBlobProjectImages(): Promise<Record<string, string>> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.value;
  try {
    const { blobs } = await list({ prefix: PROJECT_BLOB_PREFIX });
    const sorted = [...blobs].sort(
      (a, b) =>
        new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
    );
    const value: Record<string, string> = {};
    for (const blob of sorted) {
      const id = parseProjectId(blob.pathname);
      if (id) value[id] = blob.url; // later uploads overwrite earlier ones
    }
    cached = { value, at: Date.now() };
    return value;
  } catch {
    return cached?.value ?? {};
  }
}

function getLocalProjectImages(): Record<string, string> {
  try {
    if (!existsSync(DATA_PATH)) return {};
    return JSON.parse(readFileSync(DATA_PATH, "utf8")) as Record<string, string>;
  } catch {
    return {};
  }
}

export async function getProjectImages(): Promise<Record<string, string>> {
  if (usingBlobStorage()) return getBlobProjectImages();
  return getLocalProjectImages();
}

export function saveLocalProjectImages(next: Record<string, string>) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_PATH, JSON.stringify(next, null, 2), "utf8");
}

export function localProjectImagePath(filename: string) {
  return path.join(UPLOAD_DIR, filename);
}
