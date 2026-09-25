export const DEFAULT_INCHES = [14, 16, 18, 20, 22, 24, 26, 28, 30] as const

export interface DefaultInch {
  value: number
  extra: number // cents added on top of the product base price
}

// Price step per single inch (in cents):
// - Wigs (category name contains "wig"): $20 / inch
// - Brazilian human hair: $10 / inch
// - All other origins (asian, chinese, malaysian, peruvian, blank): $7 / inch
export function getInchRateCents(
  categoryName?: string | null,
  origin?: string | null
): number {
  const category = (categoryName ?? '').toLowerCase()
  if (category.includes('wig')) return 2000

  const o = (origin ?? '').toLowerCase()
  if (o.includes('brazil')) return 1000

  return 700
}

// 14" = base price (extra 0), each following inch adds the rate once.
export function buildDefaultInches(
  categoryName?: string | null,
  origin?: string | null
): DefaultInch[] {
  const rate = getInchRateCents(categoryName, origin)
  return DEFAULT_INCHES.map((value) => ({
    value,
    extra: (value - 14) * rate,
  }))
}
