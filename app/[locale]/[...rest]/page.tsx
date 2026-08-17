import { notFound } from "next/navigation";

/**
 * Any unmatched path inside the locale tree renders the localised 404 rather
 * than the unlocalised global one.
 */
export default function CatchAllPage() {
  notFound();
}
