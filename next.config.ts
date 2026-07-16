import type { NextConfig } from "next";

/** Same-origin rewrite target (server-side). Not exposed to browsers. */
function backendInternalProxyTarget(): string {
  return (
    process.env.BACKEND_INTERNAL_URL?.trim() ||
    "http://127.0.0.1:8000"
  ).replace(/\/+$/, "");
}

function shouldUseLocalBackendProxy(): boolean {
  const v = process.env.NEXT_PUBLIC_USE_LOCAL_API?.trim()?.toLowerCase();
  return v === "true" || v === "1";
}

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/products/laylmag-magnesium-gummies",
        destination: "/products/laylmag-magnesium-powder",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async rewrites() {
    const base = backendInternalProxyTarget();
    const cond =
      shouldUseLocalBackendProxy() || process.env.NODE_ENV === "development";
    if (!cond) {
      return [];
    }
    /**
     * General FastAPI relay for callers using `/nabtalabo-api-proxy/*`.
     * `/api/admin` and `/api/analytics/*` use Route Handlers in `app/api/*` (stable with Turbopack).
     */
    const beforeFiles = [
      { source: "/nabtalabo-api-proxy/:path*", destination: `${base}/:path*` },
    ];

    return { beforeFiles };
  },
};

export default nextConfig;
