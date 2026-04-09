import React from 'react';
import { getCompanyProfile } from '@/services/company.service';
import { Icons } from '@/components/ui/Icons'; // Assuming this contains Phone, MapPin, Globe, etc.
import { Phone, MapPin, Globe } from 'lucide-react';

const ContactSection = async () => {
  const profile = await getCompanyProfile();

  // Logic remains unchanged
  const cleanWANumber = profile?.whatsapp?.replace(/\D/g, '') || '';
  const waLink = cleanWANumber ? `https://wa.me/${cleanWANumber}` : '#';
  const igLink = `https://instagram.com/${profile?.instagram?.replace('@', '')}`;
  const tkLink = `https://tiktok.com/@${profile?.tiktok?.replace('@', '')}`;

  return (
    <footer className="relative bg-black py-24 px-6 border-t border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#C5A059] block">
            Customer Care
          </span>
          <h2 className="font-serif text-4xl md:text-7xl text-white uppercase tracking-wider">
            Let's Connect
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A059] mx-auto mt-6" />
          
          {profile?.contactInfo && (
            <p className="text-zinc-400 max-w-xl mx-auto text-xs md:text-sm leading-relaxed tracking-wide pt-6 uppercase opacity-80">
              {profile.contactInfo}
            </p>
          )}
        </div>

        {/* --- WHATSAPP CTA (Sharp Rectangle) --- */}
        <div className="flex justify-center mb-20">
          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-[#C5A059] text-[#C5A059] px-12 py-5 font-bold text-xs uppercase tracking-[0.3em] hover:bg-[#C5A059] hover:text-black transition-all duration-300"
          >
            <Icons.WhatsApp width={16} height={16} />
            Connect via WhatsApp
          </a>
        </div>

        {/* --- INFO & SOCIALS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-[#C5A059]/10 py-16">
          
          {/* Phone */}
          <div className="flex flex-col items-center gap-4 text-center">
             <Phone size={20} className="text-[#C5A059] stroke-[1.2]" />
             <span className="text-white text-[11px] uppercase tracking-widest font-medium">
                {profile?.phone || "Call Us Directly"}
             </span>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center gap-4 text-center">
             <MapPin size={20} className="text-[#C5A059] stroke-[1.2]" />
             <span className="text-white text-[11px] uppercase tracking-widest font-medium">
                {profile?.location || "Global Headquarters"}
             </span>
          </div>

          {/* Socials */}
          <div className="flex justify-center gap-8">
            <SocialItem href={igLink} icon={<Icons.Instagram width={18} height={18} />} label="IG" />
            <SocialItem href={tkLink} icon={<Icons.TikTok width={18} height={18} />} label="TK" />
          </div>
        </div>

        {/* --- BOTTOM BRAND BAR --- */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-[0.4em] text-[#C5A059] uppercase">
            {profile?.name || "SHALLY LUXE"}
          </div>
          
          <div className="flex items-center gap-6 text-zinc-500 text-[9px] uppercase tracking-[0.2em] font-bold">
            <div className="flex items-center gap-2">
              <Globe width={12} height={12} className="text-[#C5A059]" />
              <span className="text-zinc-300">Worldwide Shipping</span>
            </div>
            <span className="text-zinc-500">© {new Date().getFullYear()} Shally Luxe Hair</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialItem = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 group"
  >
    <div className="w-10 h-10 border border-[#C5A059]/30 flex items-center justify-center text-zinc-400 group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-all duration-300">
      {icon}
    </div>
    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors font-bold">
      {label}
    </span>
  </a>
);

export default ContactSection;