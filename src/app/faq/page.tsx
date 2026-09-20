import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/gc/Nav";
import { FadeUp } from "@/components/gc/FadeUp";
import { getFaq, faqJsonLd } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "FAQ — Gravity Cart Sport Specifications & Certification",
  description:
    "Certified answers on the Gravity Cart Sport: wheel-to-ski conversion, terrain and load ratings, braking hardware, and CE/ISO compliance.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faq = getFaq();
  const schema = faqJsonLd();

  return (
    <main className="relative min-h-screen bg-ink pt-28">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Nav />

      <section className="relative bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              CERTIFICATION RECORD / FAQ
            </p>
            <h1 className="max-w-xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
              Specification questions, answered
            </h1>
            <p className="mt-6 max-w-xl font-mono text-[13px] leading-relaxed text-aluminum/70">
              Straight, verifiable answers on the GC-SPORT-01 chassis — conversion mechanics, rated
              loads, braking hardware, and the certifications behind them.
            </p>
          </FadeUp>

          <dl className="mt-14 divide-y divide-aluminum/10 border-t border-aluminum/10">
            {faq.map((item, i) => (
              <FadeUp key={item.q} delay={i * 0.05} className="py-6">
                <dt className="font-display text-lg font-medium text-white">{item.q}</dt>
                <dd className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed text-aluminum/80">
                  {item.a}
                </dd>
              </FadeUp>
            ))}
          </dl>

          <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.14em] text-aluminum/50">
            Full test writeup:{" "}
            <Link
              href="/blog/2026-09-02-gravitycart-sport-launch"
              className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
            >
              One Chassis, Two Certified Modes
            </Link>
            {" · "}
            How the{" "}
            <Link
              href="/blog/2026-09-02-gravity-powered-descent-carts"
              className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
            >
              gravity-powered descent cart
            </Link>{" "}
            converts between modes
            {" · "}
            <Link
              href="/product"
              className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
            >
              Shop the GC-SPORT-01
            </Link>
            {" · "}
            <Link
              href="/availability"
              className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
            >
              Retailer &amp; regional availability
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
