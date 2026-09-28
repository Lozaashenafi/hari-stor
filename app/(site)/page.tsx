
import Hero from "@/components/site/Hero";
import ProductSection from "@/components/site/ProductSection";
import { getCompanyProfile } from "@/services/company.service";
import GallerySection from "@/components/site/GallerySection";
import Features from "@/components/site/Features";
import ContactSection from "@/components/site/ContactSection";

export default async function HomePage() {
  const company = await getCompanyProfile();
  return (
    <main>
      <Hero profile={company} />
      {/* Static Essentials — 4 images from /public */}
      <ProductSection />
  {/* Add the Gallery Section here */}
      <GallerySection />
      {/* Add a placeholder footer */}
      <Features /> {/* 2. Add it here */}
      <ContactSection /> 

     </main>
  );
}