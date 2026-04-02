import React from 'react';
import { Diamond, ShieldCheck, Sparkles, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Diamond className="text-[#C5A059]" size={28} strokeWidth={1.5} />,
      title: "100% Virgin Hair",
      description: "Unprocessed, ethically sourced human hair with intact cuticles for unmatched softness."
    },
    {
      icon: <ShieldCheck className="text-[#C5A059]" size={28} strokeWidth={1.5} />,
      title: "Quality Guaranteed",
      description: "Every bundle is inspected for consistency, strength, and natural luster before it reaches you."
    },
    {
      icon: <Sparkles className="text-[#C5A059]" size={28} strokeWidth={1.5} />,
      title: "Versatile Styling",
      description: "Color, bleach, curl, or straighten — our hair handles heat and chemicals beautifully."
    },
    {
      icon: <Heart className="text-[#C5A059]" size={28} strokeWidth={1.5} />,
      title: "Long-Lasting Wear",
      description: "With proper care, our hair lasts 12+ months — a true investment in your beauty."
    }
  ];

  return (
    <section className="relative bg-[#0a0904] py-32 px-6 border-t border-[#C5A059]/20 overflow-hidden">
      
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
        
        {/* Header Section */}
        <div className="text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059] bg-[#C5A059]/10 mx-auto backdrop-blur-md">
            <span className="text-[#C5A059] text-xs animate-pulse">✦</span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white">
              Why Choose Us
            </span>
          </div>

          <h2 className="font-serif text-6xl md:text-8xl text-white italic drop-shadow-2xl">
            The Luxe Difference
          </h2>
          
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
          
          <p className="text-zinc-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light pt-4 italic">
            We believe every woman deserves to feel confident and beautiful. That's why we source 
            only the finest quality hair from trusted suppliers around the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group p-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex flex-col items-center text-center hover:bg-black/60 hover:border-[#C5A059]/40 transition-all duration-500 shadow-2xl"
            >
              {/* Icon Wrapper */}
              <div className="w-20 h-20 rounded-3xl border border-[#C5A059]/20 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 bg-zinc-900 shadow-inner">
                {item.icon}
              </div>
              
              <h3 className="font-serif text-2xl text-white mb-4 italic tracking-wide group-hover:text-[#C5A059] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed font-light group-hover:text-zinc-200 transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;