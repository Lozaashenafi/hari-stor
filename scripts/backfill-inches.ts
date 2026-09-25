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
  const { buildDefaultInches } = await import('../src/lib/default-inches')
  const { eq } = await import('drizzle-orm')

  const products = await db.query.hairProducts.findMany({
    with: { category: true },
  })

  console.log(`Backfilling default inches for ${products.length} product(s)...\n`)

  for (const product of products) {
    const rows = buildDefaultInches(product.category?.name ?? null, product.origin)

    await db.delete(hairInches).where(eq(hairInches.productId, product.id))
    await db.insert(hairInches).values(
      rows.map((i) => ({
        productId: product.id,
        inches: i.value,
        additionalPrice: i.extra,
      }))
    )

    const rate = rows[1] ? rows[1].extra / 100 / 2 : 0
    console.log(
      `  #${product.id} "${product.name}" [${product.category?.name ?? 'no category'} / ${product.origin ?? 'no origin'}] ` +
        `-> ${rows.length} rows (14" = $${(product.price / 100).toFixed(2)}, 30" = $${((product.price + rows[rows.length - 1].extra) / 100).toFixed(2)}, step $${rate.toFixed(2)}/in)`
    )
  }

  console.log('\nDone.')
  process.exit(0)
}

main().catch((error) => {
  console.error('Backfill failed:', error)
  process.exit(1)
})
