import React from 'react';
import Link from 'next/link';
import { getGalleryImages } from '@/services/gallery.service';

const GallerySection = async () => {
  const images = await getGalleryImages();
  
  // Show ONLY the top 4 images for the home page
  const featuredGallery = images.slice(0, 4);

  return (
    <section id="gallery" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <header className="text-center mb-16 space-y-4">
          <span className="text-[#5a3e00] text-[10px] uppercase tracking-[0.5em] font-black block">
            Inspiration
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-white italic">
            Styled Looks
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5a3e00] to-transparent mx-auto mt-6" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed font-light pt-4">
            See how our hair transforms — from sleek bobs to voluminous curls, 
            the possibilities are endless.
          </p>
        </header>

        {/* Dynamic Grid: 4 in a row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {featuredGallery.map((item) => (
            <div 
              key={item.id} 
              className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 group bg-zinc-900"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-[#5a3e00] text-[9px] uppercase tracking-[0.3em] font-bold mb-1">
                  Collection Piece
                </p>
                <h3 className="text-white font-serif text-xl italic">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation to Full Gallery */}
        <div className="text-center mt-16">
          <Link 
            href="/gallery" 
            className="group inline-flex items-center gap-4 border border-[#5a3e00]/30 px-12 py-4 rounded-full text-[10px] uppercase tracking-[0.4em] text-gray-400 hover:text-white hover:border-[#5a3e00] transition-all"
          >
            Explore Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;