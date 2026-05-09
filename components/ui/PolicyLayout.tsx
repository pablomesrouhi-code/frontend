export default function PolicyLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-8 pb-4 border-b border-gray-200">{title}</h1>
        <div className="bg-white rounded-2xl p-8 shadow-sm prose prose-sm max-w-none text-[#5c5656] leading-relaxed [&_h2]:text-[#1C1C1C] [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-6 [&_h2]:mb-3">
          {children}
        </div>
      </div>
    </div>
  )
}
