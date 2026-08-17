"use server";

import { unlink, writeFile } from "fs/promises";
import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth";
import { ensureUploadDir, usingBlobStorage } from "@/lib/branding";
import {
  PROJECT_BLOB_PREFIX,
  bustProjectImagesCache,
  getProjectImages,
  localProjectImagePath,
  saveLocalProjectImages
} from "@/lib/project-images";
import { contentWriteRoles } from "@/lib/roles";

const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp"
};

const MAX_BYTES = 8 * 1024 * 1024;

export type ProjectImageResult =
  | { success: true; url: string | null }
  | { success: false; error: string };

function isValidProjectId(id: string) {
  return /^[a-zA-Z0-9_-]{1,64}$/.test(id);
}

async function deleteOldBlobs(projectId: string, keepUrl?: string) {
  try {
    const { blobs } = await list({
      prefix: `${PROJECT_BLOB_PREFIX}${projectId}-`
    });
    const stale = blobs.filter((b) => b.url !== keepUrl).map((b) => b.url);
    if (stale.length > 0) await del(stale);
  } catch {
    // Cleanup failures must never break the upload.
  }
}

async function removeLocalFile(url: string | undefined) {
  if (!url || !url.startsWith("/uploads/")) return;
  const file = url.split("?")[0]?.replace("/uploads/", "");
  if (!file || file.includes("..") || file.includes("/") || file.includes("\\")) {
    return;
  }
  try {
    await unlink(localProjectImagePath(file));
  } catch {
    // File may already be gone.
  }
}

function revalidatePublic() {
  bustProjectImagesCache();
  revalidatePath("/", "layout");
  revalidatePath("/admin/projects");
}

export async function uploadProjectImage(
  projectId: string,
  formData: FormData
): Promise<ProjectImageResult> {
  await requireSession(contentWriteRoles);

  if (!isValidProjectId(projectId)) {
    return { success: false, error: "Invalid project reference." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Choose an image to upload." };
  }
  if (file.size > MAX_BYTES) {
    return { success: false, error: "Image must be 8 MB or smaller." };
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return { success: false, error: "Use a PNG, JPG or WebP image." };
  }

  try {
    if (usingBlobStorage()) {
      const blob = await put(
        `${PROJECT_BLOB_PREFIX}${projectId}-${Date.now()}.${ext}`,
        file,
        { access: "public", contentType: file.type }
      );
      await deleteOldBlobs(projectId, blob.url);
      revalidatePublic();
      return { success: true, url: blob.url };
    }

    ensureUploadDir();
    const images = await getProjectImages();
    await removeLocalFile(images[projectId]);

    const filename = `project-${projectId}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(localProjectImagePath(filename), buffer);

    const url = `/uploads/${filename}?v=${Date.now()}`;
    saveLocalProjectImages({ ...images, [projectId]: url });
    revalidatePublic();
    return { success: true, url };
  } catch (error) {
    console.error(`Project image upload failed (${projectId}):`, error);
    return {
      success: false,
      error: usingBlobStorage()
        ? "Upload failed. Check that Blob storage is connected to this project on Vercel."
        : "Upload failed. Check that the server can write to public/uploads."
    };
  }
}

export async function removeProjectImage(
  projectId: string
): Promise<ProjectImageResult> {
  await requireSession(contentWriteRoles);

  if (!isValidProjectId(projectId)) {
    return { success: false, error: "Invalid project reference." };
  }

  try {
    if (usingBlobStorage()) {
      await deleteOldBlobs(projectId);
      revalidatePublic();
      return { success: true, url: null };
    }

    const images = await getProjectImages();
    await removeLocalFile(images[projectId]);
    const next = { ...images };
    delete next[projectId];
    saveLocalProjectImages(next);
    revalidatePublic();
    return { success: true, url: null };
  } catch (error) {
    console.error(`Project image remove failed (${projectId}):`, error);
    return { success: false, error: "Could not remove the image. Try again." };
  }
}
