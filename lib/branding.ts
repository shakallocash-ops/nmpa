import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export type Branding = {
  logoUrl: string | null;
  updatedAt: string | null;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "branding.json");
export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const empty: Branding = { logoUrl: null, updatedAt: null };

export function getBranding(): Branding {
  try {
    if (!existsSync(DATA_PATH)) return empty;
    const parsed = JSON.parse(readFileSync(DATA_PATH, "utf8")) as Branding;
    return {
      logoUrl: parsed.logoUrl ?? null,
      updatedAt: parsed.updatedAt ?? null
    };
  } catch {
    return empty;
  }
}

export function saveBranding(next: Branding) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
  writeFileSync(DATA_PATH, JSON.stringify(next, null, 2), "utf8");
}

export function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });
}
