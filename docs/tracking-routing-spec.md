# Storefront tracking/routing spec — for pending checkout build (approval 9e294383)

Ground truth below is taken from the current `main` checkout (commit `1bfd7a2`). Use it as the baseline the pending build must match or improve on — do not regress any of the "keep" items.

## 1. Required events — exact fire point

| Event | Where it must fire | Status on `main` |
|---|---|---|
| `product_view` | On mount of the product/catalog page | ✅ wired — `src/components/gc/ProductCatalog.tsx:112`, `track('product_view')` |
| `add_to_cart` | On the "Add to Cart" click, with `product_id` | ✅ wired — `src/components/CartContext.tsx:43`, `track('add_to_cart', { product_id })` |
| `checkout` | On mount of the checkout/cart page | ✅ wired — `src/components/gc/CheckoutClient.tsx:20`, `track('checkout')` |
| `purchase` | **After the payment actually completes**, not before | ❌ gap — see below |

**`purchase` gap:** today `track('purchase')` fires at `CheckoutClient.tsx:53`, immediately after `checkout()` resolves `true` — i.e. as soon as a hosted payment *session* is created, before the customer has entered payment details or paid. This overcounts purchases (any abandoned hosted-payment session still counts) and cannot record order value. The pending build must move this fire to a page the payment provider redirects back to on success (see §2), and pass order value:
```ts
track('purchase', { value: total, currency: 'EUR' });
```
`track()` already accepts a data payload (`src/lib/funnel.ts`, `track(step, data)`), so no signature change is needed — only the call site and its argument move.

**Pixel mapping gap (adjacent, worth fixing in the same pass):** `src/lib/funnel.ts:77-79` maps funnel steps to Meta events as `convert → Lead`, `intent → InitiateCheckout`, everything else (including `purchase`) → `trackCustom('funnel_purchase')`. A custom event carries no value/currency, so ad-platform attribution and ROAS reporting never see real order value. Add a `purchase → fbq('track', 'Purchase', { value, currency })` branch alongside the existing `intent` branch.

## 2. Page paths — must exist and must be linked from the homepage

| Path | Purpose | Status |
|---|---|---|
| `/product` | Catalog / shop grid | ✅ exists, linked from Hero CTA (`Hero.tsx:57`), Nav "SHOP" (`Nav.tsx:14`), VideoCTA (`VideoCTA.tsx:35`) |
| `/checkout` | Cart + "Complete Purchase" | ✅ exists, linked from catalog's checkout button (`ProductCatalog.tsx:138`) and Nav "CHECKOUT" |
| `/checkout/success` | Order confirmation — the redirect target after hosted payment completes | ❌ **missing** — does not exist as a route, is not passed anywhere, and is not linked from the homepage |

**This is the concrete "404/unlinked" gap to close:** `checkout()` (`src/lib/checkout.ts:64`) accepts an optional `successUrl`, but `CheckoutClient.onPurchase()` calls `checkout(known)` with no options — so no success URL is ever sent to the payment provider, and there is nowhere for the provider to send a customer back to after paying. The pending build must:
1. Add `src/app/checkout/success/page.tsx` — a real route, added to `src/app/sitemap.ts`.
2. Pass it to checkout: `checkout(known, { successUrl: `${window.location.origin}/checkout/success` })`.
3. Fire `track('purchase', { value, currency })` on that page's mount, guarded so it only fires once per completed order (e.g. gate on a session/order query param the payment provider appends on redirect — do not fire on a bare reload of the page).
4. Homepage/nav do not need a *visible* link to this page (it's a redirect target, not a nav destination) — but before merging, grep every `href`/`Link` in the diff against `src/app/**/page.tsx` routes and confirm every target resolves. That grep is the actual check for "unlinked/404" — on `main` today all visible CTAs (`/product`, `/checkout`) already resolve correctly; the only missing path is this confirmation route.

## 3. Tracking pixel snippet placement

- **Single point of injection:** `ensurePixels()` in `src/lib/funnel.ts` (Meta Pixel + LinkedIn Insight Tag script injection), invoked once from `src/components/FunnelTracker.tsx`, which is mounted in `src/app/layout.tsx`. **Do not add a second `<script>` tag anywhere** — any new page (including `/checkout/success`) gets pixel coverage for free by importing `track` from `@/lib/funnel`, nothing else.
- Pixel IDs are configured once in `src/funnel-config.ts` (`FUNNEL_META_PIXEL`, `FUNNEL_LINKEDIN_PIXEL`) — never hardcode a pixel ID in a component.
- Consent: `FUNNEL_JURISDICTION` is currently unset (non-EU), so pixels fire unconditionally; the consent-gate path (`consentAllows('marketing')`) already exists in `funnel.ts` and needs no changes if jurisdiction is ever set to `"eu"`.

## Net changes for the pending build
1. New route: `app/checkout/success/page.tsx` (+ sitemap entry).
2. `CheckoutClient.onPurchase()`: pass `successUrl`, move the `track('purchase', ...)` call from immediately-after-session-creation to the new success page, include `value`/`currency`.
3. `funnel.ts`: add a `Purchase` (not `trackCustom`) branch for the `purchase` step, carrying value/currency through to `fbq`.
4. No changes needed to `/product`, `/checkout`, or their homepage links — they are already correctly wired and should not be touched.
