'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // This stops the page from reloading
    if (localSearch.trim()) {
      setIsOpen(false); // Close the menu sidebar
      router.push(`/search?q=${encodeURIComponent(localSearch.trim())}`);
    }
  };

  const menuItems = [
    { name: 'HOME', href: '/' },
    { name: 'WIGS', href: '/products/wigs' },
    { name: 'BUNDLES', href: '/products/bundles' },
    { name: 'CLIP INS', href: '/products/clip-ins' },
    { name: 'PONYTAIL', href: '/products/ponytail' },
    { name: 'login', href: '/login'}
  ];

  return (
    <div className="lg:hidden mr-auto flex items-center">
      <button onClick={() => setIsOpen(true)} className="p-1 text-[#C5A059]">
        <Menu size={28} />
      </button>

      <div className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-[#EAEAEA] z-[999] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-500">
          <X size={24} />
        </button>

        <div className="p-6 pt-12">
          {/* MOBILE SEARCH FORM */}
          <form onSubmit={handleSearchSubmit} className="relative mb-8">
            <input
              type="text"
              placeholder="Search our store"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white border border-zinc-300 py-3 px-4 pr-10 text-black focus:outline-none"
            />
            <button type="submit" className="absolute right-3 top-3 text-zinc-400">
              <Search size={18} />
            </button>
          </form>

          <nav className="flex flex-col space-y-5">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-zinc-700 text-lg">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/40 z-[998]" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default MobileMenu;