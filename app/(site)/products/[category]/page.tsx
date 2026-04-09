import { getProductsByCategory } from '@/services/product.service'; 
import { getCompanyProfile } from '@/services/company.service';
import CategoryClient from './CategoryClient';

// Note: params is now a Promise in Next.js 15
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  
  // 1. Await the params first!
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  // 2. Fetch products and company profile
  const products = await getProductsByCategory(category);
  const company = await getCompanyProfile();

  return (
    <main className="min-h-screen bg-black text-white font-sans">
    
      {/* Pass the unwrapped category string */}
      <CategoryClient 
        initialProducts={products} 
        categoryName={category} 
        company={company} 
      />
    </main>
  );
}