import PolicyLayout from '@/components/ui/PolicyLayout'
import { CONTACT_EMAIL } from '@/lib/site'
export const metadata = { title: 'سياسة الخصوصية | نبتة لابو' }
export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="سياسة الخصوصية">
      <h2>جمع المعلومات</h2>
      <p>نجمع اسمك ورقم جوالك فقط لأغراض تأكيد الطلب والتوصيل. لا نجمع بيانات الدفع لأننا نعمل بنظام الدفع عند الاستلام.</p>
      <h2>استخدام المعلومات</h2>
      <p>تُستخدم بياناتك حصراً للتواصل معكِ لتأكيد طلبك وترتيب التوصيل.</p>
      <h2>مشاركة المعلومات</h2>
      <p>لا نشارك بياناتك مع أطراف ثالثة باستثناء شركات الشحن اللازمة لإتمام التوصيل.</p>
      <h2>ملفات تعريف الارتباط والتتبع</h2>
      <p>نستخدم أدوات تتبع إعلانية (Meta Pixel, TikTok Pixel, Snapchat Pixel) لتحسين إعلاناتنا. هذه الأدوات لا تجمع معلومات شخصية مرتبطة بهويتك.</p>
      <h2>التواصل</h2>
      <p>
        لأي استفسار عن خصوصيتك تواصلي معنا على:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-authority underline-offset-2 hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </PolicyLayout>
  )
}
