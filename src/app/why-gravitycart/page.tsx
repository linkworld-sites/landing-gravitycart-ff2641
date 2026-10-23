import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/gc/Nav";
import { FadeUp } from "@/components/gc/FadeUp";
import { SITE_URL } from "@/lib/site";

// Only-this-brand element: a "claim → measurable proof" ledger. Every differentiator of the
// Gravity Cart Sport is stated as a checkable figure with its SKU, so the page answers
// generic queries ("all-season gravity cart", "convertible gravity cart") with specs, not adjectives.

export const metadata: Metadata = {
  title: "Why GravityCart: Convertible, Certified Gravity Cart Specs",
  description:
    "What sets the Gravity Cart Sport apart, as checkable specs: wheel and ski assemblies included, 120 kg rated load, 25% descent grade on packed snow, ECE R100 brakes, 304 stainless fork.",
  alternates: { canonical: "/why-gravitycart" },
};

const LEDGER: { id: string; claim: string; proof: string; sku: string }[] = [
  {
    id: "U-01",
    claim: "One machine for pavement, gravel and packed snow",
    proof: "Certified wheel and ski assemblies are included with the chassis. No second vehicle, no separate frame.",
    sku: "GC-SPORT-01",
  },
  {
    id: "U-02",
    claim: "Stated load rating",
    proof: "Rated load 120 kg.",
    sku: "GC-SPORT-01",
  },
  {
    id: "U-03",
    claim: "Winter conversion with a stated grade limit",
    proof: "Tool-free binding, 780 mm ski length, rated to 25% descent grade on packed snow.",
    sku: "GC-SKI-200",
  },
  {
    id: "U-04",
    claim: "Corrosion-resistant steering fork",
    proof: "304 stainless steel, 42 mm rake, tool-free quick-release mount.",
    sku: "GC-FRK-100",
  },
  {
    id: "U-05",
    claim: "Braking tested to a published standard",
    proof: "Hydraulic dual-disc set, 180 mm front and rear rotors, ECE R100 tested.",
    sku: "GC-BRK-180",
  },
  {
    id: "U-06",
    claim: "Documented safety standards",
    proof: "Chassis documented against ECE 2006/42/EG, ISO EN 12100 and ISO EN 4210.",
    sku: "GC-SPORT-01",
  },
  {
    id: "U-07",
    claim: "Every wear part sold separately",
    proof: "Fork €420.00, ski kit €680.00 and brake kit €215.00 are standalone SKUs. Chassis €2,890.00.",
    sku: "ALL",
  },
];

const CHECKLIST: string[] = [
  "Does the maker publish a rated load in kilograms?",
  "Is the winter configuration rated to a stated descent grade, or only described as suitable for snow?",
  "Is the braking system tested to a named standard such as ECE R100?",
  "Are the safety standards listed by number, and which component does each apply to?",
  "Can worn parts be replaced individually, with prices published?",
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What makes the Gravity Cart Sport different from other gravity carts?",
    a: "It is a single convertible chassis with certified wheel and ski assemblies included, so it covers pavement, gravel and packed snow. Its figures are published: rated load 120 kg, ski assembly rated to 25% descent grade on packed snow, brakes tested to ECE R100, fork in 304 stainless steel.",
  },
  {
    q: "Is there an all-season gravity cart?",
    a: "The Gravity Cart Sport (GC-SPORT-01, €2,890.00) is built for year-round use. The same chassis runs on wheels for pavement and gravel and on the Ski Assembly Kit for packed snow. Both assemblies are included.",
  },
  {
    q: "How much weight can the Gravity Cart Sport carry?",
    a: "The rated load is 120 kg.",
  },
  {
    q: "What descent grade is the ski conversion rated for?",
    a: "The Ski Assembly Kit (GC-SKI-200) is rated to a 25% descent grade on packed snow. It has a 780 mm ski length and a tool-free binding.",
  },
  {
    q: "Which brakes does the Gravity Cart Sport use and are they tested?",
    a: "The Shimano Dual Brake Kit (GC-BRK-180) is a hydraulic dual-disc set with 180 mm front and rear rotors, tested to ECE R100.",
  },
  {
    q: "Where can I buy it and what does it cost?",
    a: "Directly from GravityCart through this site, with no third-party dealer network. The Gravity Cart Sport costs €2,890.00.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Why GravityCart: convertible, certified gravity cart specs",
  url: `${SITE_URL}/why-gravitycart`,
  isPartOf: { "@type": "WebSite", name: "GravityCart", url: SITE_URL },
  about: {
    "@type": "Product",
    name: "Gravity Cart Sport",
    sku: "GC-SPORT-01",
    brand: { "@type": "Brand", name: "GravityCart" },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "GravityCart", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Why GravityCart", item: `${SITE_URL}/why-gravitycart` },
  ],
};

const linkCls =
  "text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white";

export default function WhyGravityCartPage() {
  return (
    <main className="relative min-h-screen bg-ink pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />

      <section className="relative bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              DIFFERENTIATION RECORD / GC-SPORT-01
            </p>
            <h1 className="max-w-2xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
              Why GravityCart: seven claims, each with a figure
            </h1>
            <p className="mt-6 max-w-xl font-mono text-[13px] leading-relaxed text-aluminum/70">
              The Gravity Cart Sport is a single convertible gravity cart for pavement, gravel and
              packed snow. Each difference below is stated as a measurable specification with the
              SKU it belongs to, so you can check it against any other maker.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-14">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">
              ID / CLAIM / PROOF / SKU
            </p>
            <div className="overflow-x-auto border-t border-aluminum/10">
              <table className="w-full min-w-[640px] border-collapse font-mono text-[12px]">
                <caption className="sr-only">
                  Differentiators of the Gravity Cart Sport with measurable proof and SKU
                </caption>
                <thead>
                  <tr className="border-b border-aluminum/10 text-left uppercase tracking-[0.12em] text-aluminum/50">
                    <th scope="col" className="py-3 pr-4 font-normal">ID</th>
                    <th scope="col" className="py-3 pr-4 font-normal">Claim</th>
                    <th scope="col" className="py-3 pr-4 font-normal">Proof</th>
                    <th scope="col" className="py-3 font-normal">SKU</th>
                  </tr>
                </thead>
                <tbody>
                  {LEDGER.map((row) => (
                    <tr key={row.id} className="border-b border-aluminum/10 align-top text-aluminum/80">
                      <td className="py-3 pr-4 tabular-nums text-white">{row.id}</td>
                      <td className="py-3 pr-4 text-white">{row.claim}</td>
                      <td className="py-3 pr-4">{row.proof}</td>
                      <td className="py-3 tabular-nums">{row.sku}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

          <FadeUp className="mt-14">
            <h2 className="font-display text-xl font-medium text-white">
              Five questions to ask any gravity cart maker
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 font-mono text-[13px] leading-relaxed text-aluminum/80">
              {CHECKLIST.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </FadeUp>

          <dl className="mt-14 divide-y divide-aluminum/10 border-t border-aluminum/10">
            {FAQ.map((item, i) => (
              <FadeUp key={item.q} delay={i * 0.05} className="py-6">
                <dt className="font-display text-lg font-medium text-white">{item.q}</dt>
                <dd className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed text-aluminum/80">
                  {item.a}
                </dd>
              </FadeUp>
            ))}
          </dl>

          <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.14em] text-aluminum/50">
            Related:{" "}
            <Link href="/product" className={linkCls}>
              Shop the GC-SPORT-01
            </Link>
            {" · "}
            <Link href="/compare" className={linkCls}>
              Sourced provider comparison
            </Link>
            {" · "}
            <Link href="/faq" className={linkCls}>
              Specification FAQ
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
