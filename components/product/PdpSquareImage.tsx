import Image from 'next/image'

type Props = {
  src: string
  alt: string
  sizes: string
  width: number
  height: number
  priority?: boolean
  maxWidthClass?: string
  className?: string
}

/** صورة صفحة المنتج — أبعاد حقيقية + `object-contain` بدون `fill` ولا قصّ. */
export default function PdpSquareImage({
  src,
  alt,
  sizes,
  width,
  height,
  priority = false,
  maxWidthClass = 'max-w-full',
  className = '',
}: Props) {
  return (
    <div className={`mx-auto w-full ${maxWidthClass} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="mx-auto block h-auto w-full max-w-full rounded-2xl bg-[#faf9f8] object-contain object-center"
      />
    </div>
  )
}
