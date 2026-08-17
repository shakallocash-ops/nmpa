"use server";

import { unlink } from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import {
  UPLOAD_DIR,
  ensureUploadDir,
  getBranding,
  saveBranding
} from "@/lib/branding";
import { contentWriteRoles } from "@/lib/roles";

const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg"
};

const MAX_BYTES = 4 * 1024 * 1024;

export type BrandingResult =
  | { success: true; logoUrl: string | null }
  | { success: false; error: string };

function publicUrl(filename: string) {
  return `/uploads/${filename}?v=${Date.now()}`;
}

async function removeOldLogo(logoUrl: string | null) {
  if (!logoUrl) return;
  const file = logoUrl.split("?")[0]?.replace("/uploads/", "");
  if (!file || file.includes("..") || file.includes("/") || file.includes("\\")) {
    return;
  }
  try {
    await unlink(path.join(UPLOAD_DIR, file));
  } catch {
    // File may already be gone.
  }
}

export async function uploadSiteLogo(formData: FormData): Promise<BrandingResult> {
  await requireSession(contentWriteRoles);

  const file = formData.get("logo");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Choose a logo image to upload." };
  }
  if (file.size > MAX_BYTES) {
    return { success: false, error: "Logo must be 4 MB or smaller." };
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return {
      success: false,
      error: "Use a PNG, JPG, WebP or SVG image."
    };
  }

  ensureUploadDir();
  const previous = getBranding();
  const filename = `logo.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  if (previous.logoUrl && !previous.logoUrl.startsWith(`/uploads/${filename}`)) {
    await removeOldLogo(previous.logoUrl);
  }

  const logoUrl = publicUrl(filename);
  saveBranding({ logoUrl, updatedAt: new Date().toISOString() });
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  revalidatePath("/admin/content/branding");
  return { success: true, logoUrl };
}

export async function removeSiteLogo(): Promise<BrandingResult> {
  await requireSession(contentWriteRoles);
  const previous = getBranding();
  await removeOldLogo(previous.logoUrl);
  saveBranding({ logoUrl: null, updatedAt: new Date().toISOString() });
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  revalidatePath("/admin/content/branding");
  return { success: true, logoUrl: null };
}
