FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# `NEXT_PUBLIC_*` must exist at `npm run build` time. `.env` is not copied (.dockerignore).
# In EasyPanel, set the same names as Build Arguments (or rely on defaults below).
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Defaults match production; EasyPanel Build Args override these at image build time.
ARG NEXT_PUBLIC_SITE_URL=https://nabtalabo.store
ARG NEXT_PUBLIC_API_URL=https://api.nabtalabo.store
# Local / docker-compose stack: build with NEXT_PUBLIC_USE_LOCAL_API=true — browser calls `/nabtalabo-api-proxy/...`; Next rewrites server-side (avoids LAN "localhost" bug + CORS).
ARG NEXT_PUBLIC_USE_LOCAL_API=false
ARG BACKEND_INTERNAL_URL=http://127.0.0.1:8000
ARG NEXT_PUBLIC_META_PIXEL_ID=
ARG META_PIXEL_ID=
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID=
ARG NEXT_PUBLIC_SNAP_PIXEL_ID=
ARG SNAP_PIXEL_ID=
ARG NEXT_PUBLIC_ENABLE_PIXELS=true
ARG NEXT_PUBLIC_PIXEL_SCRIPT_STRATEGY=afterInteractive

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} \
    NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
    NEXT_PUBLIC_USE_LOCAL_API=${NEXT_PUBLIC_USE_LOCAL_API} \
    BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL} \
    NEXT_PUBLIC_META_PIXEL_ID=${NEXT_PUBLIC_META_PIXEL_ID} \
    META_PIXEL_ID=${META_PIXEL_ID} \
    NEXT_PUBLIC_TIKTOK_PIXEL_ID=${NEXT_PUBLIC_TIKTOK_PIXEL_ID} \
    NEXT_PUBLIC_SNAP_PIXEL_ID=${NEXT_PUBLIC_SNAP_PIXEL_ID} \
    SNAP_PIXEL_ID=${SNAP_PIXEL_ID} \
    NEXT_PUBLIC_ENABLE_PIXELS=${NEXT_PUBLIC_ENABLE_PIXELS} \
    NEXT_PUBLIC_PIXEL_SCRIPT_STRATEGY=${NEXT_PUBLIC_PIXEL_SCRIPT_STRATEGY}

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next \
    && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000 \
    HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
