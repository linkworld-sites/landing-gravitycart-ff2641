"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mountain, Compass, Home, Users } from "lucide-react";
import { FadeUp } from "./FadeUp";

const SEGMENTS = [
  { icon: Mountain, label: "Summer Lift Operators" },
  { icon: Compass, label: "Adventure Tour Operators" },
  { icon: Home, label: "Mountain Lodges & Huts" },
  { icon: Users, label: "Event & Group Rentals" },
];

export function OperatorsTeaser() {
  return (
    <section className="relative border-t border-aluminum/10 bg-graphite py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            FOR OPERATORS
          </p>
          <h2 className="font-display text-4xl font-medium uppercase leading-[0.95] text-aluminum md:text-5xl">
            Turn your slope into a summer attraction
          </h2>
          <p className="mt-6 max-w-xl text-aluminum/70">
            Lift operators, tour guides and mountain lodges run the Gravity Cart Sport as a
            rental fleet — one machine their guests can ride all season, on wheels or skis.
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SEGMENTS.map(({ icon: Icon, label }) => (
            <FadeUp
              key={label}
              className="flex flex-col items-center gap-3 border border-aluminum/10 bg-ink/40 px-4 py-8 text-center"
            >
              <Icon className="h-6 w-6 text-signal" strokeWidth={1.5} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-aluminum/80">
                {label}
              </span>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-12">
          <Link href="/operators" className="inline-block">
            <motion.span
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full bg-signal px-8 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
            >
              See Rental &amp; Operator Programs
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </motion.span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
