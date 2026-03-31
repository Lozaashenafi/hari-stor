
import Hero from "@/components/site/Hero";
import ProductSection from "@/components/site/ProductSection";
import { getAdminProducts } from "@/services/product.service";
import { getCompanyProfile } from "@/services/company.service";
import GallerySection from "@/components/site/GallerySection";
import Features from "@/components/site/Features";
import ContactSection from "@/components/site/ContactSection";

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
  {/* Add the Gallery Section here */}
      <GallerySection />
      {/* Add a placeholder footer */}
      <Features /> {/* 2. Add it here */}
      <ContactSection /> 

     </main>
  );
}