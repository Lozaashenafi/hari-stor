// One-off migration: re-anchor product base prices so the stored price
// becomes the 14" price instead of the 24" price.
//
// Context: the base `price` stored on ladder products (14"-30" rows in
// hair_inches) was actually intended as the 24" price. This script shifts
// each ladder product's base down by its 24" add-on:
//
//     price_new = price_old - additional_price(24")
//
// so that (price_new + extra(24")) === price_old  — the 24" total keeps its
// current value, while 14"–22" become progressively cheaper and 26"/30"
// increase. Non-ladder products (single inch row, e.g. the Brazilian wigs
// explicitly priced at 24") are left untouched: their base price IS their
// length price already.
//
// Usage:
//   npx tsx scripts/migrate-price-anchor.ts --dry-run   # preview only
//   npx tsx scripts/migrate-price-anchor.ts             # apply
//
// The script only UPDATEs hair_products.price for ladder products. It never
// inserts or deletes rows, so no duplicates can be created. Safe to re-run:
// the guard below detects already-migrated products and skips them.

import { readFileSync } from 'node:fs'
import path from 'node:path'

// Load .env before the db module reads process.env.DATABASE_URL
if (!process.env.DATABASE_URL) {
  try {
    const env = readFileSync(path.resolve(process.cwd(), '.env'), 'utf8')
    for (const line of env.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
      }
    }
  } catch {
    // ignore missing .env
  }
}

const DRY_RUN = process.argv.includes('--dry-run')
const ANCHOR_INCH = 24

// Left untouched by owner decision: their 14" price would compute to $0.00.
const SKIP_PRODUCT_IDS = new Set([73, 81])

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')

  const { db } = await import('../src/db/index')
  const { hairProducts, hairInches } = await import('../src/db/schema')
  const { eq } = await import('drizzle-orm')

  const products = await db.query.hairProducts.findMany({
    with: { inches: true },
  })

  console.log(
    `Scanning ${products.length} product(s) — anchor: ${ANCHOR_INCH}" keeps its current total${DRY_RUN ? ' (DRY RUN)' : ''}\n`
  )

  let migrated = 0
  let skippedNoAnchor = 0
  let skippedNotLadder = 0
  let skippedAlreadyDone = 0

  for (const p of products) {
    if (SKIP_PRODUCT_IDS.has(p.id)) {
      console.log(`  #${p.id} "${p.name}": on skip list — untouched`)
      skippedNotLadder++
      continue
    }

    const rows = p.inches

    // Only full ladders need re-anchoring (the original seed shape).
    if (rows.length < 2) {
      skippedNotLadder++
      continue
    }

    const anchor = rows.find((r) => r.inches === ANCHOR_INCH)
    if (!anchor) {
      skippedNoAnchor++
      console.log(`  #${p.id} "${p.name}": no ${ANCHOR_INCH}" row — skipped`)
      continue
    }

    const shift = anchor.additionalPrice
    if (shift === 0) {
      skippedAlreadyDone++
      continue // base price already IS the 14" price
    }

    const newPrice = p.price - shift
    if (newPrice < 0) {
      console.log(`  #${p.id} "${p.name}": would go negative (${p.price} - ${shift}) — skipped`)
      continue
    }

    const fmt = (c: number) => `$${(c / 100).toFixed(2)}`
    console.log(
      `  #${p.id} "${p.name}": base ${fmt(p.price)} -> ${fmt(newPrice)}  ` +
        `(14" ${fmt(newPrice)} · ${ANCHOR_INCH}" ${fmt(newPrice + shift)} = old base ${fmt(p.price)} · 30" ${fmt(newPrice + (rows[rows.length - 1]?.additionalPrice ?? 0))})`
    )

    if (!DRY_RUN) {
      await db.update(hairProducts).set({ price: newPrice }).where(eq(hairProducts.id, p.id))
    }
    migrated++
  }

  console.log(
    `\nDone. migrated=${migrated}, already-anchored=${skippedAlreadyDone}, no-${ANCHOR_INCH}"-row=${skippedNoAnchor}, not-ladder=${skippedNotLadder}${DRY_RUN ? ' — DRY RUN, nothing written' : ''}`
  )
  process.exit(0)
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exit(1)
})
