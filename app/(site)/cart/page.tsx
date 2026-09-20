import { getCompanyProfile } from '@/services/company.service'
import CartView from './CartView'

export const metadata = {
  title: 'Your Bag — ShallyLuxe',
}

export default async function CartPage() {
  const company = await getCompanyProfile()
  const whatsapp = company?.whatsapp?.replace(/\D/g, '') || ''

  return (
    <main className="min-h-screen bg-black text-white">
      <CartView whatsapp={whatsapp} />
    </main>
  )
}
