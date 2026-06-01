import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  allowLocalFastapiProxy,
  backendInternalBase,
} from '@/lib/backendProxy'
import { pingUrlOk } from '@/lib/pingBackend'

export const dynamic = 'force-dynamic'

function devAdminDirectOrigin(): string {
  const o =
    process.env.NEXT_PUBLIC_DEV_ADMIN_ORIGIN?.trim() ||
    'http://127.0.0.1:8000'
  return o.replace(/\/+$/, '')
}

function devAdminDirectUrl(): string {
  return `${devAdminDirectOrigin()}/api/admin`
}

function statusPill(ok: boolean) {
  const cls = ok
    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
    : 'border-rose-200 bg-rose-50 text-rose-900'
  const txt = ok ? 'نعم' : 'لا'
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${cls}`}>
      {txt}
    </span>
  )
}

export default async function DevAdminHubPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }

  const directUrl = devAdminDirectUrl()
  const relayOrigin = backendInternalBase()
  const directOriginTrim = devAdminDirectOrigin()

  const relayHealthUrl = `${relayOrigin}/health`
  const browserHealthUrl = `${directOriginTrim}/health`

  const relayUp = await pingUrlOk(relayHealthUrl)
  const directUp = await pingUrlOk(browserHealthUrl)

  const relayOk = allowLocalFastapiProxy()
  const relayDiffers =
    relayOrigin.replace(/\/+$/, '') !== directOriginTrim.replace(/\/+$/, '')

  return (
    <div className="mx-auto max-w-xl px-4 py-10 text-start">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-authority)]">
        وضع التطوير فقط
      </p>
      <h1 className="mb-3 text-xl font-bold text-[var(--color-charcoal)]">
        لوحة الإدارة — تشخيص سريع
      </h1>

      <div className="mb-6 rounded-2xl border border-[var(--color-border)] bg-white p-4 shadow-sm">
        <p className="mb-2 text-[13px] font-semibold text-[var(--color-charcoal)]">
          اتصال الـ API (اختبار `/health`)
        </p>
        <ul className="space-y-2 text-[12px] text-[var(--color-muted)]">
          <li className="flex flex-wrap items-center justify-between gap-2">
            <span className="min-w-0 break-all font-mono text-[11px]">{relayHealthUrl}</span>
            {statusPill(relayUp)}
          </li>
          <li className="flex flex-wrap items-center justify-between gap-2">
            <span className="min-w-0 break-all font-mono text-[11px]">{browserHealthUrl}</span>
            {statusPill(directUp)}
          </li>
        </ul>
        {!relayUp && relayDiffers ? (
          <p className="mt-3 text-[12px] leading-relaxed text-rose-800">
            سيرفر Next يحاول الوصول إلى <span className="font-mono">{relayOrigin}</span> — إذا الـ uvicorn على
            الجهاز وليس على نفس الشبكة داخل دوكر غيّر <span className="font-mono">BACKEND_INTERNAL_URL</span> (
            غالباً <span className="font-mono">http://host.docker.internal:8000</span>
            ).
          </p>
        ) : null}
        {relayUp && !directUp ? (
          <p className="mt-3 text-[12px] leading-relaxed text-amber-900">
            المتصفّح قد لا يبلغ عنوان <span className="font-mono">{browserHealthUrl}</span> — عدّل{' '}
            <span className="font-mono">NEXT_PUBLIC_DEV_ADMIN_ORIGIN</span> بحيث يطابق ما يعمل عندك.
          </p>
        ) : null}
      </div>

      <p className="mb-6 text-[15px] leading-relaxed text-[var(--color-muted)]">
        أسرع طريقة لمشاهدة اللوحة: الرابط الأسفل إلى FastAPI بشكل مباشر؛ لا تعتمد على بروكسي Next.
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
          <span className="break-all font-mono">{directUrl}</span>
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-dashed border-[var(--color-border)] bg-[#fafafa] p-4">
        <p className="mb-3 text-[14px] font-semibold text-[var(--color-charcoal)]">
          بديلًا: عبر منفذ Next (نفس المنشأ + كعكات)
        </p>
        {relayOk ? (
          <Link
            href="/api/admin"
            className="inline-block rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-[14px] font-semibold text-[var(--color-charcoal)] hover:bg-[var(--color-peach-tint)]"
          >
            افتح `/api/admin` عبر النكست
          </Link>
        ) : (
          <p className="text-[13px] leading-relaxed text-[var(--color-muted)]">
            البروكسي معطّل — استخدم{' '}
            <span className="font-mono">next dev</span> أو{' '}
            <span className="font-mono">NEXT_PUBLIC_USE_LOCAL_API=true</span> أو{' '}
            <span className="font-mono">ADMIN_PROXY_FORCE=1</span>.
          </p>
        )}
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--color-muted)]">
          عنوان الرحيل (سيرفر Next → API):{' '}
          <span className="break-all">{relayOrigin}</span>
        </p>
      </div>

      <details className="rounded-xl border border-[var(--color-border)] bg-white p-3 text-[13px] text-[var(--color-muted)]">
        <summary className="cursor-pointer font-semibold text-[var(--color-charcoal)]">
          تأكّد من القائمة
        </summary>
        <ul className="mr-5 mt-2 list-disc space-y-2 leading-relaxed">
          <li>
            تشغيل الـ API:{' '}
            <span className="font-mono">uvicorn app.main:app --reload --host 0.0.0.0 --port 8000</span>
          </li>
          <li>
            <span className="font-mono">DATABASE_URL</span> + جدول <span className="font-mono">analytics_events</span>{' '}
            لمقاييس النقرات
          </li>
          <li>
            <span className="font-mono">ADMIN_USERNAME</span> ، <span className="font-mono">ADMIN_PASSWORD</span> ،{' '}
            <span className="font-mono">ADMIN_SESSION_SECRET</span> ،{' '}
            <span className="font-mono">ADMIN_ENABLED=true</span>
          </li>
          <li>
            لا تستخدم <span className="font-mono">CORS_ORIGINS</span> الصارمة في التطوير إلا إذا أدرجت عناوين
            المتجر المحلي؛ وإلا اترك المتغير فارغًا لتضمين dev تلقائيًا.
          </li>
        </ul>
      </details>
    </div>
  )
}
