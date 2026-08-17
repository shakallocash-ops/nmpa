"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeProjectImage, uploadProjectImage } from "@/actions/project-images";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export function ProjectPhotoDialog({
  projectId,
  projectTitle,
  currentUrl,
  open,
  onOpenChange
}: {
  projectId: string;
  projectTitle: string;
  currentUrl: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const shown = preview ?? currentUrl;

  async function onUpload(formData: FormData) {
    setBusy(true);
    const toastId = toast.loading("Saving photo...");
    const result = await uploadProjectImage(projectId, formData);
    setBusy(false);
    if (!result.success) {
      toast.error(result.error, { id: toastId });
      return;
    }
    toast.success("Photo saved. It now shows on the public website.", {
      id: toastId
    });
    setPreview(null);
    onOpenChange(false);
    router.refresh();
  }

  async function onRemove() {
    setBusy(true);
    const toastId = toast.loading("Removing photo...");
    const result = await removeProjectImage(projectId);
    setBusy(false);
    if (!result.success) {
      toast.error(result.error, { id: toastId });
      return;
    }
    toast.success("Photo removed. The default image is showing again.", {
      id: toastId
    });
    setPreview(null);
    onOpenChange(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project photo — {projectTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-card border border-white/10 bg-primary">
            {shown ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shown}
                alt={`${projectTitle} photo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="px-4 text-center text-sm text-white/50">
                No custom photo — the public site shows a default image for
                this project type.
              </p>
            )}
          </div>

          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              await onUpload(new FormData(event.currentTarget));
            }}
          >
            <label className="block text-sm text-white/80">
              Upload a photo (PNG, JPG or WebP, max 8 MB)
              <input
                type="file"
                name="file"
                accept="image/png,image/jpeg,image/webp"
                required
                className="mt-2 block w-full text-sm text-white/70 file:mr-3 file:rounded-btn file:border-0 file:bg-gold file:px-3 file:py-2 file:text-sm file:font-semibold file:text-navy"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={busy}>
                {busy ? "Saving…" : "Save photo"}
              </Button>
              {currentUrl ? (
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={onRemove}
                >
                  Remove photo
                </Button>
              ) : null}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
