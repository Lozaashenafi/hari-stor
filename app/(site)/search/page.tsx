import { Suspense } from 'react';
import { getAdminProducts } from "@/services/product.service"; // Ensure this path is correct
import SearchPageClient from "./SearchPageClient";

export default async function SearchPage() {
  // 1. Fetch products on the server
  const products = await getAdminProducts();

  return (
    // 2. Wrap the client component in Suspense
    <Suspense fallback={
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white">Loading search...</p>
      </div>
    }>
      <SearchPageClient 
        products={products ?? []} 
        company={{}} 
      />
    </Suspense>
  );
}