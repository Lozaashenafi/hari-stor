import React from 'react';
import Link from 'next/link';
import HeroImage from '../../../public/hero-model.png'; 

const Hero = () => {
  return (
    <div className="w-full bg-black flex flex-col pb-12">
      
      {/* 1. IMAGE SECTION */}
      {/* Using standard width/height without forcing full screen height */}
      <div className="w-full">
        <img
          src={HeroImage.src}
          alt="Shally Luxe Hair Collection"
          className="w-full h-auto object-cover max-h-[60vh] md:max-h-[80vh] object-top"
        />
      </div>
      
      {/* 2. TEXT & DESCRIPTION SECTION (Fills the space below on mobile) */}
      <div className="flex flex-col items-center justify-center px-6 pt-10 text-center">
        
        {/* Subtitle / Eyebrow text */}
        <span className="text-[#C5A059] text-[10px] tracking-[0.25em] font-medium uppercase mb-3">
          shalls hair
        </span>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">
          welcome <br className="md:hidden" />
          <span className="text-[#C5A059] italic font-light"> to shalls hair</span>
        </h1>
        
        {/* Short Description */}
        <p className="text-gray-300 text-sm md:text-base max-w-md mb-8 leading-relaxed font-light">
          Discover the perfect blend of quality and style with our premium hair extensions.
        </p>

        {/* Call to Action Button */}
        <Link 
          href="/products" 
          className="px-8 py-4 border border-[#C5A059] text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#C5A059] hover:text-black transition-all duration-300"
        >
          Shop Collection
        </Link>
        
      </div>

    </div>
  );
};

export default Hero;