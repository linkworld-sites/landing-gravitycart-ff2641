import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/gc/Nav";
import { FadeUp } from "@/components/gc/FadeUp";
import { getAvailability, getAvailabilityFaq, availabilityFaqJsonLd } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "Retailer & Regional Availability — Gravity Cart Sport",
  description:
    "How the Gravity Cart Sport is sold: direct-only distribution, no third-party retailers, and the regional certification standards (CE, ISO, ECE R100) behind every SKU.",
  alternates: { canonical: "/availability" },
};

export default function AvailabilityPage() {
  const availability = getAvailability();
  const faq = getAvailabilityFaq();
  const schema = availabilityFaqJsonLd();

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
              DISTRIBUTION RECORD / AVAILABILITY
            </p>
            <h1 className="max-w-xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
              Retailer &amp; regional availability
            </h1>
            <p className="mt-6 max-w-xl font-mono text-[13px] leading-relaxed text-aluminum/70">
              {availability.channel}
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-14">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">
              SKU / STANDARD / CHANNEL
            </p>
            <div className="overflow-x-auto border-t border-aluminum/10">
              <table className="w-full min-w-[560px] border-collapse font-mono text-[12px]">
                <thead>
                  <tr className="border-b border-aluminum/10 text-left uppercase tracking-[0.12em] text-aluminum/50">
                    <th className="py-3 pr-4 font-normal">SKU</th>
                    <th className="py-3 pr-4 font-normal">Item</th>
                    <th className="py-3 pr-4 font-normal">Standard</th>
                    <th className="py-3 font-normal">Channel</th>
                  </tr>
                </thead>
                <tbody>
                  {availability.ledger.map((row) => (
                    <tr key={row.sku} className="border-b border-aluminum/10 text-aluminum/80">
                      <td className="py-3 pr-4 tabular-nums text-white">{row.sku}</td>
                      <td className="py-3 pr-4">{row.item}</td>
                      <td className="py-3 pr-4">{row.standard}</td>
                      <td className="py-3">{row.channel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            More on certification:{" "}
            <Link
              href="/faq"
              className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
            >
              Specification FAQ
            </Link>
            {" · "}
            <Link
              href="/product"
              className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
            >
              Shop the GC-SPORT-01 direct
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
