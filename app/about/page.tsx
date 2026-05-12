import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export const metadata = {
  title: 'من نحن | نبتة لابو',
  description:
    'من نبتة لابو: علكة بوظيفة مكمّل غذائي، بسلطة تقترب من صيدلية الثقة في الوضوح والترخيص — للعملاء الذين لا يريدون تسويق «حلوى صحّية».',
}

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-md"
            style={{ background: 'linear-gradient(135deg, #146b70 0%, #0f5257 100%)' }}
          >
            N
          </div>
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-3">من نحن</h1>
          <p className="text-xl text-[#5c5656] max-w-2xl mx-auto leading-relaxed">
            نبتة لابو — نتحدّث معكِ كلغة نقطة اعتماد:{' '}
            <span className="text-[#146b70] font-semibold">مكمّل غذائي مرخّص وعلى هيئة علكة</span>
            {' '}بحيث تبقى اللذعة حافزًا وليس طرفًا لتجاوز حدّ المنتج.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div className="text-right order-2 md:order-1">
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">لماذا «سلطة صيدلية»؟</h2>
            <p className="text-[#5c5656] leading-relaxed text-lg mb-4">
              نحن لا نصف علاجًا ولا نستبدل صيدليًا؛ لكن نملأ الفراغ بين المتاجر التي تعامل العلكة كتحفّة تسويقية وبين المتاجر الإلكترونية التي تغرّ بوعود خارج حدّ المكمّل.
            </p>
            <p className="text-[#5c5656] leading-relaxed mb-4">
              عميلتنا المثالية امرأة في السعودية تختار وفق تصنيف واضح، تنتظر اسمًا على غلافٍ موسوم وفق المتعارف على المكمّلات، ولها صبر على روتين — وتريد تجربة شراء مهنية بدون بطاقات.
            </p>
            <p className="text-[#5c5656] leading-relaxed">
              نفعّل دفعًا عند الاستلام وتأكيدًا بشريًا لأنهما يقيمان نفس الانضباط الذي تتوقعينه عند نقطة لا تبيع «مزاجًا» قبل منتجًا.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <ImagePlaceholder accentColor="#146b70" bgColor="#eaf3f4" label="نبتة لابو · سلطة مكمّل" aspectRatio="4/3" />
          </div>
        </div>

        <div className="bg-[#faf9f8] rounded-3xl p-8 mb-10 border border-[#e0dcd9]">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 text-center">لماذا العلكة؟</h2>
          <p className="text-[#5c5656] text-center leading-relaxed max-w-2xl mx-auto mb-8">
            لأن جزءًا كبيرًا من الفائدة في المكمّل هو الاستمرار، والعلكة اليومية تخفّف عنكِ عائق النسيان — بينما المحتوى يبقى ما هو: مكمّل غذائي بضوابط الغذاء والدواء.
          </p>
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 text-center">قيمنا</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: '🏥',
                title: 'حدود مهنية واضحة',
                desc: 'منطق نقطة اعتماد: ما يُقال وفق تصنيف المكمّل فقط؛ والإحالة إلى الطبيب عند احتياج حقيقي.',
              },
              {
                icon: '📋',
                title: 'شفافية كاملة',
                desc: 'ترخيص SFDA ظاهر، والتسويق لا يغرّ بتجاوز ادّعاءات خارج المنتج المذكورة على الغلاف المعتمَد.',
              },
              {
                icon: '🛡️',
                title: 'ثقة في الشراء',
                desc: 'دفع عند الاستلام وتأكيد قبل التوصيل — لتقييمي قبل أن تدفعي، كما تقاربين صيدليًا موثوقًا.',
              },
            ].map((v) => (
              <div key={v.title} className="text-center bg-white rounded-2xl p-5 border border-[#eae5e3]">
                <div className="text-3xl mb-2">{v.icon}</div>
                <h3 className="font-bold text-[#1C1C1C] mb-1">{v.title}</h3>
                <p className="text-sm text-[#5c5656] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-lg text-white transition-colors shadow-lg hover:opacity-95"
            style={{
              background: 'linear-gradient(135deg, #146b70 0%, #b8485c 85%)',
              boxShadow: '0 10px 30px rgba(20,107,112,0.25)',
            }}
          >
            تسوقي بثقة مختبر نبتة لابو
          </Link>
        </div>
      </div>
    </div>
  )
}
