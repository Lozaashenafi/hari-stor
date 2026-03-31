import React from 'react';
import Link from 'next/link';
import { getCompanyProfile } from '@/services/company.service';
import HeroImage from '../../../public/hero-model.jpg';
import Logo from '../../../public/logo.jpg'; 

// Custom SVG Icons
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
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  )
};

const Hero = async () => {
  const profile = await getCompanyProfile();

  const formatSocial = (handle: string | null | undefined, type: 'ig' | 'tk' | 'wa') => {
    if (!handle) return '#';
    if (handle.startsWith('http')) return handle;
    if (type === 'ig') return `https://instagram.com/${handle.replace('@', '')}`;
    if (type === 'tk') return `https://tiktok.com/@${handle.replace('@', '')}`;
    if (type === 'wa') return `https://wa.me/${handle.replace('+', '')}`;
    return '#';
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden font-sans">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImage.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>

      {/* Header / Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-16 border-b border-white/5 backdrop-blur-sm bg-black/10">
        <Link href="/" className="flex items-center gap-4 group">
          {/* Logo Rendering */}
          <img 
            src={Logo.src} 
            alt="Luxe Logo" 
            className="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-105" 
          />
          <div className="hidden sm:block text-xl md:text-2xl font-bold tracking-[0.3em] text-[#C5A059] uppercase">
            {profile?.name || "LUXE HAIR"}
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-light">
          <Link href="/" className="hover:text-[#C5A059] transition">Home</Link>
          <Link href="#products" className="hover:text-[#C5A059] transition">Products</Link>
          <Link href="#gallery" className="hover:text-[#C5A059] transition">Gallery</Link>
          <Link href="#contact" className="hover:text-[#C5A059] transition text-nowrap">Contact Us</Link>
          
          <Link 
            href="/login" 
            className="flex items-center gap-2 border border-[#C5A059]/40 px-5 py-2 rounded-full hover:bg-[#C5A059] hover:text-black transition duration-300"
          >
            <Icons.User />
            <span className="text-[10px] tracking-widest font-bold">Admin</span>
          </Link>
        </div>

        {/* Mobile Mini Admin Icon (visible when menu hidden) */}
        <Link href="/login" className="lg:hidden p-2 border border-[#C5A059]/40 rounded-full text-[#C5A059]">
          <Icons.User />
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center h-[calc(100vh-100px)] px-8 md:px-16 max-w-5xl">
        <h4 className="text-[#C5A059] tracking-[0.4em] text-[10px] md:text-xs mb-6 font-bold uppercase">
          PREMIUM VIRGIN HAIR
        </h4>
        
        <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] mb-8">
          Embrace Your <br />
          <span className="text-[#C5A059] italic font-light">Natural Beauty</span>
        </h1>
        
        <p className="text-gray-300 text-base md:text-lg max-w-lg mb-12 font-light leading-relaxed opacity-80">
          Discover our collection of 100% virgin human hair extensions. 
          Luxurious quality, ethically sourced, designed for the modern woman who demands excellence.
        </p>

        {/* Social Links - DYNAMIC */}
        <div className="flex flex-wrap gap-4 md:gap-5">
          <SocialButton 
            icon={<Icons.Instagram />} 
            label="Instagram" 
            href={formatSocial(profile?.instagram, 'ig')} 
          />
          <SocialButton 
            icon={<Icons.TikTok />} 
            label="TikTok" 
            href={formatSocial(profile?.tiktok, 'tk')} 
          />
          <SocialButton 
            icon={<Icons.WhatsApp />} 
            label="WhatsApp" 
            href={formatSocial(profile?.whatsapp, 'wa')} 
          />
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#C5A059] to-transparent"></div>
    </div>
  );
};

const SocialButton = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 px-6 py-3 border border-white/10 rounded-full hover:border-[#C5A059]/50 hover:bg-white/5 transition-all duration-300 group"
  >
    <span className="text-[#C5A059] group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[10px] md:text-sm font-light tracking-widest uppercase text-gray-200">{label}</span>
  </a>
);

export default Hero;