import PolicyLayout from '@/components/ui/PolicyLayout'
import { BRAND_CONTACT_EMAIL } from '@/lib/brand'
export const metadata = { title: 'الشروط والأحكام | نبتة لابو' }
export default function Terms() {
  return (
    <PolicyLayout title="الشروط والأحكام">
      <h2>القبول بالشروط</h2>
      <p>باستخدام موقع نبتة لابو وإجراء طلب، فإنك توافقين على هذه الشروط والأحكام.</p>
      <h2>المنتجات</h2>
      <p>منتجاتنا مكملات غذائية يومية وليست أدوية. لا تستخدمي المنتجات كبديل عن الرعاية الطبية المتخصصة.</p>
      <h2>الطلبات</h2>
      <p>يتم تأكيد كل طلب عبر الاتصال الهاتفي قبل التوصيل. نحتفظ بحق إلغاء الطلبات التي تتعذر الوصول إليها.</p>
      <h2>الأسعار</h2>
      <p>الأسعار المعروضة بالريال السعودي وتشمل ضريبة القيمة المضافة إذا انطبقت. نحتفظ بحق تغيير الأسعار دون إشعار مسبق.</p>
      <h2>التواصل</h2>
      <p>
        لأي استفسار:{' '}
        <a href={`mailto:${BRAND_CONTACT_EMAIL}`} className="text-primary hover:underline">
          {BRAND_CONTACT_EMAIL}
        </a>
      </p>
    </PolicyLayout>
  )
}
