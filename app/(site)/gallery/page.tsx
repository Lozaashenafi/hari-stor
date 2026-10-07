import { getGalleryImages } from "@/services/gallery.service";
import Link from "next/link";
import GalleryImageCard from "@/components/site/GalleryImageCard";

// Simple Arrow SVG
const BackArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

export default async function FullGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-20 space-y-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#5a3e00] transition-all group uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              <BackArrow />
            </span>
            Back to Home
          </Link>
          
          <h1 className="font-serif text-6xl md:text-8xl text-white italic leading-tight">
            The Archive
          </h1>
          <p className="text-[#5a3e00] text-[10px] uppercase tracking-[0.5em] font-black">
            Visual record of luxury transformations
          </p>
        </header>

        {/* Grid for all images: 4 in a row.
            Grayscale until the user HOVERS the card or CLICKS/TAPS it
            (handled by GalleryImageCard). */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative block aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-zinc-900"
            >
              <GalleryImageCard
                src={img.imageUrl}
                alt={img.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-black/60 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="text-white font-serif text-lg italic">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div className="py-40 text-center border border-dashed border-white/5 rounded-[3rem]">
            <p className="text-zinc-600 font-serif text-2xl italic tracking-widest">
              Gallery is being curated...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
