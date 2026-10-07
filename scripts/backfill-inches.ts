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

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
  }

  const { db } = await import('../src/db/index')
  const { hairInches } = await import('../src/db/schema')
  const { buildDefaultInches, getInchRateCents } = await import('../src/lib/default-inches')
  const { eq } = await import('drizzle-orm')

  const products = await db.query.hairProducts.findMany({
    with: { category: true },
  })

  console.log(`Replacing inch rows for ${products.length} product(s)...\n`)

  for (const product of products) {
    const categoryName = product.category?.name ?? null
    const rows = buildDefaultInches(categoryName, product.origin, product.name)

    await db.delete(hairInches).where(eq(hairInches.productId, product.id))
    await db.insert(hairInches).values(
      rows.map((i) => ({
        productId: product.id,
        inches: i.value,
        additionalPrice: i.extra,
      }))
    )

    const rate = getInchRateCents(categoryName, product.origin, product.name) / 100
    const at14 = product.price + rows[0].extra
    const at30 = product.price + rows[rows.length - 1].extra
    console.log(
      `  #${product.id} "${product.name}" [${categoryName ?? 'no category'} / ${product.origin ?? 'no origin'}] ` +
        `-> $${rate.toFixed(2)}/step, 24" = $${(product.price / 100).toFixed(2)} (base), 14" = $${(at14 / 100).toFixed(2)}, 30" = $${(at30 / 100).toFixed(2)}`
    )
  }

  console.log('\nDone.')
  process.exit(0)
}

main().catch((error) => {
  console.error('Backfill failed:', error)
  process.exit(1)
})
