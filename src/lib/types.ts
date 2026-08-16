export interface Category {
  id: number
  name: string
}

export interface ProductImage {
  id: number
  productId: number
  imageUrl: string
}

export interface ProductColor {
  id: number
  productId: number
  color: string
}

export interface ProductInch {
  id: number
  productId: number
  inches: number
  additionalPrice: number
}

export interface Product {
  id: number
  name: string
  categoryId: number | null
  category: Category | null
  texture: string | null
  hairType: string | null
  origin: string | null
  processing: string | null
  options: string | null
  price: number
  previousPrice: number | null
  isOnSale: boolean
  availability: string
  quantityInHand: number | null
  images: ProductImage[]
  colors: ProductColor[]
  inches: ProductInch[]
}

export interface CompanyProfile {
  id?: number
  name?: string | null
  phone?: string | null
  whatsapp?: string | null
  instagram?: string | null
  tiktok?: string | null
  location?: string | null
  contactInfo?: string | null
}