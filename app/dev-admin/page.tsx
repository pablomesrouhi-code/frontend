import { notFound, redirect } from 'next/navigation'

/**
 * Dev-only shortcut. `/api/admin` is relayed server-side (`app/api/admin/[[...path]]/route.ts`) to FastAPI.
 * Run uvicorn (default BACKEND_INTERNAL_URL http://127.0.0.1:8000) with `DATABASE_URL`, `ADMIN_*`, …
 */
export default function DevAdminOpenPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound()
  }
  redirect('/api/admin')
}
