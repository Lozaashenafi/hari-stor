import React from 'react';
import { Diamond, ShieldCheck, Sparkles, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Diamond className="text-[#C5A059]" size={24} strokeWidth={1.2} />,
      title: "100% VIRGIN HAIR",
      description: "Unprocessed, ethically sourced human hair with intact cuticles for unmatched softness."
    },
    {
      icon: <ShieldCheck className="text-[#C5A059]" size={24} strokeWidth={1.2} />,
      title: "QUALITY GUARANTEED",
      description: "Every bundle is inspected for consistency, strength, and natural luster before it reaches you."
    },
    {
      icon: <Sparkles className="text-[#C5A059]" size={24} strokeWidth={1.2} />,
      title: "VERSATILE STYLING",
      description: "Color, bleach, curl, or straighten — our hair handles heat and chemicals beautifully."
    },
    {
      icon: <Heart className="text-[#C5A059]" size={24} strokeWidth={1.2} />,
      title: "LONG-LASTING WEAR",
      description: "With proper care, our hair lasts 12+ months — a true investment in your beauty."
    }
  ];

  return (
    <section className="relative bg-black py-24 px-6 border-t border-[#C5A059]/10">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-20 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300 block">
            Quality Assurance
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-[#C5A059] uppercase tracking-wider">
            The Luxe Difference
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </header>

        {/* --- FEATURES GRID (Sharp Rectangles) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C5A059]/10 border border-[#C5A059]/10">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group p-12 bg-black flex flex-col items-center text-center transition-all duration-500 hover:bg-zinc-950"
            >
              {/* Icon Wrapper - Sharp Edges */}
              <div className="w-16 h-16 border border-[#C5A059]/30 flex items-center justify-center mb-8 group-hover:border-[#C5A059] transition-colors duration-500">
                {item.icon}
              </div>
              
              <h3 className="font-serif text-lg text-[#C5A059] mb-4 tracking-[0.15em] font-bold">
                {item.title}
              </h3>
              
              <p className="text-zinc-400 text-xs leading-relaxed tracking-wide font-normal max-w-[240px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* --- BOTTOM TAGLINE --- */}
        <div className="mt-20 text-center">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] font-medium italic">
                Sourced Globally • Crafted for Excellence
            </p>
        </div>
      </div>
    </section>
  );
};

export default Features;