import React from 'react';
import { Diamond, ShieldCheck, Sparkles, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Diamond className="text-[#5a3e00]" size={28} strokeWidth={1} />,
      title: "100% Virgin Hair",
      description: "Unprocessed, ethically sourced human hair with intact cuticles for unmatched softness."
    },
    {
      icon: <ShieldCheck className="text-[#5a3e00]" size={28} strokeWidth={1} />,
      title: "Quality Guaranteed",
      description: "Every bundle is inspected for consistency, strength, and natural luster before it reaches you."
    },
    {
      icon: <Sparkles className="text-[#5a3e00]" size={28} strokeWidth={1} />,
      title: "Versatile Styling",
      description: "Color, bleach, curl, or straighten — our hair handles heat and chemicals beautifully."
    },
    {
      icon: <Heart className="text-[#5a3e00]" size={28} strokeWidth={1} />,
      title: "Long-Lasting Wear",
      description: "With proper care, our hair lasts 12+ months — a true investment in your beauty."
    }
  ];

  return (
    <section className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <h4 className="text-[#5a3e00] text-[10px] uppercase tracking-[0.5em] font-black">
            Why Choose Us
          </h4>
          <h2 className="font-serif text-5xl md:text-7xl text-white italic">
            The Luxe Difference
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#5a3e00] to-transparent mx-auto mt-6" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light pt-4">
            We believe every woman deserves to feel confident and beautiful. That's why we source 
            only the finest quality hair from trusted suppliers around the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group p-10 bg-zinc-900/30 border border-white/5 rounded-2xl flex flex-col items-center text-center hover:bg-zinc-900/50 hover:border-[#5a3e00]/30 transition-all duration-500 shadow-2xl"
            >
              {/* Icon Wrapper */}
              <div className="w-16 h-16 rounded-full border border-[#5a3e00]/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 bg-black">
                {item.icon}
              </div>
              
              <h3 className="font-serif text-xl text-white mb-4 italic tracking-wide">
                {item.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed font-light">
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