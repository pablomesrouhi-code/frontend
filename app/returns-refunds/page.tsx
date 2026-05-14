import PolicyLayout from '@/components/ui/PolicyLayout'
import { CONTACT_EMAIL } from '@/lib/site'
export const metadata = { title: 'الإرجاع والاسترداد | نبتة لابو' }
export default function ReturnsRefunds() {
  return (
    <PolicyLayout title="سياسة الإرجاع والاسترداد">
      <h2>شروط الإرجاع</h2>
      <p>يمكن إرجاع المنتجات غير المفتوحة خلال 7 أيام من تاريخ الاستلام.</p>
      <h2>المنتجات المفتوحة</h2>
      <p>لا يمكن استرداد المنتجات المفتوحة أو المستخدمة لاعتبارات الصحة والسلامة، إلا في حالة وجود عيب تصنيعي.</p>
      <h2>كيفية طلب الإرجاع</h2>
      <p>
        للتواصل بشأن الإرجاع:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-authority underline-offset-2 hover:underline">
          {CONTACT_EMAIL}
        </a>{' '}
        — يرجى ذكر رقم الطلب وسبب الإرجاع.
      </p>
      <h2>الاسترداد</h2>
      <p>بعد استلام المنتج والتحقق منه، يتم إجراء الاسترداد خلال 5-7 أيام عمل.</p>
    </PolicyLayout>
  )
}
