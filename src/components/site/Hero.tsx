import React from 'react';
import Link from 'next/link';
import { getCompanyProfile } from '@/services/company.service';
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
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* --- ENHANCED GOLDEN BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Large Primary Golden Glow (Top Right) */}
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] rounded-full bg-[#C5A059]/30 blur-[150px]" />
        
        {/* Secondary Amber Wash (Center Left) */}
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[70%] rounded-full bg-[#5a3e00]/40 blur-[130px]" />
        
        {/* Warm Bottom Accents */}
        <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#C5A059]/10 blur-[100px]" />

        {/* Subtle Noise Texture to make it look expensive */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Header / Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-16 border-b border-white/5 backdrop-blur-md bg-black/20">
        <Link href="/" className="flex items-center gap-4 group">
          <img 
            src={Logo.src} 
            alt="Luxe Logo" 
            className="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-105 rounded-full border border-[#C5A059]/30" 
          />
          <div className="hidden sm:block text-xl md:text-2xl font-bold tracking-[0.3em] text-[#C5A059] uppercase">
            {profile?.name || "LUXE HAIR"}
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10 text-[11px] uppercase tracking-[0.2em] font-light">
          <Link href="/" className="hover:text-[#C5A059] transition text-white">Home</Link>
          <Link href="/products" className="hover:text-[#C5A059] transition">Products</Link>
          <Link href="/gallery" className="hover:text-[#C5A059] transition">Gallery</Link>
          <Link href="#contact" className="hover:text-[#C5A059] transition text-nowrap">Contact Us</Link>
          
          <Link 
            href="/login" 
            className="flex items-center gap-2 border border-[#C5A059]/40 px-5 py-2 rounded-full hover:bg-[#C5A059] hover:text-black transition duration-300"
          >
            <Icons.User />
            <span className="text-[10px] tracking-widest font-bold">Admin</span>
          </Link>
        </div>
        <MobileMenu />
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center h-[calc(100vh-100px)] px-8 md:px-16 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 w-fit mb-8 backdrop-blur-xl">
           <span className="text-[#C5A059] animate-pulse text-lg">✦</span>
           <span className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Premium Hair Collection</span>
        </div>
        
        <h1 className="font-serif text-7xl md:text-[10rem] leading-[0.85] mb-8 font-bold text-white tracking-tighter">
          Luxurious <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C5A059] to-[#8b6b23]">Hair,</span>
        </h1>
        
        <p className="text-gray-300 text-base md:text-xl max-w-lg mb-12 font-light leading-relaxed drop-shadow-md">
          Step into the vault of ShallyLuxe. Discover our curated collection of 100% human hair extensions designed for the woman who demands excellence.
        </p>

        {/* Social Links */}
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

      {/* Decorative Gold Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-[#C5A059] to-transparent"></div>
    </div>
  );
};

const SocialButton = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 px-8 py-4 border border-[#C5A059]/20 rounded-full hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-500 group bg-black/40 backdrop-blur-md"
  >
    <span className="text-[#C5A059] group-hover:scale-125 transition-transform duration-500">{icon}</span>
    <span className="text-[10px] md:text-xs font-black tracking-widest uppercase text-gray-100">{label}</span>
  </a>
);

export default Hero;