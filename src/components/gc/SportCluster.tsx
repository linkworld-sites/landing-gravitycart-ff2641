import Link from "next/link";
import { SITE_URL } from "@/lib/site";

const PAGES = [
  {
    href: "/blog/2026-09-02-gravitycart-sport-launch",
    code: "SPEC-01",
    title: "One Chassis, Two Certified Modes",
    note: "Why the Gravity Cart Sport is built to automotive standards: ECE R100 brakes, 120kg rated load, ECE 2006/42/EG and ISO EN 12100 / 4210 documentation.",
  },
  {
    href: "/blog/2026-09-02-gravity-powered-descent-carts",
    code: "SPEC-02",
    title: "How the Descent Cart Converts",
    note: "Wheel-to-ski conversion: four M8 fasteners at 12Nm, tool-free quick-release, and the brake system that stays constant in both modes.",
  },
  {
    href: "/faq",
    code: "SPEC-03",
    title: "Specification & Certification FAQ",
    note: "Load rating, grade limits, certifications and servicing answered in one place.",
  },
  {
    href: "/product",
    code: "SPEC-04",
    title: "Shop the GC-SPORT-01",
    note: "The Gravity Cart Sport chassis (€2,890) and certified spares: stainless fork, ski kit, hydraulic dual-disc brakes.",
  },
] as const;

export function SportCluster({ current }: { current: string }) {
  const others = PAGES.filter((p) => p.href !== current);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Gravity Cart Sport (GC-SPORT-01): specification, certification and purchase",
    itemListElement: PAGES.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}${p.href}`,
    })),
  };

  return (
    <nav
      aria-label="Gravity Cart Sport reference pages"
      className="mt-16 border-t border-aluminum/15 pt-10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-aluminum/70">
        Gravity Cart Sport · GC-SPORT-01 reference
      </p>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {others.map((p) => (
          <li key={p.href} className="border border-aluminum/15 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-aluminum/60">
              {p.code}
            </p>
            <Link
              href={p.href}
              className="mt-2 block font-semibold text-aluminum underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
            >
              {p.title}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-aluminum/80">{p.note}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
