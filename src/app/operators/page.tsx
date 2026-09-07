import type { Metadata } from "next";
import Link from "next/link";
import { Mountain, Compass, Home, Tent, Bike, Users, ArrowRight } from "lucide-react";
import { Nav } from "@/components/gc/Nav";
import { FadeUp } from "@/components/gc/FadeUp";

export const metadata: Metadata = {
  title: "Rental & Operator Programs",
  description:
    "Summer lift operators, adventure tour operators, mountain lodges and rental fleets: what the Gravity Cart Sport lets you offer your guests.",
  alternates: { canonical: "/operators" },
};

const SEGMENTS = [
  {
    icon: Mountain,
    title: "Summer Lift Operators",
    body: "Turn an existing chairlift into a summer attraction: guests ride up, then descend by cart on wheels down the same slopes used for winter sport.",
  },
  {
    icon: Compass,
    title: "Adventure Tour Operators",
    body: "Package a guided cart descent alongside via ferrata, e-bike or hiking tours — a bookable, photogenic centerpiece for a half-day itinerary.",
  },
  {
    icon: Home,
    title: "Mountain Lodges & Huts",
    body: "Offer cart rides as a guest activity that keeps visitors on-site longer, with tool-free wheel-to-ski conversion for whatever the season brings.",
  },
  {
    icon: Tent,
    title: "Holiday Parks & Campgrounds",
    body: "A family-friendly activity fleet — the adjustable seat fits riders from age 12 to 99, so one machine serves the whole group.",
  },
  {
    icon: Bike,
    title: "Bike Parks & Trail Centers",
    body: "Give non-bikers and families an accessible way to use the same downhill terrain, without competing for trail time with the bike fleet.",
  },
  {
    icon: Users,
    title: "Event & Group Rentals",
    body: "Corporate outings, team-building days and group races: a turnkey activity that scales from a handful of riders to a full fleet.",
  },
];

export default function OperatorsPage() {
  return (
    <main className="relative min-h-screen bg-ink pt-28">
      <Nav />

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-8 text-center">
        <FadeUp>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            GRAVITYCART FOR BUSINESS
          </p>
          <h1 className="font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-6xl">
            Give your guests something to talk about
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/70">
            The Gravity Cart Sport is built for rental and operator use as much as for private
            riders — one automotive-engineered chassis, tool-free wheel-to-ski conversion, and Shimano
            dual-disc brakes that hold up to all-day fleet use.
          </p>
        </FadeUp>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-aluminum/10 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((seg) => (
            <FadeUp
              key={seg.title}
              className="flex flex-col gap-4 border border-aluminum/10 bg-graphite p-8 text-aluminum"
            >
              <seg.icon className="h-7 w-7 text-signal" strokeWidth={1.5} />
              <h2 className="font-display text-xl font-medium uppercase text-white">{seg.title}</h2>
              <p className="text-[14px] leading-relaxed text-aluminum/75">{seg.body}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="border-t border-aluminum/10 bg-graphite py-24">
        <FadeUp className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-3xl font-medium uppercase leading-[0.95] text-white md:text-4xl">
            Talk to us about a rental partnership
          </h2>
          <p className="mt-5 text-aluminum/70">
            Tell us about your season, your terrain and your guest volume — we&apos;ll help you
            size a fleet.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:contact@gravitycart.at?subject=Rental%20%26%20operator%20inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-8 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
            >
              Email Us
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <Link
              href="/product"
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-8 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
            >
              Shop the GC-SPORT-01
            </Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
