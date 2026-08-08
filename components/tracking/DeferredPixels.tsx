import Script from 'next/script'
import { getMetaPixelId, getSnapPixelId, pixelsEnabled } from '@/lib/tracking/pixels-enabled'

const SAFE_PIXEL_ID = /^[A-Za-z0-9_-]{4,64}$/

function sanitizeId(raw: string | undefined): string | null {
  const v = raw?.trim()
  if (!v || !SAFE_PIXEL_ID.test(v)) return null
  return v
}

/**
 * Snap must start in <head> (beforeInteractive) — Ads Manager flags
 * "browser navigation → pixel js start" when scevent.min.js is deferred (~10s).
 * Meta/TikTok stay afterInteractive so the store still paints quickly.
 */
export default function DeferredPixels() {
  const metaId = getMetaPixelId()
  const tiktokId = sanitizeId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID)
  const snapId = getSnapPixelId()

  if (!pixelsEnabled()) return null

  const raw = process.env.NEXT_PUBLIC_PIXEL_SCRIPT_STRATEGY
  const loadStrategy: 'lazyOnload' | 'afterInteractive' =
    raw === 'lazyOnload' ? 'lazyOnload' : 'afterInteractive'

  return (
    <>
      {snapId ? (
        <Script id="nabtalabo-snap-pixel" strategy="beforeInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){
            a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u);})(window,document,
            'https://sc-static.net/scevent.min.js');
            snaptr('init','${snapId}');
            snaptr('track','PAGE_VIEW');
          `}
        </Script>
      ) : null}

      {metaId ? (
        <>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
          <Script id="nabtalabo-meta-pixel-stub" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];}(window,document,'script');
              fbq('init', '${metaId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <Script id="nabtalabo-meta-pixel-load" strategy={loadStrategy}>
            {`
              (function(d,s,u,i){
                if(d.getElementById(i))return;
                var t=d.createElement(s);t.id=i;t.async=true;t.src=u;
                var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(t,f);
              })(document,'script','https://connect.facebook.net/en_US/fbevents.js','nabtalabo-meta-events');
            `}
          </Script>
        </>
      ) : null}

      {tiktokId ? (
        <Script id="nabtalabo-tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
              n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;
              e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('${tiktokId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      ) : null}
    </>
  )
}
