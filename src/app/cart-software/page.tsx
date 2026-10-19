import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/gc/Nav";
import { FadeUp } from "@/components/gc/FadeUp";
import { SITE_URL } from "@/lib/site";

// Only-this-brand element: a name-collision ledger — the page states plainly what a "cart" is
// in e-commerce software vs. here, and routes software buyers away instead of pretending to serve them.

export const metadata: Metadata = {
  title: "GravityCart Is Not E-commerce Cart Software: It Is a Vehicle",
  description:
    "Looking for e-commerce shopping cart software? GravityCart is not software. It makes certified physical gravity carts, sold direct. Here is the difference, with SKUs and prices.",
  alternates: { canonical: "/cart-software" },
};

const LEDGER: { id: string; attribute: string; software: string; gravitycart: string }[] = [
  {
    id: "D-01",
    attribute: "What \"cart\" means",
    software: "A basket on a website that holds items before payment.",
    gravitycart: "A wheeled and skied vehicle, the Gravity Cart Sport (GC-SPORT-01), for pavement, gravel and packed snow.",
  },
  {
    id: "D-02",
    attribute: "What you receive",
    software: "A hosted or installable application.",
    gravitycart: "A physical chassis with certified wheel and ski assemblies included. Rated load 120 kg.",
  },
  {
    id: "D-03",
    attribute: "Price on this site",
    software: "Not applicable. GravityCart sells no software.",
    gravitycart: "GC-SPORT-01 €2,890.00; Ski Assembly Kit GC-SKI-200 €680.00; Stainless Steel Fork GC-FRK-100 €420.00; Shimano Dual Brake Kit GC-BRK-180 €215.00.",
  },
  {
    id: "D-04",
    attribute: "Safety and certification",
    software: "Not applicable.",
    gravitycart: "Stated standards: ECE 2006/42/EG, ISO EN 12100, ISO EN 4210; brake kit ECE R100 tested.",
  },
  {
    id: "D-05",
    attribute: "How it is sold",
    software: "Not applicable.",
    gravitycart: "Direct from GravityCart through this storefront; no third-party retailer or dealer network.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is GravityCart e-commerce cart software?",
    a: "No. GravityCart is a manufacturer of physical gravity carts. It does not sell shopping cart software, plugins or a hosted checkout product. Its only products are the Gravity Cart Sport (GC-SPORT-01) and three certified components: the Ski Assembly Kit (GC-SKI-200), the Stainless Steel Fork (GC-FRK-100) and the Shimano Dual Brake Kit (GC-BRK-180).",
  },
  {
    q: "What is a gravity cart?",
    a: "A gravity cart is a gravity-powered descent vehicle. The Gravity Cart Sport is a convertible chassis: certified wheel and ski assemblies are included, so one machine covers pavement, gravel and packed snow. Rated load is 120 kg.",
  },
  {
    q: "Why does a vehicle company have a shop with a cart on its website?",
    a: "Because customers buy the Gravity Cart Sport and its components directly here. The shopping cart on this site is only the basket for those physical products. GravityCart does not license or sell it.",
  },
  {
    q: "Where can I buy the Gravity Cart Sport?",
    a: "Directly from GravityCart through the storefront on this site. There is no third-party retailer or dealer network. The Gravity Cart Sport costs €2,890.00.",
  },
  {
    q: "Which safety standards apply to the Gravity Cart Sport?",
    a: "The published ledger lists ECE 2006/42/EG, ISO EN 12100 and ISO EN 4210 for the GC-SPORT-01 chassis, and ECE R100 testing for the Shimano Dual Brake Kit (GC-BRK-180).",
  },
];

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
    { "@type": "ListItem", position: 2, name: "Cart software or cart vehicle", item: `${SITE_URL}/cart-software` },
  ],
};

const linkCls =
  "text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white";

export default function CartSoftwarePage() {
  return (
    <main className="relative min-h-screen bg-ink pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Nav />

      <section className="relative bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeUp>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              DISAMBIGUATION RECORD / CART SOFTWARE
            </p>
            <h1 className="max-w-2xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
              GravityCart is not e-commerce cart software
            </h1>
            <p className="mt-6 max-w-xl font-mono text-[13px] leading-relaxed text-aluminum/70">
              If you searched for shopping cart software for an online store, this is the wrong
              site. GravityCart builds certified physical gravity carts and sells them direct. The
              table below separates the two meanings of &ldquo;cart&rdquo;.
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-14">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">
              ID / ATTRIBUTE / SOFTWARE CART / GRAVITYCART
            </p>
            <div className="overflow-x-auto border-t border-aluminum/10">
              <table className="w-full min-w-[640px] border-collapse font-mono text-[12px]">
                <caption className="sr-only">
                  Comparison of e-commerce cart software with the GravityCart physical gravity cart
                </caption>
                <thead>
                  <tr className="border-b border-aluminum/10 text-left uppercase tracking-[0.12em] text-aluminum/50">
                    <th scope="col" className="py-3 pr-4 font-normal">ID</th>
                    <th scope="col" className="py-3 pr-4 font-normal">Attribute</th>
                    <th scope="col" className="py-3 pr-4 font-normal">E-commerce cart software</th>
                    <th scope="col" className="py-3 font-normal">GravityCart</th>
                  </tr>
                </thead>
                <tbody>
                  {LEDGER.map((row) => (
                    <tr key={row.id} className="border-b border-aluminum/10 align-top text-aluminum/80">
                      <td className="py-3 pr-4 tabular-nums text-white">{row.id}</td>
                      <td className="py-3 pr-4 text-white">{row.attribute}</td>
                      <td className="py-3 pr-4">{row.software}</td>
                      <td className="py-3">{row.gravitycart}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <Link href="/faq" className={linkCls}>
              Specification FAQ
            </Link>
            {" · "}
            <Link href="/availability" className={linkCls}>
              Retailer &amp; regional availability
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
