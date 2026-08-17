"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeSiteLogo, uploadSiteLogo } from "@/actions/branding";
import { MinistryMark } from "@/components/public/MinistryMark";
import { Button } from "@/components/ui/button";

export function BrandingForm({ logoUrl }: { logoUrl: string | null }) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onUpload(formData: FormData) {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await uploadSiteLogo(formData);
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setPreview(null);
    setMessage("Logo saved. It now appears on the public website header and footer.");
    router.refresh();
  }

  async function onRemove() {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await removeSiteLogo();
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setPreview(null);
    setMessage("Custom logo removed. The default ministry mark is showing again.");
    router.refresh();
  }

  return (
    <div className="space-y-6 rounded-card border border-gold/20 bg-[#12293F] p-6">
      <div>
        <p className="text-sm font-semibold text-white">Current logo</p>
        <div className="mt-3 flex h-28 w-28 items-center justify-center rounded-card border border-white/10 bg-white p-2">
          <MinistryMark
            src={preview ?? logoUrl}
            className="h-full w-full"
          />
        </div>
      </div>

      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          await onUpload(new FormData(event.currentTarget));
        }}
      >
        <label className="block text-sm text-white/80">
          Upload a new logo (PNG, JPG, WebP or SVG, max 4 MB)
          <input
            type="file"
            name="logo"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
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
            {busy ? "Saving…" : "Save logo"}
          </Button>
          {logoUrl ? (
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={onRemove}
            >
              Remove logo
            </Button>
          ) : null}
        </div>
      </form>

      {error ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-md border border-secondary/40 bg-secondary/10 px-3 py-2 text-sm text-white/85">
          {message}
        </p>
      ) : null}
    </div>
  );
}
