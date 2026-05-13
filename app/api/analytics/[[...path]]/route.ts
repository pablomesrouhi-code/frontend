import type { NextRequest } from 'next/server'
import { relayToFastapi } from '@/lib/backendProxy'

export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ path?: string[] }> }

export async function GET(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return relayToFastapi(request, '/api/analytics', path)
}

export async function POST(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return relayToFastapi(request, '/api/analytics', path)
}

export async function HEAD(request: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return relayToFastapi(request, '/api/analytics', path)
}
