import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/gc/Nav";
import { FadeUp } from "@/components/gc/FadeUp";
import { SITE_URL } from "@/lib/site";

// Only-this-brand element: a spec ledger that asks GravityCart and every named provider the
// same questions, and prints "not stated" instead of guessing where a source is silent.

export const metadata: Metadata = {
  title: "Downhill Gravity Carts Compared: GravityCart, Mountaincart, Luge Cart World",
  description:
    "An honest side-by-side of three gravity-cart providers. Each statement about another provider is taken from that provider's own website and linked to its source.",
  alternates: { canonical: "/compare" },
};

const SRC = {
  mcHome: "https://mountaincart.com/en/",
  mcProduct: "https://www.mountaincart.com/en/mountaincart-en",
  lcw: "https://lugecartworld.com/services/downhill-carts/",
};

type Cell = { text: string; href?: string; internal?: boolean };

const COLS = ["GravityCart", "Mountaincart GmbH", "Luge Cart World"] as const;

const ROWS: { id: string; question: string; cells: [Cell, Cell, Cell] }[] = [
  {
    id: "Q-01",
    question: "Who is the product aimed at and how is it bought?",
    cells: [
      {
        text: "Direct from GravityCart through its own storefront; no third-party retailer or dealer network. Operators have a dedicated programme page.",
        href: "/availability",
        internal: true,
      },
      {
        text: "Rented at rental stations, or bought privately in the Mountaincart shop in Bad Aibling, Germany. Business customers include cable railways and event operators.",
        href: SRC.mcProduct,
      },
      {
        text: "Sold to operators building a downhill cart attraction; the site invites operators to make contact. No private-purchase route is described.",
        href: SRC.lcw,
      },
    ],
  },
  {
    id: "Q-02",
    question: "What brakes does it use?",
    cells: [
      {
        text: "Shimano hydraulic dual-disc kit, 180mm front and rear rotors, tested to ECE R100.",
        href: "/faq",
        internal: true,
      },
      {
        text: "Hydraulic disc brakes in a dual-circuit braking system.",
        href: SRC.mcProduct,
      },
      {
        text: "Twin hydraulic discs in the rear wheels, operated by a brake lever.",
        href: SRC.lcw,
      },
    ],
  },
  {
    id: "Q-03",
    question: "What is it built from?",
    cells: [
      {
        text: "304 stainless steel fork with a tool-free quick-release mount. Chassis material is not stated on the product pages.",
        href: "/product",
        internal: true,
      },
      {
        text: "Lightweight aluminum construction.",
        href: SRC.mcProduct,
      },
      {
        text: "Durable high-density polymer plastic.",
        href: SRC.lcw,
      },
    ],
  },
  {
    id: "Q-04",
    question: "Which safety certification does it name?",
    cells: [
      {
        text: "ECE 2006/42/EG, ISO EN 12100 and ISO EN 4210 for the chassis; ECE R100 for the brake kit.",
        href: "/availability",
        internal: true,
      },
      {
        text: "Not stated on the pages read. The site describes safety features but names no standard.",
        href: SRC.mcProduct,
      },
      {
        text: "States the XL8 cart is internationally certified in Australia and Europe; no standard is named.",
        href: SRC.lcw,
      },
    ],
  },
  {
    id: "Q-05",
    question: "Does it run on snow as well as on wheels?",
    cells: [
      {
        text: "Yes. Certified ski assembly (GC-SKI-200, 780mm), rated to a 25% descent grade on packed snow.",
        href: "/faq",
        internal: true,
      },
      {
        text: "Described as usable all year round. A ski conversion is not described on the pages read.",
        href: SRC.mcProduct,
      },
      {
        text: "Not stated on the page read.",
        href: SRC.lcw,
      },
    ],
  },
  {
    id: "Q-06",
    question: "Who can ride it?",
    cells: [
      {
        text: "Adjustable seat for riders from age 12 to 99; rated load 120kg.",
        href: "/operators",
        internal: true,
      },
      {
        text: "Families with kids, the elderly and active sports riders.",
        href: SRC.mcProduct,
      },
      {
        text: "Suitable for children and adults, with a seat and foot wells that accommodate varying leg lengths.",
        href: SRC.lcw,
      },
    ],
  },
  {
    id: "Q-07",
    question: "Are replacement parts sold separately?",
    cells: [
      {
        text: "Yes. Fork (GC-FRK-100), ski kit (GC-SKI-200) and brake kit (GC-BRK-180) are separate SKUs.",
        href: "/product",
        internal: true,
      },
      { text: "Not stated on the pages read.", href: SRC.mcProduct },
      { text: "Not stated on the page read.", href: SRC.lcw },
    ],
  },
  {
    id: "Q-08",
    question: "What else does the provider offer?",
    cells: [
      {
        text: "Cart, ski kit, fork and brake kit as individual products.",
        href: "/product",
        internal: true,
      },
      {
        text: "A rental-station network. The site states 150+ rental stations in 30+ countries.",
        href: SRC.mcHome,
      },
      {
        text: "Luge track design, track barriers and cart return systems.",
        href: SRC.lcw,
      },
    ],
  },
  {
    id: "Q-09",
    question: "Is a price published?",
    cells: [
      {
        text: "Yes. Gravity Cart Sport (GC-SPORT-01): €2,890.00.",
        href: "/product",
        internal: true,
      },
      { text: "Not stated on the pages read.", href: SRC.mcProduct },
      { text: "Not stated on the page read.", href: SRC.lcw },
    ],
  },
];

const PROFILES = [
  {
    index: "P-01",
    name: "Mountaincart GmbH",
    site: SRC.mcHome,
    good: "An established name in the category. Its own site says the cart was developed more than 20 years ago and is produced by the family-owned company in Bad Aibling, and lists rental stations in more than 30 countries. If you want to ride a cart at a rental station rather than own one, that network is the place to start.",
    differs: "GravityCart is one convertible chassis with a certified ski assembly, a published price, named safety standards and standalone replacement parts, all sold direct.",
    sources: [
      { label: "Company overview", href: SRC.mcHome },
      { label: "Product and safety page", href: SRC.mcProduct },
    ],
  },
  {
    index: "P-02",
    name: "Luge Cart World",
    site: SRC.lcw,
    good: "Attraction building. Its own site offers the XL8 cart together with track design, barriers and return systems, so an operator can order a whole luge-style course. The cart is built from high-density polymer and states certification in Australia and Europe.",
    differs: "GravityCart sells a vehicle rather than a track package: a stainless-steel fork, hydraulic dual-disc brakes tested to a named standard (ECE R100), a certified snow configuration, and direct purchase.",
    sources: [{ label: "Downhill carts page", href: SRC.lcw }],
  },
];

function SourceLink({ cell }: { cell: Cell }) {
  if (!cell.href) return null;
  const cls =
    "ml-1 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:text-white";
  if (cell.internal) {
    return (
      <Link href={cell.href} className={cls}>
        [source]
      </Link>
    );
  }
  return (
    <a href={cell.href} target="_blank" rel="noopener noreferrer" className={cls}>
      [source]
    </a>
  );
}

export default function ComparePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Downhill gravity carts compared: GravityCart, Mountaincart, Luge Cart World",
    url: `${SITE_URL}/compare`,
    isPartOf: { "@type": "WebSite", name: "GravityCart", url: SITE_URL },
  };

  return (
    <main className="relative min-h-screen bg-ink pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section className="relative bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeUp>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              COMPARISON LEDGER / DOWNHILL GRAVITY CARTS
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
              Three gravity-cart providers, same nine questions
            </h1>
            <p className="mt-6 max-w-2xl font-mono text-[13px] leading-relaxed text-aluminum/70">
              GravityCart, Mountaincart GmbH and Luge Cart World all sell motorless carts that descend by gravity alone.
              They are built for different buyers. This page lays them side by side.
            </p>
            <p className="mt-4 max-w-2xl font-mono text-[12px] leading-relaxed text-aluminum/60">
              How we wrote it: about other providers we state only what their own website says, and every statement links to the
              page it comes from. Where a page does not say something, the table says so rather than guessing. About
              GravityCart we use only this site. Sources last read 12 October 2026.
            </p>
          </FadeUp>

          <div className="mt-16 space-y-10">
            {PROFILES.map((p, i) => (
              <FadeUp key={p.index} delay={i * 0.05}>
                <article className="border-t border-aluminum/10 pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">{p.index} / PROVIDER</p>
                  <h2 className="mt-2 font-display text-2xl font-medium text-white">{p.name}</h2>
                  <dl className="mt-4 grid gap-6 md:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Good at</dt>
                      <dd className="mt-2 font-mono text-[13px] leading-relaxed text-aluminum/80">{p.good}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">Where GravityCart differs</dt>
                      <dd className="mt-2 font-mono text-[13px] leading-relaxed text-aluminum/80">{p.differs}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-aluminum/50">
                    Sources:{" "}
                    {p.sources.map((s, k) => (
                      <span key={s.href}>
                        {k > 0 && " · "}
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
                        >
                          {s.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </article>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-20">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">
              Q / PROVIDER / ANSWER, EACH LINKED TO ITS SOURCE
            </p>
            <div className="overflow-x-auto border-t border-aluminum/10">
              <table className="w-full min-w-[900px] border-collapse font-mono text-[12px]">
                <caption className="sr-only">
                  Comparison of GravityCart, Mountaincart GmbH and Luge Cart World across nine identical questions
                </caption>
                <thead>
                  <tr className="border-b border-aluminum/10 text-left uppercase tracking-[0.12em] text-aluminum/50">
                    <th scope="col" className="w-[19%] py-3 pr-4 font-normal">
                      Question
                    </th>
                    {COLS.map((c) => (
                      <th key={c} scope="col" className="w-[27%] py-3 pr-4 font-normal">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.id} className="border-b border-aluminum/10 align-top text-aluminum/80">
                      <th scope="row" className="py-4 pr-4 text-left font-normal text-white">
                        <span className="block tabular-nums text-[10px] tracking-[0.16em] text-aluminum/50">{row.id}</span>
                        {row.question}
                      </th>
                      {row.cells.map((cell, k) => (
                        <td key={COLS[k]} className="py-4 pr-4 leading-relaxed">
                          {cell.text}
                          <SourceLink cell={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

          <FadeUp className="mt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">Which one fits</p>
            <ul className="mt-3 max-w-3xl space-y-3 font-mono text-[13px] leading-relaxed text-aluminum/80">
              <li>Want to try a cart at a rental station first: Mountaincart lists rental stations on its site.</li>
              <li>Planning a whole luge-style attraction with track, barriers and return system: Luge Cart World offers that package.</li>
              <li>
                Want to own a certified cart that converts between wheels and skis, with a published price and replaceable parts:{" "}
                <Link
                  href="/product"
                  className="text-white underline decoration-signal/60 underline-offset-4 transition-colors hover:text-signal"
                >
                  the Gravity Cart Sport
                </Link>
                .
              </li>
            </ul>
          </FadeUp>

          <p className="mt-14 border-t border-aluminum/10 pt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-aluminum/50">
            Related:{" "}
            <Link href="/faq" className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white">
              Specification FAQ
            </Link>
            {" · "}
            <Link href="/availability" className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white">
              Availability
            </Link>
            {" · "}
            <Link href="/operators" className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white">
              Operator programme
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
