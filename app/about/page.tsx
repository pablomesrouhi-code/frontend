import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export const metadata = { title: 'من نحن | نبتة لابو', description: 'تعرفي على قصة نبتة لابو وفلسفتنا في دعم روتين المرأة اليومي.' }

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-[#b8485c] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">N</div>
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-3">من نحن</h1>
          <p className="text-xl text-[#5c5656]">نبتة لابو — علكات يومية لروتين أجمل، أخف، وأهدأ</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div className="text-right">
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">فلسفتنا</h2>
            <p className="text-[#5c5656] leading-relaxed text-lg mb-4">
              نبتة لابو وُلدت من فكرة بسيطة: لماذا يجب أن يكون روتين العناية معقداً؟
            </p>
            <p className="text-[#5c5656] leading-relaxed mb-4">
              نؤمن أن كل امرأة تستحق روتيناً يومياً بسيطاً يدعم جمالها من الداخل، ويمنحها إحساساً بالخفة والهدوء — بدون عبوات معقدة أو جداول تناول مرهقة.
            </p>
            <p className="text-[#5c5656] leading-relaxed">
              لهذا صممنا علكاتنا الوظيفية: لذيذة، سهلة، وتدخل في يومك بدون أي تعقيد.
            </p>
          </div>
          <ImagePlaceholder accentColor="#b8485c" bgColor="#f1e6e4" label="نبتة لابو" aspectRatio="4/3" />
        </div>

        <div className="bg-white rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 text-center">قيمنا</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: '🌿', title: 'مكونات مدروسة', desc: 'نختار المكونات بعناية لدعم احتياجاتك اليومية.' },
              { icon: '❤️', title: 'مصممة لكِ', desc: 'نفكر في المرأة السعودية وروتينها وأولوياتها.' },
              { icon: '🛡️', title: 'ثقة واضحة', desc: 'دفع عند الاستلام، وتأكيد قبل التوصيل دائماً.' },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="text-3xl mb-2">{v.icon}</div>
                <h3 className="font-bold text-[#1C1C1C] mb-1">{v.title}</h3>
                <p className="text-sm text-[#5c5656]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/products" className="bg-[#b8485c] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#943c50] transition-colors">
            تسوقي منتجاتنا
          </Link>
        </div>
      </div>
    </div>
  )
}
