import Script from 'next/script'

const SAFE_PIXEL_ID = /^[A-Za-z0-9_-]{4,64}$/

function sanitizeId(raw: string | undefined): string | null {
  const v = raw?.trim()
  if (!v || !SAFE_PIXEL_ID.test(v)) return null
  return v
}

/** Disable all DeferredPixels scripts only when explicitly turned off (EasyPanel often omits ENABLE while IDs are set). */
function pixelsExplicitlyDisabled(): boolean {
  const v = process.env.NEXT_PUBLIC_ENABLE_PIXELS?.trim().toLowerCase()
  return v === 'false' || v === '0' || v === 'no'
}

export default function DeferredPixels() {
  const metaId = sanitizeId(process.env.NEXT_PUBLIC_META_PIXEL_ID)
  const tiktokId = sanitizeId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID)
  const snapId = sanitizeId(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID)

  if (pixelsExplicitlyDisabled()) return null
  if (!metaId && !tiktokId && !snapId) return null

  const raw = process.env.NEXT_PUBLIC_PIXEL_SCRIPT_STRATEGY
  const strategy: 'lazyOnload' | 'afterInteractive' =
    raw === 'afterInteractive' ? 'afterInteractive' : 'lazyOnload'

  return (
    <>
      {metaId ? (
        <Script id="nabtalabo-meta-pixel" strategy={strategy}>
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {tiktokId ? (
        <Script id="nabtalabo-tiktok-pixel" strategy={strategy}>
          {`
            !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
            ttq.methods=["track","page","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
            ttq.setAndDefer=function(i,e){i[e]=function(){i.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var n=0;n<ttq.methods.length;n++)ttq.setAndDefer(ttq,ttq.methods[n]);
            ttq.instance=function(i){for(var e=ttq._i[i]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
            ttq.load=function(e,n){var o="https://analytics.tiktok.com/i18n/pixel/events.js";
            ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=o;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
            var a=d.createElement("script");a.type="text/javascript";a.async=!0;a.src=o+"?sdkid="+e+"&lib="+t;
            var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
            ttq.load('${tiktokId}');
            ttq.page();
          }(window,document,'ttq');
          `}
        </Script>
      ) : null}

      {snapId ? (
        <Script id="nabtalabo-snap-pixel" strategy={strategy}>
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
            a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;
            var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init','${snapId}');
            snaptr('track','PAGE_VIEW');
          `}
        </Script>
      ) : null}
    </>
  )
}
