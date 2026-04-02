import { getAdminProducts } from "@/services/product.service";
import { getCompanyProfile } from "@/services/company.service";
import AllProductsClient from "./AllProductsClient";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AllProductsPage() {
  const [products, company] = await Promise.all([
    getAdminProducts(),
    getCompanyProfile()
  ]);

  return (
    <div className="min-h-screen bg-[#0a0904] relative overflow-hidden">
      
      {/* --- INTENSE LUXURY GOLDEN BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Large Central Golden Radiance */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] rounded-full bg-[#5a3e00]/40 blur-[160px] opacity-60" />
        
        {/* 2. Top Header Amber Wash (Much brighter) */}
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[50%] rounded-full bg-[#8c6b12]/50 blur-[140px]" />
        
        {/* 3. High-Gold Accents (Brighter highlights) */}
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#ffd700]/20 blur-[100px]" />
        
        {/* 4. Bottom Corner Warmth */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#5a3e00]/60 blur-[120px]" />

        {/* Subtle Shimmer Texture */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-7xl mx-auto pt-24 md:pt-32 pb-20 px-6">
        
        {/* Navigation Header */}
        <header className="mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-all group mb-8 uppercase text-[10px] tracking-[0.4em] font-black"
          >
            <span className="group-hover:-translate-x-2 transition-transform">
                <ArrowLeft size={20} strokeWidth={3} className="text-[#5a3e00]" />
            </span>
            Back to Home
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5a3e00] bg-[#5a3e00]/20 w-fit mb-4 backdrop-blur-md">
                <span className="text-white text-xs animate-pulse">✦</span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white">
                    {company?.name || "ShallyLuxe"} Vault
                </span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-[9rem] text-white italic leading-[0.8] tracking-tighter drop-shadow-2xl">
              Collections
            </h1>
          </div>
        </header>

        {/* Client side Filtering & Search */}
        <div className="mt-20">
            <AllProductsClient products={products} company={company} />
        </div>
      </div>
    </div>
  );
}