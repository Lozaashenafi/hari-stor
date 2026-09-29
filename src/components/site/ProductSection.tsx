'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

// Static content — swap these paths for any images in /public
const ESSENTIALS = [
  { src: '/image/1.png', name: 'Full Lace Front Wig', price: '$815.00' },
  { src: '/image/2.PNG', name: 'Deep Wave 100% Raww Human Hair Bundles', price: '$200.00' },
  { src: '/image/3.PNG', name: 'Classic Clip-In Wigs', price: '$480.00' },
  { src: '/image/4.PNG', name: 'V Part Wig', price: '$530.00' },
]

export default function ProductSection() {
  return (
    <section id="products" className="relative bg-black py-24 px-6 border-t border-[#C5A059]/10">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-[#C5A059]/10 pb-10">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-gray-300 block">
              Premium Collections
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#C5A059] uppercase tracking-wider">
              The Essentials
            </h2>
          </div>

          <Link
            href="/products"
            className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            Explore All Collections <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </header>

        {/* --- STATIC 4-IMAGE GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
          {ESSENTIALS.map((item) => (
            <div key={item.src} className="group flex flex-col">

              {/* Image Container */}
              <div className="aspect-square overflow-hidden bg-white mb-5 relative transition-all">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="text-center space-y-2 px-1">
                <h3 className="text-[#C5A059] text-[14px] md:text-[16px] font-normal leading-snug">
                  {item.name}
                </h3>
                <p className="text-white text-[15px] md:text-[18px] font-bold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-16 text-center md:hidden">
          <Link
            href="/products/wigs"
            className="inline-block px-10 py-4 border border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-widest font-bold"
          >
            View Vault
          </Link>
        </div>
      </div>
    </section>
  )
}
