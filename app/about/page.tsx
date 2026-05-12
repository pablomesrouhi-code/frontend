import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

export const metadata = {
  title: 'من نحن | نبتة لابو',
  description: 'نبتة لابو — مختبر تركيبات لمكملات غذائية على شكل علكات، بثقة وشفافية تليق بعميلتنا في السعودية.',
}

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-[#b8485c] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">N</div>
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-3">من نحن</h1>
          <p className="text-xl text-[#5c5656] max-w-2xl mx-auto leading-relaxed">
            نبتة لابو — مكملات يومية بصيغة علكة:{' '}
            <span className="text-[#2c5f63] font-semibold">جدية التركيبة</span>
            {' '}ولذّة التناول في روتين واحد
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div className="text-right">
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">فلسفتنا</h2>
            <p className="text-[#5c5656] leading-relaxed text-lg mb-4">
              نبتة لابو تختصر صورة «المكمّل اليومي» في شكل واحد يسهّل الالتزام: علكة وظيفية — ليس بديلاً عن الادّعاء الطبي، بل عن الفوضى والتشتّت بين منتجات كثيرة بلا هوية واضحة.
            </p>
            <p className="text-[#5c5656] leading-relaxed mb-4">
              نتحدّث بلغة قريبة من صيدلية في ما يهمّك: الشفافية، التسمية، الترخيص، وثبات الجودة — مع بقاء التجربة لطيفة ومناسبة لروتين المرأة السعودية.
            </p>
            <p className="text-[#5c5656] leading-relaxed">
              هدفنا أن تشعري أن اختيارك مدروس: تركيبة واضحة، وعد واقعي، وشراء مريح (دفع عند الاستلام وتأكيد قبل التوصيل).
            </p>
          </div>
          <ImagePlaceholder accentColor="#b8485c" bgColor="#f1e6e4" label="نبتة لابو" aspectRatio="4/3" />
        </div>

        <div className="bg-white rounded-3xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6 text-center">قيمنا</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: '🔬',
                title: 'تركيبات بمعايير',
                desc: 'نعتمد منطق المختبر: مكوّنات موثّقة، تركيبات يومية آمنة للاستخدام المنتظم حسب التعليمات.',
              },
              {
                icon: '📋',
                title: 'شفافية كاملة',
                desc: 'لا نخفي ما نبيع: مكمّل غذائي، مرخّص SFDA، ومعلومات واضحة في كل مكان تلمسينه في الموقع أو العبوّة.',
              },
              {
                icon: '🛡️',
                title: 'ثقة في الشراء',
                desc: 'دفع عند الاستلام وتأكيد قبل التوصيل — لتكوني مطمئنة قبل ما يصل الطلب.',
              },
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
