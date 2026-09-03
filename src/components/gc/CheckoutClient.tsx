"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/checkout";
import { checkout, fetchProducts, formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";
import { FadeUp } from "./FadeUp";

export function CheckoutClient() {
  const { items, count, remove, clear } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("checkout");
  }, []);

  useEffect(() => {
    let alive = true;
    fetchProducts().then((live) => {
      if (alive) setCatalog(live);
    });
    return () => {
      alive = false;
    };
  }, []);

  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    for (const p of catalog) m.set(p.id, p);
    return m;
  }, [catalog]);

  const known = items.filter((i) => byId.has(i.product_id));
  const total = known.reduce((sum, i) => {
    const p = byId.get(i.product_id);
    return sum + (p ? p.price_cents * i.quantity : 0);
  }, 0);

  const onPurchase = async () => {
    if (!known.length) return;
    const stale = items.filter((i) => !byId.has(i.product_id));
    stale.forEach((i) => remove(i.product_id));
    setError(null);
    setBusy(true);
    const orderId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const successUrl = `${window.location.origin}/checkout/success?order=${orderId}&value=${total}&currency=EUR`;
    const ok = await checkout(known, { successUrl });
    if (ok) {
      clear();
    } else {
      setBusy(false);
      setError("Checkout couldn't be started right now. Please try again in a moment.");
    }
  };

  return (
    <section className="relative mx-auto max-w-2xl px-6 pb-32 pt-16">
      <FadeUp>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
          ORDER / FINAL INSPECTION
        </p>
        <h1 className="font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
          Checkout
        </h1>
      </FadeUp>

      <div className="mt-10 border border-aluminum/10">
        {count === 0 ? (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-aluminum/50">
              Cart is empty
            </p>
            <Link
              href="/product"
              className="liquid-glass flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              Back to Catalog
            </Link>
          </div>
        ) : (
          <>
            <table className="w-full font-mono text-[13px] text-aluminum/85">
              <tbody>
                {known.map((i) => {
                  const p = byId.get(i.product_id);
                  if (!p) return null;
                  return (
                    <tr key={i.product_id} className="border-b border-aluminum/10">
                      <td className="px-6 py-4">
                        {p.name}
                        <span className="ml-2 text-aluminum/40">× {i.quantity}</span>
                      </td>
                      <td className="px-6 py-4 text-right tabular">
                        {formatPrice(p.price_cents * i.quantity, p.currency)}
                      </td>
                      <td className="w-10 px-6 py-4 text-right">
                        <button
                          type="button"
                          aria-label={`Remove ${p.name}`}
                          onClick={() => remove(i.product_id)}
                          className="text-aluminum/40 transition-colors hover:text-signal"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-6 py-5 font-mono text-[13px] uppercase tracking-[0.14em] text-white">
              <span className="opacity-60">TOTAL</span>
              <span className="tabular text-lg">{formatPrice(total)}</span>
            </div>
          </>
        )}
      </div>

      {count > 0 && (
        <>
          <motion.button
            type="button"
            disabled={busy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={onPurchase}
            className="mt-6 w-full rounded-full bg-signal px-7 py-4 font-mono text-[13px] uppercase tracking-[0.18em] text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Starting Secure Checkout…" : "Complete Purchase"}
          </motion.button>
          <Link
            href="/product"
            className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-aluminum/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} />
            Continue Shopping
          </Link>
        </>
      )}
      {error && <p className="mt-4 text-center text-sm text-signal">{error}</p>}
    </section>
  );
}
