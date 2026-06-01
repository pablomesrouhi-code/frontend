import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'من نحن | نبتة لابو',
  description:
    'من نبتة لابو: علكة بوظيفة مكمّل غذائي، بحضور يقترب من صيدلية الثقة في الوضوح والترخيص — لكننا لسنا نقطة تشخّص أو وصف؛ مكمّل غذائي فقط وفق تصريح SFDA.',
}

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-start mb-12">
          <div className="relative z-10 inline-flex flex-col items-center justify-center mx-auto mb-5 rounded-3xl border border-[#e8f1f2]/90 bg-white px-8 py-6 shadow-[0_8px_36px_-14px_rgba(20,107,112,0.12)] ring-1 ring-black/[0.025]">
            <Image
              src="/nabta-lab-brand.png"
              alt="نبتة لابو — بحضور يقترب من صيدلية الثقة"
              width={360}
              height={160}
              priority
              className="h-16 sm:h-[4.75rem] w-auto max-w-[280px] object-contain mx-auto"
            />
            <p className="mt-3 text-sm font-bold text-[#146b70] leading-snug max-w-xs">
              هنا بتجربة تقترب من صيدلية الثقة
            </p>
            <p className="mt-2 text-[11px] text-[#5c5656] leading-relaxed max-w-sm">
              مكمّل غذائي على شكل علكة، مرخّص SFDA — ليس نقطة تشخّص أو وصف دوري دوائي.
            </p>
          </div>
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-3">من نحن</h1>
          <p className="text-xl text-[#5c5656] max-w-2xl mx-auto leading-relaxed">
            نبتة لابو — نتحدّث معكِ كلغة نقطة اعتماد:{' '}
            <span className="text-[#146b70] font-semibold">مكمّل غذائي مرخّص وعلى هيئة علكة</span>
            {' '}بحيث تبقى اللذعة حافزًا وليس طرفًا لتجاوز حدّ المنتج.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start mb-14">
          <div className="text-start md:sticky md:top-24 md:self-start md:order-2 order-2">
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">لماذا نقول «بحضور يقترب من صيدلية»؟</h2>
            <p className="text-[#5c5656] leading-relaxed text-lg mb-4">
              نحن لا نصف علاجًا ولا نستبدل صيدليًا؛ لكننا نعتمد نفس الانضباط في ما يمكن قوله عن المكمّل، وفق الغلاف والتعليمات — على عكس المتاجر التي تبيع العلكة كتحفّة تسويقية دون كلمة تصنيف واضحة.
            </p>
            <p className="text-[#5c5656] leading-relaxed mb-4">
              عميلتنا المثالية امرأة في السعودية تختار وفق تصنيف واضح، تنتظر اسمًا على غلافٍ موسوم وفق المتعارف على المكمّلات، ولها صبر على روتين — وتريد تجربة شراء مهنية بدون بطاقات.
            </p>
            <p className="text-[#5c5656] leading-relaxed">
              دفع عند الاستلام وتأكيد بشري قبل الشحن؛ أسلوب نقطة ثقة حيث ترين المنتج وترخيصه قبل الدفع بالكامل.
            </p>
          </div>
          <div className="order-1 md:order-1 relative z-20 flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-3xl border-2 border-[#cce7ea]/90 bg-gradient-to-br from-[#eaf3f4] to-white p-8 shadow-[0_10px_40px_-16px_rgba(20,107,112,0.14)] ring-1 ring-black/[0.02] sm:p-10">
              <Image
                src="/nabta-lab-brand.png"
                alt="شعار نبتة لابو"
                width={400}
                height={180}
                className="w-full h-auto object-contain"
              />
              <p className="mt-6 text-center text-sm font-semibold text-[#146b70] leading-relaxed border-t border-[#cce7ea] pt-5">
                نبتة لابو تجمع بين لمسة المتجر وحضور تنتظرين منه نقطة اعتماد
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-30 -mt-4 md:-mt-6 rounded-3xl border border-[#e0dcd9]/90 bg-[#faf9f8] p-8 shadow-[0_4px_28px_-10px_rgba(26,25,21,0.07)] ring-1 ring-black/[0.02] mb-10 sm:p-9">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 text-start">لماذا العلكة؟</h2>
          <p className="text-[#5c5656] text-start leading-relaxed max-w-2xl mb-8">
            لأن جزءًا كبيرًا من الفائدة في المكمّل هو الاستمرار، والعلكة اليومية تخفّف عنكِ عائق النسيان — بينما المحتوى يبقى ما هو: مكمّل غذائي بضوابط الغذاء والدواء، لا حلويات «صحّية» بلا اسم تصنيف.
          </p>
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 text-start">قيمنا</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: '🏥',
                title: 'حدود مهنية كالصيدلية',
                desc: 'ما يُقال وفق تصنيف المكمّل فقط؛ الإحالة للطبيب عند الحاجة؛ لا ادّعاء علاج خارج النطاق.',
              },
              {
                icon: '📋',
                title: 'شفافية كاملة',
                desc: 'ترخيص SFDA ظاهر؛ التسويق لا يتخطّى ما هو مذكور على الغلاف المعتمَد.',
              },
              {
                icon: '🛡️',
                title: 'ثقة قبل الدفع الكامل',
                desc: 'تأكيد قبل التوصيل ودفع عند الاستلام — لتقييمي كما أمام نقطة دواء قبل الإغلاق.',
              },
            ].map((v) => (
              <div key={v.title} className="text-center bg-white rounded-2xl p-5 border border-[#eae5e3] shadow-sm">
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
            تسوقي بثقة نبتة لابو
          </Link>
        </div>
      </div>
    </div>
  )
}
