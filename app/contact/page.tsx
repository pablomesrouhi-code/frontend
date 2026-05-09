export const metadata = { title: 'اتصل بنا | نبتة لابو' }

export default function ContactPage() {
  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1C1C1C] mb-3">اتصل بنا</h1>
          <p className="text-[#5c5656] text-lg">نحن هنا للمساعدة في أي استفسار</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex flex-col gap-5">
            {[
              { icon: '📧', label: 'البريد الإلكتروني', val: 'hello@NabtaLabo.store' },
              { icon: '🌐', label: 'الموقع الإلكتروني', val: 'NabtaLabo.store' },
              { icon: '🚚', label: 'التوصيل', val: 'جميع مناطق المملكة العربية السعودية' },
              { icon: '⏰', label: 'أوقات العمل', val: 'الأحد - الخميس، 9 صباحاً - 6 مساءً' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div>
                  <p className="text-sm text-[#5c5656]">{c.label}</p>
                  <p className="font-semibold text-[#1C1C1C]">{c.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#f1e6e4] rounded-2xl p-6 text-center">
          <p className="font-bold text-[#b8485c] mb-1">هل لديكِ سؤال عن طلبك؟</p>
          <p className="text-sm text-[#5c5656]">إذا كنتِ تنتظرين تأكيد طلبك، سيتواصل معكِ فريقنا قريباً. تأكدي من إبقاء جوالك قريباً.</p>
        </div>
      </div>
    </div>
  )
}
