export const DEFAULT_INCHES = [14, 16, 18, 20, 22, 24, 26, 28, 30] as const

/** 24" is the base length — its extra is always $0 (the listed price IS the 24" price). */
export const BASE_INCHES = 24

export interface DefaultInch {
  value: number
  extra: number // cents relative to the 24" base price (negative below 24)
}

// Per-INCH price difference (in cents) by category × origin:
// - Wigs:      $21 / inch asian, $30 / inch brazilian
// - Clip-ins:  $14 / inch asian, $20 / inch brazilian
// - Bundles:    $7 / inch asian, $10 / inch brazilian
// - Ponytail:   $7 / inch asian, $10 / inch brazilian
// Origins other than brazilian (asian, pixie, blank) use the asian rate.
const RATES = {
  wig: { asian: 2100, brazilian: 3000 },
  clip: { asian: 1400, brazilian: 2000 },
  standard: { asian: 700, brazilian: 1000 }, // bundles + ponytail
} as const

function categoryKey(text?: string | null): 'wig' | 'clip' | 'standard' | null {
  const t = (text ?? '').toLowerCase()
  if (t.includes('wig')) return 'wig'
  if (t.includes('clip')) return 'clip'
  if (t.includes('pony') || t.includes('bundle')) return 'standard'
  return null
}

export function getInchRateCents(
  categoryName?: string | null,
  origin?: string | null,
  productName?: string | null
): number {
  const brazilian = (origin ?? '').toLowerCase().includes('brazil')
  const key = categoryKey(categoryName) ?? categoryKey(productName) ?? 'standard'
  const table = RATES[key]
  return brazilian ? table.brazilian : table.asian
}

// 24" = base price (extra 0). price(inches) = base + (inches − 24) × rate.
export function buildDefaultInches(
  categoryName?: string | null,
  origin?: string | null,
  productName?: string | null
): DefaultInch[] {
  const rate = getInchRateCents(categoryName, origin, productName)
  return DEFAULT_INCHES.map((value) => ({
    value,
    extra: (value - BASE_INCHES) * rate,
  }))
}
