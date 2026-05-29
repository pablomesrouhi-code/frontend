import { BRAND_CONTACT_EMAIL } from '@/lib/brand'

export const metadata = { title: 'اتصل بنا | نبتة لابو' }

export default function ContactPage() {
  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-3">اتصل بنا</h1>
          <p className="text-[#5c5656] text-lg">
            فريق الدعم متاح لأسئلتكِ عن الطلب، التسمية وفق تصنيف المكمّل، والاستخدام وفق التعليمات — من دون اعتبارنا نقطة دواء تشخّص أو تصف.
          </p>
        </div>
        <div className="bg-white rounded-3xl border border-border/45 p-8 shadow-[0_4px_28px_-10px_rgba(26,25,21,0.07)] ring-1 ring-black/[0.02] sm:p-10 mb-8">
          <div className="flex flex-col gap-5">
            {[
              { icon: '📧', label: 'البريد الإلكتروني', val: BRAND_CONTACT_EMAIL, href: `mailto:${BRAND_CONTACT_EMAIL}` },
              { icon: '🌐', label: 'الموقع الإلكتروني', val: 'nabtalabo.store', href: 'https://nabtalabo.store' },
              { icon: '🚚', label: 'التوصيل', val: 'جميع مناطق المملكة العربية السعودية' },
              { icon: '⏰', label: 'أوقات العمل', val: 'الأحد - الخميس، 9 صباحاً - 6 مساءً' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div>
                  <p className="text-sm text-[#5c5656]">{c.label}</p>
                  <p className="font-semibold text-[#1C1C1C]">
                    {'href' in c && c.href ? (
                      <a href={c.href} className="hover:text-[#b8485c] transition-colors">
                        {c.val}
                      </a>
                    ) : (
                      c.val
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#f1e6e4] rounded-2xl border border-[#e8dcd7]/80 p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
          <p className="font-bold text-[#b8485c] mb-1">هل لديكِ سؤال عن طلبك؟</p>
          <p className="text-sm text-[#5c5656]">إذا كنتِ تنتظرين تأكيد طلبك، سيتواصل معكِ فريقنا قريباً. تأكدي من إبقاء جوالك قريباً.</p>
        </div>
      </div>
    </div>
  )
}
