"use server";

import { unlink, writeFile } from "fs/promises";
import path from "path";
import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import {
  BLOB_PREFIX,
  BRANDING_SLOTS,
  SLOT_FIELDS,
  UPLOAD_DIR,
  bustBrandingCache,
  ensureUploadDir,
  getBranding,
  saveLocalBranding,
  usingBlobStorage,
  type BrandingSlot
} from "@/lib/branding";
import { contentWriteRoles } from "@/lib/roles";

const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg"
};

const MAX_MB: Record<BrandingSlot, number> = {
  logo: 4,
  hero: 8,
  homeAbout: 8,
  projectDefault: 8
};

export type BrandingResult =
  | { success: true; url: string | null }
  | { success: false; error: string };

function isValidSlot(slot: string): slot is BrandingSlot {
  return (BRANDING_SLOTS as readonly string[]).includes(slot);
}

async function deleteOldBlobs(slot: BrandingSlot, keepUrl?: string) {
  try {
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}${slot}-` });
    const stale = blobs.filter((b) => b.url !== keepUrl).map((b) => b.url);
    if (stale.length > 0) await del(stale);
  } catch {
    // Old files are only garbage; never fail the upload over cleanup.
  }
}

async function removeLocalFile(url: string | null) {
  if (!url || !url.startsWith("/uploads/")) return;
  const file = url.split("?")[0]?.replace("/uploads/", "");
  if (!file || file.includes("..") || file.includes("/") || file.includes("\\")) {
    return;
  }
  try {
    await unlink(path.join(UPLOAD_DIR, file));
  } catch {
    // File may already be gone.
  }
}

function revalidatePublic() {
  bustBrandingCache();
  revalidatePath("/", "layout");
  revalidatePath("/admin/content");
  revalidatePath("/admin/content/branding");
}

export async function uploadBrandingImage(
  slot: string,
  formData: FormData
): Promise<BrandingResult> {
  await requireSession(contentWriteRoles);

  if (!isValidSlot(slot)) {
    return { success: false, error: "Unknown image slot." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Choose an image to upload." };
  }
  if (file.size > MAX_MB[slot] * 1024 * 1024) {
    return {
      success: false,
      error: `Image must be ${MAX_MB[slot]} MB or smaller.`
    };
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return { success: false, error: "Use a PNG, JPG, WebP or SVG image." };
  }

  try {
    if (usingBlobStorage()) {
      const blob = await put(
        `${BLOB_PREFIX}${slot}-${Date.now()}.${ext}`,
        file,
        { access: "public", contentType: file.type }
      );
      await deleteOldBlobs(slot, blob.url);
      revalidatePublic();
      return { success: true, url: blob.url };
    }

    ensureUploadDir();
    const previous = await getBranding();
    const filename = `${slot}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);

    const previousUrl = previous[SLOT_FIELDS[slot]];
    if (previousUrl && !previousUrl.startsWith(`/uploads/${filename}`)) {
      await removeLocalFile(previousUrl);
    }

    const url = `/uploads/${filename}?v=${Date.now()}`;
    saveLocalBranding({
      ...previous,
      [SLOT_FIELDS[slot]]: url,
      updatedAt: new Date().toISOString()
    });
    revalidatePublic();
    return { success: true, url };
  } catch (error) {
    console.error(`Branding upload failed (${slot}):`, error);
    return {
      success: false,
      error: usingBlobStorage()
        ? "Upload failed. Check that Blob storage is connected to this project on Vercel."
        : "Upload failed. Check that the server can write to public/uploads."
    };
  }
}

export async function removeBrandingImage(slot: string): Promise<BrandingResult> {
  await requireSession(contentWriteRoles);

  if (!isValidSlot(slot)) {
    return { success: false, error: "Unknown image slot." };
  }

  try {
    if (usingBlobStorage()) {
      await deleteOldBlobs(slot);
      revalidatePublic();
      return { success: true, url: null };
    }

    const previous = await getBranding();
    await removeLocalFile(previous[SLOT_FIELDS[slot]]);
    saveLocalBranding({
      ...previous,
      [SLOT_FIELDS[slot]]: null,
      updatedAt: new Date().toISOString()
    });
    revalidatePublic();
    return { success: true, url: null };
  } catch (error) {
    console.error(`Branding remove failed (${slot}):`, error);
    return { success: false, error: "Could not remove the image. Try again." };
  }
}
