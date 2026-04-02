import React from 'react';
import Link from 'next/link';
import { getGalleryImages } from '@/services/gallery.service';

const GallerySection = async () => {
  const images = await getGalleryImages();
  
  // Show ONLY the top 4 images for the home page
  const featuredGallery = images.slice(0, 4);

  return (
    <section id="gallery" className="relative bg-[#0a0904] py-32 px-6 border-t border-[#C5A059]/20 overflow-hidden">
      
      {/* --- INTENSE LUXURY GOLDEN BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* 1. Large Central Golden Radiance */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] rounded-full bg-[#5a3e00]/40 blur-[160px] opacity-60" />
        
        {/* 2. Top Header Amber Wash (Much brighter) */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#5a3e00]/60 blur-[120px]" />
        
        {/* 3. High-Gold Accents (Brighter highlights) */}
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#ffd700]/20 blur-[100px]" />
        
        {/* 4. Bottom Corner Warmth */}
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#5a3e00]/60 blur-[120px]" />

        {/* Subtle Shimmer Texture */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <header className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059] bg-[#C5A059]/10 mx-auto backdrop-blur-md">
            <span className="text-[#C5A059] text-xs animate-pulse">✦</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white">
              Inspiration
            </span>
          </div>

          <h2 className="font-serif text-6xl md:text-8xl text-white italic drop-shadow-2xl">
            Styled Looks
          </h2>
          
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
          
          <p className="text-zinc-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light pt-4 italic">
            See how our hair transforms — from sleek bobs to voluminous curls, 
            the possibilities are endless.
          </p>
        </header>

        {/* Dynamic Grid: 4 in a row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {featuredGallery.map((item) => (
            <div 
              key={item.id} 
              className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 group bg-black shadow-2xl transition-all hover:border-[#C5A059]/40"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              
              {/* Elegant Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-[#C5A059] text-[10px] uppercase tracking-[0.3em] font-black mb-2">
                  Showcase Piece
                </p>
                <h3 className="text-white font-serif text-2xl italic leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation to Full Gallery */}
        <div className="text-center mt-20">
          <Link 
            href="/gallery" 
            className="group inline-flex items-center gap-5 border border-[#C5A059]/40 bg-black/40 backdrop-blur-sm px-14 py-5 rounded-full text-[10px] uppercase tracking-[0.5em] font-black text-white hover:bg-[#C5A059] hover:text-black transition-all shadow-2xl"
          >
            Explore The Archive
            <span className="group-hover:translate-x-2 transition-transform italic">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;