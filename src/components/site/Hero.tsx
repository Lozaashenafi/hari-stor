'use client'
import React from 'react';
import Link from 'next/link';
import HeroImage from '../../../public/image/image.png'; 
import HeroImage2 from '../../../public/hero-model.jpg'; 

// --- Custom Brand Icons (SVGs) ---
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
);

const Hero = () => {
  return (
    <div className="w-full bg-black flex flex-col pb-12">
      
      {/* 1. TOP IMAGE SECTION */}
      <div className="w-full">
        <img
          src={HeroImage.src}
          alt="Shally Luxe Hair Collection"
          className="w-full h-auto object-cover max-h-[60vh] md:max-h-[80vh] object-top"
        />
      </div>
      
      {/* 2. WELCOME TEXT SECTION */}
      <div className="flex flex-col items-center justify-center px-6 pt-10 text-center">
        <span className="text-gray-400 text-[10px] tracking-[0.4em] font-bold uppercase mb-3 block">
          shalls hair
        </span>

        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-wide flex flex-col items-center">
          <span className="block text-[#C5A059] leading-none">WELCOME</span>
          <span className="text-[#C5A059] italic font-light text-2xl md:text-4xl my-2 block lowercase">to</span>
          <span className="text-[#C5A059] italic font-light block leading-none">SHALLY LUXE</span>
        </h1>
      </div>

      {/* 3. STYLED HERO SECTION (Aligned to Left Corner) */}
      <div className="relative w-full min-h-[85vh] md:min-h-screen flex flex-col items-start justify-center overflow-hidden">
        
        {/* Background Image */}
        <img
          src={HeroImage2.src}
          alt="Premium Virgin Hair Model"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark Overlays (Slightly heavier on the left for text readability) */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>

        {/* Content Overlay - Adjusted to Left Corner */}
        <div className="relative z-10 px-8 md:px-20 flex flex-col items-start text-left max-w-3xl">
          
          <span className="text-[#C5A059] text-[10px] md:text-xs tracking-[0.4em] font-black uppercase mb-4">
            Premium Virgin Hair
          </span>

          <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight mb-6 italic">
            Embrace Your <br />
            <span className="text-[#C5A059] not-italic">Natural Beauty</span>
          </h2>

          <p className="text-gray-200 text-sm md:text-base leading-relaxed font-light mb-10 opacity-90 max-w-md">
            Discover our collection of 100% virgin human hair extensions. 
            Luxurious quality, ethically sourced, designed for the modern woman who demands excellence.
          </p>

          {/* Social Buttons Group - Aligned Left */}
          <div className="flex flex-col gap-3 w-full max-w-[280px]">
             <div className="grid grid-cols-2 gap-3">
                <a href="https://www.instagram.com/shallyluxe" className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md py-4 px-2 rounded-full text-white text-[9px] tracking-widest uppercase hover:bg-white/10 transition">
                    <InstagramIcon /> Insta
                </a>
                <a href="" className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 backdrop-blur-md py-4 px-2 rounded-full text-white text-[9px] tracking-widest uppercase hover:bg-white/10 transition">
                    <TikTokIcon /> Tiktok
                </a>
             </div>
             
             <a href="https://wa.me/12265053725" className="flex items-center justify-center gap-3 border border-white/20 bg-white/5 backdrop-blur-md py-4 px-4 rounded-full text-white text-[9px] tracking-widest uppercase hover:bg-white/10 transition">
                <WhatsAppIcon /> WhatsApp
             </a>
          </div>
        </div>
      </div>

      {/* 4. FINAL CTA SECTION */}
      <div className="flex flex-col items-center justify-center px-6 pt-16 text-center">
      
        <Link 
          href="/products" 
          className="px-10 py-5 border border-[#C5A059] text-[#C5A059] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#C5A059] hover:text-black transition-all duration-500"
        >
          Shop Collection
        </Link>
      </div>

    </div>
  );
};

export default Hero;