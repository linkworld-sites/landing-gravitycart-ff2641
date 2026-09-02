"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FadeUp } from "./FadeUp";

function CountUp({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 800;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const METRICS = [
  { node: <CountUp target={180} prefix="Ø" suffix="mm" />, label: "FRONT & REAR BRAKE DISC" },
  { node: <span className="tabular">300+100mm</span>, label: "SEAT TRAVEL — LOW + EXTENSION" },
  { node: <CountUp target={100} suffix="%" />, label: "RECYCLABLE FRAME ALLOY" },
  { node: <CountUp target={1} />, label: "CHASSIS. EVERY SEASON." },
];

export function NumbersBand() {
  return (
    <section className="relative -mt-16 rounded-t-[2.5rem] bg-ink pb-24 pt-24 shadow-[0_-40px_80px_rgba(0,0,0,0.4)]">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp>
          <p className="mx-auto max-w-xl text-center font-sans text-sm text-aluminum/60 md:text-base">
            Every figure below is a homologated spec, not a marketing rounding — measured the way the automotive
            industry measures.
          </p>
        </FadeUp>
        <div className="mt-14 grid grid-cols-2 divide-x divide-y divide-aluminum/10 border border-aluminum/10 md:grid-cols-4 md:divide-y-0">
          {METRICS.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.08} className="flex flex-col items-center justify-center px-4 py-10 text-center">
              <div className="font-display text-[3.2rem] font-light leading-none text-white md:text-[4.5rem]">
                {m.node}
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-aluminum/60">{m.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
