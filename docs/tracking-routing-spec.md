# Storefront tracking/routing spec — for pending checkout build (approval 9e294383)

Ground truth below is taken from the current `main` checkout (commit `b12677c` onward — the cart-to-checkout purchase path landed after the original v1 of this spec, and closed most of the gaps it flagged). This revision re-baselines the spec against what actually shipped; only §1's pixel-mapping item is still open. Use this as the checklist for the release that must finally ship — do not regress any "keep" item.

## 1. Required events — exact fire point

| Event | Where it must fire | Status on `main` |
|---|---|---|
| `product_view` | On mount of the product/catalog page | ✅ wired — `src/components/gc/ProductCatalog.tsx:112`, `track('product_view')` |
| `add_to_cart` | On the "Add to Cart" click, with `product_id` | ✅ wired — `src/components/CartContext.tsx:43`, `track('add_to_cart', { product_id })` |
| `checkout` | On mount of the checkout/cart page | ✅ wired — `src/components/gc/CheckoutClient.tsx:20`, `track('checkout')` |
| `purchase` | After payment actually completes, carrying order value | ✅ wired — `src/components/gc/CheckoutSuccessClient.tsx:24-27`, fires `track('purchase', { value, currency, order_id })` on mount of `/checkout/success`, gated by a `sessionStorage` key per `order` id so a page reload never double-counts |

**Closed since v1:** the `purchase` gap (firing on hosted-session creation instead of on completed payment) is fixed. `CheckoutClient.onPurchase()` (`src/components/gc/CheckoutClient.tsx:47-58`) now builds an `orderId`, passes `successUrl` to `checkout()` with `order`, `value`, and `currency` as query params, and no longer fires `track('purchase')` itself — the success page does, reading those params back.

**Still open — pixel mapping:** `src/lib/funnel.ts:73-80` (`firePixel`) maps `convert → Lead`, `intent → InitiateCheckout`, and routes every other step — including `purchase` — through `fbq('trackCustom', 'funnel_purchase')`. A custom event carries no value/currency, so Meta's ad-platform attribution and ROAS reporting still never see real order value, even though the LinkWorld funnel beacon now does. Add a branch before the `else`:
```ts
if (step === "purchase") w.fbq("track", "Purchase", { value: data?.value, currency: data?.currency || "EUR" });
```
`firePixel` currently only takes `step`, not `data` — its signature and its one call site (`track()`, `src/lib/funnel.ts:120`) both need to pass `data` through. This is the one remaining line item before the pending build can close.

## 2. Page paths — must exist and must be linked from the homepage

| Path | Purpose | Status |
|---|---|---|
| `/product` | Catalog / shop grid | ✅ linked — Hero CTA (`Hero.tsx:57`), Nav "SHOP" (`Nav.tsx:14`), VideoCTA (`VideoCTA.tsx:35`) |
| `/checkout` | Cart + "Complete Purchase" | ✅ linked — catalog's checkout button (`ProductCatalog.tsx:138`), Nav "CHECKOUT" (`Nav.tsx:15`) |
| `/checkout/success` | Order confirmation — redirect target after hosted payment completes | ✅ exists (`src/app/checkout/success/page.tsx`), in `src/app/sitemap.ts:11`. Deliberately not in Nav/footer — it's a redirect target, not a nav destination, same as v1 called for. |

**The v1 "404/unlinked" gap is closed** — verified on this checkout by grepping every `href`/`Link` under `src/components/gc/*.tsx` and `src/app/page.tsx` against real routes in `src/app/**/page.tsx`: `/`, `/product`, `/checkout`, `/checkout/success`, `/blog`, `/blog/2026-09-02-gravitycart-sport-launch`, `/legal/privacy`, `/legal/cookies` all resolve, and the homepage's on-page anchors (`#certifications`, `#bay`, `#specs`) all match a real `id` in `CertificationMarquee.tsx`, `ModeConversionBay.tsx`, and `ComponentGrid.tsx` respectively. No 404s, no orphan targets remain on this baseline.

**Keep doing this check on every future PR** that touches routing or nav: grep new `href`/`Link` targets against `src/app/**/page.tsx` before merge — that's the actual mechanism that catches a repeat of the original mismatch.

## 3. Tracking pixel snippet placement

- **Single point of injection, unchanged:** `ensurePixels()` in `src/lib/funnel.ts` (Meta Pixel + LinkedIn Insight Tag script injection), invoked once from `src/components/FunnelTracker.tsx`, mounted in `src/app/layout.tsx`. Do not add a second `<script>` tag anywhere — `/checkout/success` already gets pixel coverage for free via `import { track } from '@/lib/funnel'`.
- Pixel IDs stay configured in `src/funnel-config.ts` (`FUNNEL_META_PIXEL`, `FUNNEL_LINKEDIN_PIXEL`) — never hardcode a pixel ID in a component.
- Consent: `FUNNEL_JURISDICTION` is currently unset (non-EU), so pixels fire unconditionally; the consent-gate path (`consentAllows('marketing')`) needs no changes if jurisdiction is ever set to `"eu"`.

## Net changes still needed before this release ships

1. `src/lib/funnel.ts`: thread `data` into `firePixel(step, data)` and add the `purchase → fbq('track', 'Purchase', { value, currency })` branch described in §1. This is the only remaining code change.
2. No changes needed to `/product`, `/checkout`, `/checkout/success`, or their links — routing and the `product_view`/`add_to_cart`/`checkout`/`purchase` event fire points are all correctly wired and verified on this checkout; do not touch them.
