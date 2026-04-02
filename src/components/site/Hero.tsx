import React from 'react';
import Link from 'next/link';
import { getCompanyProfile } from '@/services/company.service';
import HeroImage from '../../../public/hero-model.jpg';
import Logo from '../../../public/logo.jpg';
import MobileMenu from './MobileMenu';

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
      
      {/* 1. Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImage.src})` }}
      >
        {/* 2. THE SHADED GOLD OVERLAY */}
        {/* We use a multi-layer gradient: Deep black on the left and a warm bronze/gold tint in the middle */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/10 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10"></div>
      </div>

      {/* Header / Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-6 md:px-16 border-b border-white/5 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-4 group">
          <img 
            src={Logo.src} 
            alt="Luxe Logo" 
            className="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-105 border border-[#C5A059]/20 rounded-full" 
          />
          <div className="hidden sm:block text-xl md:text-2xl font-bold tracking-[0.3em] text-[#C5A059] uppercase">
            {profile?.name || "LUXE HAIR"}
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-light text-zinc-300">
          <Link href="/" className="hover:text-[#C5A059] transition">Home</Link>
          <Link href="/products" className="hover:text-[#C5A059] transition">Products</Link>
          <Link href="/gallery" className="hover:text-[#C5A059] transition">Gallery</Link>
          <Link href="#contact" className="hover:text-[#C5A059] transition text-nowrap">Contact Us</Link>
          
          <Link 
            href="/login" 
            className="flex items-center gap-2 border border-[#C5A059]/40 px-5 py-2 rounded-full hover:bg-[#C5A059] hover:text-black transition duration-300"
          >
            <Icons.User />
            <span className="text-[10px] tracking-widest font-bold text-[#C5A059] hover:text-inherit">Admin</span>
          </Link>
        </div>

        <MobileMenu />
      </nav>

      {/* 3. Hero Content with Gold Glow Text */}
      <div className="relative z-20 flex flex-col justify-center h-[calc(100vh-100px)] px-8 md:px-16 max-w-5xl">
        <h4 className="text-[#C5A059] tracking-[0.4em] text-[10px] md:text-xs mb-6 font-black uppercase [text-shadow:_0_2px_10px_rgb(197_160_89_/_40%)]">
          PREMIUM VIRGIN HAIR
        </h4>
        
        <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] mb-8 font-bold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
          Embrace Your <br />
          <span className="text-[#C5A059] italic font-light [text-shadow:_0_0_30px_rgba(197,160_89,0.3)]">
            Natural Beauty
          </span>
        </h1>
        
        <p className="text-white text-base md:text-lg max-w-lg mb-12 font-medium leading-relaxed drop-shadow-md">
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
    className="flex items-center gap-4 px-8 py-4 border border-[#C5A059]/20 rounded-full hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-300 group bg-black/60 shadow-lg"
  >
    <span className="text-[#C5A059] group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-[10px] md:text-sm font-bold tracking-widest uppercase text-white">{label}</span>
  </a>
);

export default Hero;