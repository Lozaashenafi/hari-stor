import Hero from "@/components/site/Hero";
import ProductSection from "@/components/site/ProductSection";
import { getProductsByIds } from "@/services/product.service";
import { getCompanyProfile } from "@/services/company.service";
import GallerySection from "@/components/site/GallerySection";
import Features from "@/components/site/Features";
import ContactSection from "@/components/site/ContactSection";

// Hand-picked products featured in the homepage "The Essentials" section.
// Change these IDs to feature different products.
const FEATURED_PRODUCT_IDS = [60, 87 , 69 ,81];

export default async function HomePage() {
  const [products, company] = await Promise.all([
    getProductsByIds(FEATURED_PRODUCT_IDS),
    getCompanyProfile(),
  ]);

  return (
    <main>
      <Hero profile={company} />
      {/* The Essentials — hand-picked products (FEATURED_PRODUCT_IDS above) */}
      <ProductSection products={products} company={company} />
  {/* Add the Gallery Section here */}
      <GallerySection />
      {/* Add a placeholder footer */}
      <Features /> {/* 2. Add it here */}
      <ContactSection /> 

     </main>
  );
}
