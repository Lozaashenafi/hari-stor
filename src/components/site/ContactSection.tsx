import React from 'react';
import Link from 'next/link';
import { getCompanyProfile } from '@/services/company.service';

// Custom SVG Icons to match the "Luxe" theme and avoid library bugs
const Icons = {
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  TikTok: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
  ),
  WhatsApp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
  )
};

const ContactSection = async () => {
  const profile = await getCompanyProfile();

  // Link formatters
  const waLink = `https://wa.me/${profile?.whatsapp?.replace(/\+/g, '')}`;
  const igLink = `https://instagram.com/${profile?.instagram?.replace('@', '')}`;
  const tkLink = `https://tiktok.com/@${profile?.tiktok?.replace('@', '')}`;

  return (
    <footer id="contact" className="bg-black pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP SECTION: CONNECT */}
        <div className="text-center mb-24 space-y-8">
          <span className="text-[#C5A059] text-[10px] uppercase tracking-[0.5em] font-black block">
            Get In Touch
          </span>
          <h2 className="font-serif text-5xl md:text-8xl text-white italic">
            Let's Connect
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
          
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed font-light">
            Ready to upgrade your hair game? Reach out via WhatsApp or find us on social media. 
            We'd love to help you find your perfect match.
          </p>

          {/* DYNAMIC WHATSAPP BUTTON */}
          <div className="pt-4">
            <a 
              href={waLink}
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#C5A059] text-black px-10 py-5 rounded-sm font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#D4B26E] transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl shadow-gold/20"
            >
              <Icons.WhatsApp />
              Chat on WhatsApp
            </a>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center gap-6 pt-8">
            <SocialCircle href={igLink} icon={<Icons.Instagram />} />
            <SocialCircle href={tkLink} icon={<Icons.TikTok />} />
          </div>

          
        </div>

        {/* BOTTOM SECTION: BRANDING & COPYRIGHT */}
        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-[0.4em] text-[#C5A059] uppercase">
            {profile?.name || "LUXE HAIR"}
          </div>
          
          <div className="text-zinc-600 text-[9px] uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} {profile?.name || "LUXE HAIR"}. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

const SocialCircle = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <a 
    href={href}
    target="_blank"
    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500 bg-zinc-900/30"
  >
    {icon}
  </a>
);

export default ContactSection;