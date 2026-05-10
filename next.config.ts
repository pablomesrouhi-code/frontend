import type { NextConfig } from "next";

/** Same-origin rewrite target (server-side). Not exposed to browsers. */
function backendInternalProxyTarget(): string {
  return (
    process.env.BACKEND_INTERNAL_URL?.trim() ||
    "http://127.0.0.1:8000"
  ).replace(/\/+$/, "");
}

function useLocalBackendProxyFlag(): boolean {
  const v = process.env.NEXT_PUBLIC_USE_LOCAL_API?.trim()?.toLowerCase();
  return v === "true" || v === "1";
}

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const base = backendInternalProxyTarget();
    const proxy = [
      {
        source: "/nabtalabo-api-proxy/:path*",
        destination: `${base}/:path*`,
      },
    ];
    if (useLocalBackendProxyFlag()) return proxy;
    // `next dev` only (build uses NODE_ENV=production — no extra surface)
    if (process.env.NODE_ENV === "development") return proxy;
    return [];
  },
};

export default nextConfig;
