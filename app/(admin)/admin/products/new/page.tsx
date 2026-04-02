import { getCategories } from "@/services/product.service";
import NewProductPageForm from "./NewProductPageForm";

export default async function Page() {
  // Fetch categories on the server
  const categories = await getCategories();

  // Pass them to the client form
  return <NewProductPageForm categories={categories} />;
}