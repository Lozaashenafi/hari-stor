'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'WIGS', href: '/products/wigs' },
    { name: 'BUNDLES', href: '/products/bundles' },
    { name: 'CLIP INS', href: '/products/clip-ins' },
    { name: 'PONYTAIL', href: '/products/ponytail' },
    { name: 'ACCOUNT', href: '/login' },
  ];

  return (
    <div className="lg:hidden ml-4">
      {/* OPEN BUTTON */}
      <button onClick={() => setIsOpen(true)} className="p-1 text-[#C5A059]">
        <Menu size={28} />
      </button>

      {/* SIDEBAR PANEL */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-[#EAEAEA] z-[999] transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-4 text-zinc-500"
        >
          <X size={24} />
        </button>

        <div className="p-6 pt-12">
          {/* SEARCH BAR (Matching UI) */}
          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Search our store"
              className="w-full bg-white border border-zinc-200 py-3 px-4 pr-10 text-sm focus:outline-none text-zinc-600"
            />
            <Search className="absolute right-3 top-3 text-zinc-400" size={18} />
          </div>

          {/* LINKS */}
          <nav className="flex flex-col space-y-5">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-zinc-700 text-lg font-normal tracking-wide hover:text-black transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 flex flex-col space-y-4 border-t border-zinc-300">
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="text-zinc-600 text-base"
              >
                Log in
              </Link>
             
            </div>
          </nav>
        </div>
      </div>

      {/* DIMMER */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MobileMenu;