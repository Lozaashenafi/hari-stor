import { getProductById } from "@/services/product.service";
import { notFound } from "next/navigation";
import EditProductForm from "./EditProductForm";

export default async function EditPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  if (isNaN(productId)) notFound();

  const product = await getProductById(productId);
  
  if (!product) notFound();

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <header className="mb-12 mt-6">
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">
          Refine Masterpiece
        </h1>
        <p className="text-[#C5A059] text-xs uppercase tracking-[0.4em] font-bold mt-4">
          Modifying: {product.name}
        </p>
      </header>
      
      <EditProductForm product={product} />
    </div>
  );
}