import React from 'react';
import { getCompanyProfile } from '@/services/company.service';
import { Icons } from '@/components/ui/Icons'; // Adjust path if necessary

const ContactSection = async () => {
  const profile = await getCompanyProfile();

  // Clean WhatsApp number to ensure the link never 404s
  const cleanWANumber = profile?.whatsapp?.replace(/\D/g, '') || '';
  const waLink = cleanWANumber ? `https://wa.me/${cleanWANumber}` : '#';
  
  const igLink = `https://instagram.com/${profile?.instagram?.replace('@', '')}`;
  const tkLink = `https://tiktok.com/@${profile?.tiktok?.replace('@', '')}`;

  return (
    <footer id="contact" className="bg-black pt-32 pb-12 px-6 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-24 space-y-10">
          <span className="text-[#C5A059] text-xs uppercase tracking-[0.6em] font-black block">
            Get In Touch
          </span>
          
          <h2 className="font-serif text-6xl md:text-8xl text-white italic leading-none">
            Let's Connect
          </h2>
          
          <div className="w-32 h-[1px] bg-[#C5A059] mx-auto" />
          
          {/* DYNAMIC COMPANY BIO */}
          {profile?.contactInfo && (
            <p className="text-zinc-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light italic px-4">
              "{profile.contactInfo}"
            </p>
          )}

          {/* DYNAMIC WHATSAPP CTA */}
          <div className="pt-6">
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#C5A059] text-black px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(197,160,89,0.2)]"
            >
              <Icons.WhatsApp width={20} height={20} strokeWidth={2.5} />
              Chat on WhatsApp
            </a>
          </div>

          {/* DYNAMIC LOCATION & PHONE */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-10">
            {profile?.phone && (
               <div className="flex items-center gap-3 text-white text-lg font-serif italic group">
                 <Icons.Phone width={22} height={22} className="text-[#C5A059]" />
                 <span className="border-b border-transparent group-hover:border-[#C5A059] transition-all">
                    {profile.phone}
                 </span>
               </div>
            )}

            {profile?.location && (
               <div className="flex items-center gap-3 text-white text-lg font-serif italic group">
                 <Icons.MapPin width={22} height={22} className="text-[#C5A059]" />
                 <span className="border-b border-transparent group-hover:border-[#C5A059] transition-all">
                    {profile.location}
                 </span>
               </div>
            )}
          </div>

          {/* DYNAMIC SOCIAL ICONS */}
          <div className="flex justify-center gap-10 pt-10">
            <SocialItem href={igLink} icon={<Icons.Instagram width={24} height={24} />} label="Instagram" />
            <SocialItem href={tkLink} icon={<Icons.TikTok width={24} height={24} />} label="TikTok" />
          </div>
        </div>

        {/* BOTTOM BRAND BAR */}
        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold tracking-[0.4em] text-[#C5A059] uppercase">
            {profile?.name || "LUXE HAIR"}
          </div>
          
          <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold">
            <Icons.Globe width={14} height={14} className="text-[#C5A059]" />
            <span className="text-zinc-300">Ships Worldwide</span>
            <span className="mx-4 opacity-20 text-white">|</span>
            <span className="text-zinc-400">© {new Date().getFullYear()} All Rights Reserved</span>
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
    className="flex flex-col items-center gap-3 group"
  >
    <div className="w-16 h-16 rounded-2xl border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-[#C5A059] group-hover:text-[#C5A059] group-hover:bg-[#C5A059]/5 transition-all duration-500 shadow-2xl">
      {icon}
    </div>
    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 group-hover:text-white transition-colors font-bold">
      {label}
    </span>
  </a>
);

export default ContactSection;