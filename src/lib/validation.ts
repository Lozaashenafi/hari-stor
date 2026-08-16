import { z } from 'zod'

const optionalText = z.string().trim().max(500).nullish()
const url = z.string().trim().url().max(1000)

const imageUrl = url.max(2000)

export const productSchema = z.object({
  name: z.string().trim().min(1, 'Product name is required').max(200),
  categoryId: z.number().int().positive().nullable(),
  texture: optionalText,
  hairType: optionalText,
  origin: optionalText,
  processing: optionalText,
  options: optionalText,
  price: z.number().int().nonnegative().max(100_000_000),
  isOnSale: z.boolean().default(false),
  availability: z.enum(['in_hand', 'order']).default('in_hand'),
  quantityInHand: z.number().int().nonnegative().max(1_000_000).default(0),
  images: z.array(imageUrl).max(12).default([]),
  colors: z.array(z.string().trim().min(1).max(100)).max(20).default([]),
  inches: z
    .array(
      z.object({
        value: z.coerce.number().int().positive().max(200),
        extra: z.coerce.number().int().nonnegative().max(100_000_000),
      })
    )
    .max(30)
    .default([]),
})

export const companyProfileSchema = z.object({
  name: optionalText,
  phone: optionalText,
  whatsapp: optionalText,
  instagram: optionalText,
  tiktok: optionalText,
  location: optionalText,
  contactInfo: optionalText,
})

export const gallerySchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  imageUrl: url,
})

export type ProductInput = z.input<typeof productSchema>
export type CompanyInput = z.input<typeof companyProfileSchema>
export type GalleryInput = z.input<typeof gallerySchema>
