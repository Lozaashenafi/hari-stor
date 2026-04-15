import { getAdminProducts } from "@/services/product.service"; // Ensure this path is correct
import SearchPageClient from "./SearchPageClient";

export default async function SearchPage() {
  const products = await getAdminProducts();

  return (
    <SearchPageClient 
      products={products ?? []} 
      company={{}} // Pass actual company data if you have it
    />
  );
}