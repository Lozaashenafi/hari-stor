import { getAdminProducts } from "@/services/product.service";
import { getCompanyProfile } from "@/services/company.service";
import AllProductsClient from "./AllProductsClient";
import Link from "next/link"; // Import Next.js Link
import { ArrowLeft } from "lucide-react";



export default async function AllProductsPage() {
  const [products, company] = await Promise.all([
    getAdminProducts(),
    getCompanyProfile()
  ]);

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Header */}
        <header className="mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 text-gray-500 hover:text-[#C5A059] transition-all group mb-8 uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
                <ArrowLeft />
            </span>
            Back to Home
          </Link>

          <div className="space-y-4">
            <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-black block">
              {company?.name || "ShallyLuxe"} Catalog
            </span>
            <h1 className="font-serif text-6xl md:text-8xl text-white italic leading-tight">
              Collections
            </h1>
          </div>
        </header>

        {/* Client side Filtering & Search */}
        <AllProductsClient products={products} company={company} />
      </div>
    </div>
  );
}