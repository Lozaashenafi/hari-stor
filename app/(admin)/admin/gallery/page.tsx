import { getGalleryImages } from "@/services/gallery.service";
import GalleryManagerClient from "./GalleryManagerClient";

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <header className="mb-12 mt-6 text-center md:text-left">
        <h1 className="font-serif text-4xl md:text-6xl text-white italic">Showcase</h1>
        <p className="text-[#5a3e00] text-xs uppercase tracking-[0.4em] mt-4 font-black">
          Visual Gallery Management
        </p>
      </header>

      <GalleryManagerClient initialImages={images} />
    </div>
  );
}