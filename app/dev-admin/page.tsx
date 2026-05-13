import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  allowLocalFastapiProxy,
  backendInternalBase,
} from '@/lib/backendProxy'

export const dynamic = 'force-dynamic'

function devAdminDirectUrl(): string {
  const o =
    process.env.NEXT_PUBLIC_DEV_ADMIN_ORIGIN?.trim() ||
    'http://127.0.0.1:8000'
  return `${o.replace(/\/+$/, '')}/api/admin`
}

/**
 * صفحة تطوير: أسرع وأوثق طريقة لرؤية لوحة الإدارة هي فتح عنوان FastAPI مباشرة.
 */
export default function DevAdminHubPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  const directUrl = devAdminDirectUrl()
  const relayOrigin = backendInternalBase()
  const relayOk = allowLocalFastapiProxy()

  return (
    <div className="mx-auto max-w-xl px-4 py-10 text-right">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-authority)]">
        وضع التطوير فقط
      </p>
      <h1 className="mb-3 text-xl font-bold text-[var(--color-charcoal)]">
        فتح لوحة الإدارة
      </h1>
      <p className="mb-6 text-[15px] leading-relaxed text-[var(--color-muted)]">
        إن لم يعمل الرابط الثاني هنا تحت المتجر، افتح هذا الرابط الأول — هو نفسه الـ{' '}
        <span className="font-mono text-[13px]">FastAPI</span> خارج Next، وبالتالي ما
        كيعتمدش على أي بروكسي.
      </p>

      <div className="mb-6 space-y-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
        <a
          href={directUrl}
          className="block w-full rounded-xl bg-[var(--color-authority)] px-4 py-3 text-center text-[15px] font-semibold text-white no-underline transition hover:opacity-[0.93]"
          target="_blank"
          rel="noopener noreferrer"
        >
          افتح لوحة الإدارة مباشرة (موصى به)
        </a>
        <p className="text-center text-[12px] text-[var(--color-muted)]">
          <span className="font-mono break-all">{directUrl}</span>
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-dashed border-[var(--color-border)] bg-[#fafafa] p-4">
        <p className="mb-3 text-[14px] font-semibold text-[var(--color-charcoal)]">
          بديلاً: عبر منفذ Next (يسمح بتجربة نفس المصدر مع الكعكات)
        </p>
        {relayOk ? (
          <Link
            href="/api/admin"
            className="inline-block rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-[14px] font-semibold text-[var(--color-charcoal)] hover:bg-[var(--color-peach-tint)]"
          >
            افتح `/api/admin` عبر النكست
          </Link>
        ) : (
          <p className="text-[13px] text-[var(--color-muted)] leading-relaxed">
            البروكسي معطّل — شغّل <span className="font-mono">next dev</span> أو ضع{' '}
            <span className="font-mono">NEXT_PUBLIC_USE_LOCAL_API=true</span> أو{' '}
            <span className="font-mono">ADMIN_PROXY_FORCE=1</span>.
          </p>
        )}
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--color-muted)]">
          الرحيل إلى الـ backend حسب Next:{' '}
          <span className="break-all">{relayOrigin}</span>
        </p>
      </div>

      <details className="rounded-xl border border-[var(--color-border)] bg-white p-3 text-[13px] text-[var(--color-muted)]">
        <summary className="cursor-pointer font-semibold text-[var(--color-charcoal)]">
          تأكّد من القائمة
        </summary>
        <ul className="mr-5 mt-2 list-disc space-y-2 leading-relaxed">
          <li>
            الـ API شغّال:{' '}
            <span className="font-mono">uvicorn app.main:app --reload</span>
          </li>
          <li>
            <span className="font-mono">DATABASE_URL</span> +{' '}
            <span className="font-mono">ADMIN_USERNAME</span> ،{' '}
            <span className="font-mono">ADMIN_PASSWORD</span> ،{' '}
            <span className="font-mono">ADMIN_SESSION_SECRET</span>
          </li>
          <li>
            عنوان الرابط الأول يضبطه{' '}
            <span className="font-mono">NEXT_PUBLIC_DEV_ADMIN_ORIGIN</span>؛ عنوان
            رحيل Next يضبطه <span className="font-mono">BACKEND_INTERNAL_URL</span> (
            ضروري عند تعارض دوكر/هوست).
          </li>
        </ul>
      </details>
    </div>
  )
}
