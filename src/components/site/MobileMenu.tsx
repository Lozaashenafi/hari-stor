'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* OPEN BUTTON */}
      <button onClick={() => setIsOpen(true)} className="p-2 text-[#C5A059]">
        <Menu size={30} />
      </button>

      {/* SIDEBAR PANEL */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-[#111] z-[999] p-6 transform transition-transform duration-300 border-l border-zinc-800 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* CLOSE BUTTON */}
        <div className="flex justify-end mb-8">
          <button onClick={() => setIsOpen(false)} className="text-white">
            <X size={30} />
          </button>
        </div>

        {/* LINKS */}
        <nav className="flex flex-col gap-6">
          <Link 
            href="/products" 
            onClick={() => setIsOpen(false)}
            className="text-white text-xl font-bold"
          >
            Collections
          </Link>
          
          <Link 
            href="/gallery" 
            onClick={() => setIsOpen(false)}
            className="text-white text-xl font-bold"
          >
            Gallery
          </Link>

          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className="bg-[#C5A059] text-black text-center py-3 rounded font-bold mt-4"
          >
            Admin Access
          </Link>
        </nav>
      </div>

      {/* DIMMER (Click outside to close) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[998]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MobileMenu;