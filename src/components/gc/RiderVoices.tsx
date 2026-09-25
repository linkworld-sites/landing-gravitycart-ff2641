"use client";

import { Quote } from "lucide-react";
import { FadeUp } from "./FadeUp";

const SLOTS = [
  { label: "FIRST RIDE REPORTS" },
  { label: "OPERATOR & RENTAL FEEDBACK" },
  { label: "LONG-TERM DURABILITY NOTES" },
];

export function RiderVoices() {
  return (
    <section className="relative border-t border-aluminum/10 bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            WHAT RIDERS SAY
          </p>
          <h2 className="font-display text-4xl font-medium uppercase leading-[0.95] text-aluminum md:text-5xl">
            Rider stories are coming
          </h2>
          <p className="mt-6 max-w-xl text-aluminum/70">
            The Gravity Cart Sport is new to the road. We&apos;re not publishing quotes we
            don&apos;t have — this section will fill with real rider and operator voices as
            they come in.
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SLOTS.map(({ label }, i) => (
            <FadeUp
              key={label}
              delay={i * 0.08}
              className="flex flex-col items-center justify-center gap-4 border border-dashed border-aluminum/20 bg-graphite/40 px-6 py-12 text-center"
            >
              <Quote className="h-6 w-6 text-aluminum/30" strokeWidth={1.5} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-aluminum/50">
                {label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-aluminum/30">
                Awaiting first submissions
              </span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
