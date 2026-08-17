"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeBrandingImage, uploadBrandingImage } from "@/actions/branding";
import { MinistryMark } from "@/components/public/MinistryMark";
import { Button } from "@/components/ui/button";

type Slot = "logo" | "hero";

function ImageSlotCard({
  slot,
  title,
  hint,
  currentUrl,
  savedMessage,
  removedMessage
}: {
  slot: Slot;
  title: string;
  hint: string;
  currentUrl: string | null;
  savedMessage: string;
  removedMessage: string;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onUpload(formData: FormData) {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await uploadBrandingImage(slot, formData);
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setPreview(null);
    setMessage(savedMessage);
    router.refresh();
  }

  async function onRemove() {
    setBusy(true);
    setError(null);
    setMessage(null);
    const result = await removeBrandingImage(slot);
    setBusy(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setPreview(null);
    setMessage(removedMessage);
    router.refresh();
  }

  const shown = preview ?? currentUrl;

  return (
    <div className="space-y-6 rounded-card border border-gold/20 bg-[#12293F] p-6">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        {slot === "logo" ? (
          <div className="mt-3 flex h-28 w-28 items-center justify-center rounded-card border border-white/10 bg-white p-2">
            <MinistryMark src={shown} className="h-full w-full" />
          </div>
        ) : (
          <div className="mt-3 flex h-40 w-full max-w-md items-center justify-center overflow-hidden rounded-card border border-white/10 bg-primary">
            {shown ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shown}
                alt="Homepage hero preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="px-4 text-center text-sm text-white/50">
                No custom hero image — the default photo is showing.
              </p>
            )}
          </div>
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
          {hint}
          <input
            type="file"
            name="file"
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
            {busy ? "Saving…" : "Save image"}
          </Button>
          {currentUrl ? (
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={onRemove}
            >
              Remove
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

export function BrandingForm({
  logoUrl,
  heroUrl
}: {
  logoUrl: string | null;
  heroUrl: string | null;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ImageSlotCard
        slot="logo"
        title="Ministry logo"
        hint="Upload a new logo (PNG, JPG, WebP or SVG, max 4 MB)"
        currentUrl={logoUrl}
        savedMessage="Logo saved. It now appears on the public website header and footer."
        removedMessage="Custom logo removed. The default ministry mark is showing again."
      />
      <ImageSlotCard
        slot="hero"
        title="Homepage hero image"
        hint="Upload the homepage hero photo (PNG, JPG or WebP, max 8 MB)"
        currentUrl={heroUrl}
        savedMessage="Hero image saved. It now appears on the public homepage."
        removedMessage="Custom hero removed. The default photo is showing again."
      />
    </div>
  );
}
