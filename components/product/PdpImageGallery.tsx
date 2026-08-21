'use client'

import { useState } from 'react'
import Image from 'next/image'

export type PdpGalleryImage = {
  src: string
  width: number
  height: number
  alt: string
}

export default function PdpImageGallery({
  images,
  accentColor,
}: {
  images: PdpGalleryImage[]
  accentColor: string
}) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]
  if (!current) return null

  return (
    <div className="flex flex-col gap-2.5">
      <div className="overflow-hidden rounded-2xl bg-[#faf9f8]">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
          className="mx-auto block h-auto w-full max-w-full object-contain object-center"
        />
      </div>
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {images.map((img, i) => {
          const selected = i === active
          return (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={img.alt}
              aria-current={selected}
              className="overflow-hidden rounded-xl border-2 bg-white p-0.5 transition active:scale-[0.98]"
              style={{
                borderColor: selected ? accentColor : `${accentColor}28`,
                boxShadow: selected ? `0 0 0 2px ${accentColor}33` : undefined,
              }}
            >
              <Image
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                sizes="80px"
                className="aspect-square h-auto w-full object-cover object-center"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
