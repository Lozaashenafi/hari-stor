import { del } from "@vercel/blob";

const BLOB_HOST = "public.blob.vercel-storage.com";

/** Safely deletes a stored file if it is a Vercel Blob URL (otherwise no-op). */
export async function deleteStoredFile(url?: string | null) {
  if (!url) return;
  if (!url.includes(BLOB_HOST)) return;
  try {
    await del(url);
  } catch (error) {
    console.error("Failed to delete blob file:", url, error);
  }
}