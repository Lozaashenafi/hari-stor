'use client'
import { useState } from 'react'
import Image from 'next/image'

interface GalleryImageCardProps {
  src: string
  alt: string
  sizes: string
  className?: string
}

/**
 * Gallery image that renders in black & white and comes to full color when
 * the user hovers over it OR taps/clicks it (so touch devices get the same
 * effect). Toggling back happens on mouse-out or a second tap. Keyboard
 * accessible via Enter/Space.
 */
export default function GalleryImageCard({ src, alt, sizes, className = '' }: GalleryImageCardProps) {
  const [colored, setColored] = useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={colored}
      aria-label={`${alt} — activate to view in full color`}
      onClick={() => setColored((c) => !c)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setColored((c) => !c)
        }
      }}
      onMouseEnter={() => setColored(true)}
      onMouseLeave={() => setColored(false)}
      className={`absolute inset-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover transition-all duration-700 ${colored ? 'grayscale-0 scale-105' : 'grayscale'}`}
      />
    </div>
  )
}
