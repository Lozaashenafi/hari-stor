// components/site/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { getCompanyProfile } from '@/services/company.service';
import Logo from '../../../public/logo.jpg';
import MobileMenu from './MobileMenu';
import { Search, User, ShoppingCart } from 'lucide-react';

const Navbar = async () => {
  const profile = await getCompanyProfile();
  
  const categories = [
    { name: 'HOME', href: '/' },
    { name: 'WIGS', href: '/products/wigs' },
    { name: 'BUNDLES', href: '/products/bundles' },
    { name: 'CLIP INS', href: '/products/clip-ins' },
    { name: 'PONYTAIL', href: '/products/ponytail' },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-black border-b border-[#C5A059]/20 w-full">
      {/* Left: Logo Section */}
      <Link href="/" className="flex flex-col items-center group">
        <img 
          src={Logo.src} 
          alt="Logo" 
          className="h-10 md:h-12 w-auto object-contain" 
        />
        <span className="text-[9px] md:text-[10px] tracking-[0.2em] text-[#C5A059] font-medium mt-1 uppercase text-center">
          {profile?.name || "SHALLY LUXE"}
        </span>
      </Link>
      
      {/* Center: Navigation Links */}
      <div className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.15em] font-medium text-[#C5A059]">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="hover:text-white transition-colors duration-300">
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-6 text-[#C5A059]">
        <Search className="cursor-pointer hover:text-white transition" size={18} />
        <Link href="/login" className="hover:text-white transition"><User size={18} /></Link>
        <ShoppingCart className="cursor-pointer hover:text-white transition" size={18} />
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;