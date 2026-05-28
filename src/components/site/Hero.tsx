import React from 'react';
import Link from 'next/link';
import HeroImage from '../../../public/image/hero.jpg'; 
import HeroImage2 from '../../../public/hero-model.jpg'; 


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
       {/* Subtitle / Eyebrow text */}
<span className="text-gray-300 text-[10px] tracking-[0.25em] font-medium uppercase mb-3 block">
  shalls hair
</span>

{/* Main Title */}
<h1 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-wide flex flex-col items-center">
  {/* First Line */}
  <span className="block text-[#C5A059] leading-none">
     WELCOME
  </span>
  
  {/* Middle Line */}
  <span className="text-[#C5A059] italic font-light text-2xl md:text-4xl my-2 block lowercase">
    TO
  </span>
  
  {/* Bottom Line */}
  <span className="text-[#C5A059] italic font-light block leading-none">
    SHALLY LUXE
  </span>
</h1>
       
<div className="w-full">
        <img
          src={HeroImage2.src}
          alt="Shally Luxe Hair Collection"
          className="w-full h-auto object-cover max-h-[60vh] md:max-h-[80vh] object-top"
        />
      </div>
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