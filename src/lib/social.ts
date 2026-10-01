/**
 * Builds a social profile URL from a value that may be either a full URL
 * (e.g. "https://www.instagram.com/shallyluxe?stkn=...") or a bare handle
 * (e.g. "@shallyluxe" or "shallyluxe").
 *
 - Full URLs are returned untouched (they may carry invite/ref tokens).
 - Handles get the platform prefix, with any leading "@" stripped.
 - Returns null for empty values so callers can fall back to "#".
 */
export function buildSocialUrl(
  value: string | null | undefined,
  platform: 'instagram' | 'tiktok'
): string | null {
  const v = (value ?? '').trim()
  if (!v) return null

  if (/^https?:\/\//i.test(v)) return v

  const handle = v.replace(/^@+/, '')
  if (!handle) return null

  return platform === 'instagram'
    ? `https://instagram.com/${handle}`
    : `https://tiktok.com/@${handle}`
}
