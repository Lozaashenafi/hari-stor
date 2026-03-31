
import Hero from "@/components/site/Hero";
import ProductSection from "@/components/site/ProductSection";
import { getAdminProducts } from "@/services/product.service";
import { getCompanyProfile } from "@/services/company.service";

export default async function HomePage() {
   // Fetch real data from Drizzle
  const [products, company] = await Promise.all([
    getAdminProducts(),
    getCompanyProfile()
  ]);
  return (
    <main>
      <Hero />
 
      {/* Dynamic Products Section */}
      <ProductSection products={products} company={company} />

      {/* Add a placeholder footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-20 text-center">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em]">
          &copy; {new Date().getFullYear()} {company?.name || 'SHALLYLUXE'} • All Rights Reserved
        </p>
      </footer>    </main>
  );
}