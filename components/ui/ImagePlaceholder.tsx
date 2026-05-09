type Props = {
  accentColor?: string
  bgColor?: string
  label?: string
  className?: string
  aspectRatio?: string
}

export default function ImagePlaceholder({
  accentColor = '#b8485c',
  bgColor = '#FFFFFF',
  label = 'نبتة لابو',
  className = '',
  aspectRatio = '4/3',
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl flex items-center justify-center ${className}`}
      style={{ background: bgColor, aspectRatio }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
        style={{ background: accentColor }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15"
        style={{ background: accentColor }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full opacity-10"
        style={{ background: accentColor }}
      />
      {/* Center icon */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
          style={{ background: accentColor }}
        >
          N
        </div>
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full text-white"
          style={{ background: accentColor }}
        >
          {label}
        </span>
        <span className="text-xs text-gray-400">صورة المنتج قريباً</span>
      </div>
    </div>
  )
}
