"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/checkout";
import { fetchProducts, formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";
import { FadeUp } from "./FadeUp";

const SELLABLE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function splitName(name: string): { title: string; partNo: string | null } {
  const idx = name.indexOf(" — ");
  if (idx === -1) return { title: name, partNo: null };
  return { title: name.slice(0, idx), partNo: name.slice(idx + 3) };
}

function SpecPlaceholder({ partNo }: { partNo: string | null }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 border border-aluminum/15 bg-graphite">
      <svg viewBox="0 0 120 120" className="h-16 w-16 text-aluminum/40" aria-hidden>
        <rect x="10" y="10" width="100" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="10" x2="110" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="110" y1="10" x2="10" y2="110" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aluminum/40">
        HOMOLOGATION PHOTO PENDING
      </p>
      {partNo && (
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">{partNo}</p>
      )}
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const { title, partNo } = splitName(product.name);
  const sellable = SELLABLE_ID.test(product.id);
  const outOfStock = product.stock !== null && product.stock <= 0;

  return (
    <FadeUp
      className="grid grid-cols-1 gap-6 border-t border-aluminum/10 py-10 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-10"
      delay={Math.min(index * 0.05, 0.3)}
    >
      <div className="aspect-[4/3] w-full overflow-hidden md:aspect-square">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <SpecPlaceholder partNo={partNo} />
        )}
      </div>

      <div>
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
          <span>P.{String(index + 1).padStart(2, "0")}</span>
          {partNo && <span className="text-aluminum/50">{partNo}</span>}
        </div>
        <h2 className="mt-2 font-display text-2xl font-medium uppercase leading-tight text-white md:text-3xl">
          {title}
        </h2>
        {product.description && (
          <p className="mt-3 max-w-lg text-sm text-aluminum/70">{product.description}</p>
        )}
        <table className="mt-4 w-full max-w-xs font-mono text-[12px] text-aluminum/70">
          <tbody>
            <tr className="border-t border-aluminum/10">
              <td className="py-2 opacity-60">PRICE</td>
              <td className="py-2 text-right tabular">{formatPrice(product.price_cents, product.currency)}</td>
            </tr>
            <tr className="border-t border-aluminum/10">
              <td className="py-2 opacity-60">AVAILABILITY</td>
              <td className="py-2 text-right tabular">
                {product.stock === null ? "IN STOCK" : outOfStock ? "SOLD OUT" : `${product.stock} UNITS`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <motion.button
        type="button"
        disabled={!sellable || outOfStock}
        whileHover={sellable && !outOfStock ? { scale: 1.03 } : undefined}
        whileTap={sellable && !outOfStock ? { scale: 0.97 } : undefined}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => {
          add(product);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1600);
        }}
        className="h-fit whitespace-nowrap rounded-full bg-signal px-7 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white disabled:cursor-not-allowed disabled:opacity-30 md:justify-self-end"
      >
        {outOfStock ? "Sold Out" : added ? "Added ✓" : sellable ? "Add to Cart" : "Loading…"}
      </motion.button>
    </FadeUp>
  );
}

export function ProductCatalog({ products: initial }: { products: Product[] }) {
  const [catalog, setCatalog] = useState<Product[]>(initial);
  const { count } = useCart();

  useEffect(() => {
    track("product_view");
  }, []);

  useEffect(() => {
    let alive = true;
    fetchProducts().then((live) => {
      if (alive && live.length) setCatalog(live);
    });
    return () => {
      alive = false;
    };
  }, []);

  const empty = useMemo(() => catalog.length === 0, [catalog]);

  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-32 pt-16">
      <FadeUp>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
          PARTS CATALOG / SELLABLE INVENTORY
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="max-w-xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
            Order the certified chassis
          </h1>
          <Link
            href="/checkout"
            className="liquid-glass flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
          >
            <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.5} />
            Cart ({count})
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-sm text-aluminum/60">
          Every unit ships with its full homologation record. Spare assemblies and conversion kits are
          machined to the same tolerance as the original chassis.
        </p>
      </FadeUp>

      <div className="mt-10">
        {empty ? (
          <p className="border-t border-aluminum/10 py-16 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-aluminum/50">
            Catalog is being re-certified — check back shortly.
          </p>
        ) : (
          catalog.map((p, i) => <ProductRow key={p.id} product={p} index={i} />)
        )}
      </div>
    </section>
  );
}
