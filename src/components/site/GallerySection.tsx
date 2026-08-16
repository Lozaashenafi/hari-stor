import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getGalleryImages } from '@/services/gallery.service';
import { ArrowRight } from 'lucide-react';

const GallerySection = async () => {
  const images = await getGalleryImages();
  
  // Logic remains unchanged: Show ONLY the top 4 images
  const featuredGallery = images.slice(0, 4);

  return (
    <section id="gallery" className="relative bg-black py-24 px-6 border-t border-[#C5A059]/10">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- SECTION HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#C5A059]/10 pb-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300 block">
               Visual Inspiration
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#C5A059] uppercase tracking-wider">
              Styled Looks
            </h2>
          </div>
          
          <Link 
            href="/gallery" 
            className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            View Full Gallery <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </header>

        {/* --- GALLERY GRID (Sharp Edges) --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredGallery.map((item) => (
            <div 
              key={item.id} 
              className="relative w-full aspect-[3/4] overflow-hidden border border-white/5 group bg-zinc-900 shadow-xl transition-all hover:border-[#C5A059]/30"
            >
              <Image 
                src={item.imageUrl} 
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Minimalist Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-[#C5A059] text-[9px] uppercase tracking-[0.3em] font-bold mb-1">
                  Collection Feature
                </p>
                <h3 className="text-white font-serif text-xl uppercase tracking-widest leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM CTA (Mobile Only) --- */}
        <div className="mt-16 text-center md:hidden">
          <Link 
            href="/gallery" 
            className="inline-block px-10 py-4 border border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-widest font-bold"
          >
            The Full Archive
          </Link>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;