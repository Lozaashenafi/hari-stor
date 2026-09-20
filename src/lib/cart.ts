import type { Product } from '@/lib/types'

export interface CartItem {
  key: string
  productId: number
  name: string
  imageUrl: string | null
  color: string | null
  inches: string | null
  unitPriceCents: number
  qty: number
}

export function makeCartKey(productId: number, color: string | null, inches: string | null) {
  return `${productId}|${color ?? ''}|${inches ?? ''}`
}

export function priceForSelection(product: Product, inchesValue: string | null): number {
  const found = (product.inches || []).find((i) => i.inches.toString() === inchesValue)
  return product.price + (found?.additionalPrice || 0)
}

export function formatPriceCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

/** Builds a wa.me URL with a properly URL-encoded message. */
export function buildWhatsAppUrl(whatsappDigits: string, message: string): string {
  const base = `https://wa.me/${whatsappDigits.replace(/\D/g, '')}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function buildCartWhatsAppLink(items: CartItem[], whatsappDigits: string): string {
  if (items.length === 0) return buildWhatsAppUrl(whatsappDigits, '')
  const lines = items.map((item, idx) => {
    const variant = [item.color, item.inches ? `${item.inches}"` : null].filter(Boolean).join(' / ')
    const lineTotal = formatPriceCents(item.unitPriceCents * item.qty)
    return `${idx + 1}. ${item.name}${variant ? ` (${variant})` : ''} x${item.qty} — ${lineTotal}`
  })
  const total = formatPriceCents(items.reduce((sum, i) => sum + i.unitPriceCents * i.qty, 0))
  const text =
    `Hi ShallyLuxe! ✨\n\nI would like to order:\n\n${lines.join('\n')}\n\nTotal: ${total}\n\nMy name:\nDelivery details:\n\nPlease confirm availability. Thank you!`
  return buildWhatsAppUrl(whatsappDigits, text)
}
