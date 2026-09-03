"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { FadeUp } from "./FadeUp";

export function CheckoutSuccessClient() {
  const params = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);

  const order = params.get("order");
  const rawValue = params.get("value");
  const currency = params.get("currency") || "EUR";
  const value = rawValue ? Number(rawValue) : null;

  useEffect(() => {
    if (!order) return;
    const key = `lw_purchase_fired_${order}`;
    if (sessionStorage.getItem(key)) {
      setConfirmed(true);
      return;
    }
    track("purchase", { value: value ?? undefined, currency, order_id: order });
    sessionStorage.setItem(key, "1");
    setConfirmed(true);
  }, [order, value, currency]);

  return (
    <section className="relative mx-auto max-w-2xl px-6 pb-32 pt-16 text-center">
      <FadeUp>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
          ORDER / DISPATCH CONFIRMED
        </p>
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-aluminum/15 bg-aluminum/5">
          <CheckCircle2 className="h-6 w-6 text-signal" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
          Payment Confirmed
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] text-aluminum/85">
          {confirmed
            ? "Your order has been received and is queued for certified inspection before dispatch. A confirmation with tracking details will follow by email."
            : "Confirming your order…"}
        </p>
        {order && (
          <div className="mx-auto mt-8 max-w-sm border border-aluminum/10 px-6 py-5 font-mono text-[13px] uppercase tracking-[0.14em] text-aluminum/70">
            <div className="flex items-center justify-between border-b border-aluminum/10 pb-3">
              <span className="opacity-60">ORDER REF</span>
              <span className="text-white">{order.slice(0, 12)}</span>
            </div>
            {value !== null && (
              <div className="flex items-center justify-between pt-3">
                <span className="opacity-60">TOTAL</span>
                <span className="tabular text-white">{formatPrice(value, currency)}</span>
              </div>
            )}
          </div>
        )}
        <Link
          href="/product"
          className="liquid-glass mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
        >
          Continue Shopping
        </Link>
      </FadeUp>
    </section>
  );
}
