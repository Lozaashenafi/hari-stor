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
    
        <div className="mt-20">
            <AllProductsClient products={products} company={company} />
        </div>
      </div>
  );
}