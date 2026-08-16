// components/site/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCompanyProfile } from '@/services/company.service';
import Logo from '../../../public/logo.jpg';
import MobileMenu from './MobileMenu';
import { Search, User, ShoppingCart } from 'lucide-react';

const Navbar = async () => {
  const profile = await getCompanyProfile();

  const waNumber = profile?.whatsapp?.replace(/\D/g, '') || '';
  const waLink = waNumber ? `https://wa.me/${waNumber}` : '/';
  
  const categories = [
    { name: 'HOME', href: '/' },
    { name: 'WIGS', href: '/products/wigs' },
    { name: 'BUNDLES', href: '/products/bundles' },
    { name: 'CLIP INS', href: '/products/clip-ins' },
    { name: 'PONYTAIL', href: '/products/ponytail' },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-black border-b border-[#C5A059]/20 w-full">
      
      {/* ============================== */}
      {/* DESKTOP LEFT: Logo             */}
      {/* ============================== */}
      <Link href="/" className="hidden lg:flex flex-col items-center group">
        <Image 
          src={Logo} 
          alt="Logo" 
          className="h-10 md:h-12 w-auto object-contain" 
        />
        <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-[#C5A059] font-medium mt-1 uppercase text-center">
          {profile?.name || "SHALLY LUXE"}
        </span>
      </Link>

      {/* ============================== */}
      {/* MOBILE LEFT: Sambusa Menu      */}
      {/* ============================== */}
      <div className="lg:hidden flex items-center text-[#C5A059]">
        <MobileMenu />
      </div>

      {/* ============================== */}
      {/* MOBILE CENTER: Logo            */}
      {/* ============================== */}
      {/* Absolute positioning guarantees it stays perfectly centered on mobile */}
      <div className="lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/" className="flex flex-col items-center group">
          <Image 
            src={Logo} 
            alt="Logo" 
            className="h-10 w-auto object-contain" 
          />
          <span className="text-[9px] tracking-[0.2em] text-[#C5A059] font-medium mt-1 uppercase text-center whitespace-nowrap">
            {profile?.name || "SHALLY LUXE"}
          </span>
        </Link>
      </div>

      {/* ============================== */}
      {/* DESKTOP CENTER: Links          */}
      {/* ============================== */}
      <div className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.15em] font-medium text-[#C5A059]">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="hover:text-white transition-colors duration-300">
            {cat.name}
          </Link>
        ))}
      </div>

      {/* ============================== */}
      {/* RIGHT: Icons & Cart            */}
      {/* ============================== */}
      <div className="flex items-center space-x-5 md:space-x-6 text-[#C5A059]">
        {/* Hide Search and User icons on mobile, show on large screens */}
        <Link href="/search" className="hidden lg:block hover:text-white transition">
          <Search size={18} />
        </Link>
        <Link href="/login" className="hidden lg:block hover:text-white transition">
          <User size={18} />
        </Link>
        
        {/* Cart stays visible on BOTH mobile and desktop */}
        <Link href={waLink} target={waNumber ? "_blank" : undefined} rel="noopener noreferrer" className="text-[#C5A059] hover:text-white transition">
          <ShoppingCart className="cursor-pointer" size={20} />
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;