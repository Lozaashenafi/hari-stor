import React from 'react';
import Link from 'next/link';
import { getCompanyProfile } from '@/services/company.service';
import HeroImage from '../../../public/hero-model.png';

const Hero = async () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
     
      {/* 2. HERO SECTION - Starts AFTER the header */}
      <div className="relative flex-grow w-full overflow-hidden h-[90vh] md:h-[80vh]">
        
        {/* Background Image - Using bg-top to avoid cropping the head */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${HeroImage.src})` }}
        >
          {/* Subtle Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col justify-end align-bottom h-full px-8 md:px-16 max-w-5xl py-20">
          <h4 className="text-[#C5A059] tracking-[0.4em] text-[10px] md:text-xs mb-4 font-bold uppercase">
            PREMIUM VIRGIN HAIR
          </h4>
          
          <h1 className="font-serif text-5xl md:text-8xl leading-tight mb-6 font-bold text-white">
            Embrace Your <br />
            <span className="text-[#C5A059] italic font-light">
              Natural Beauty
            </span>
          </h1>
          
          <p className="text-zinc-200 text-sm md:text-base max-w-md mb-10 font-normal leading-relaxed">
            Discover our collection of 100% virgin human hair extensions. 
            Luxurious quality, ethically sourced, designed for excellence.
          </p>

          {/* Action Button */}
          <Link 
            href="/products" 
            className="w-fit px-10 py-4 border border-[#C5A059] text-[#C5A059] uppercase tracking-widest text-xs font-bold hover:bg-[#C5A059] hover:text-black transition-all duration-300"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;