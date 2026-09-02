"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FadeUp } from "./FadeUp";

const STEPS = [
  {
    n: "01",
    title: "Concept Analysis",
    body: "Load cases, terrain envelopes and rider anthropometrics modeled before a single tube is cut.",
  },
  {
    n: "02",
    title: "Automotive-Grade Engineering",
    body: "Chassis and steering geometry validated with the same FEA methods used on production vehicles.",
  },
  {
    n: "03",
    title: "Downhill Brake Adaptation",
    body: "Shimano dual-disc hardware re-tuned for gravity loads well beyond standard cycle use.",
  },
  {
    n: "04",
    title: "CE / ISO Certification",
    body: "Independently tested against ECE 2006/42/EG, ISO EN 12100 and ISO EN 4210 before release.",
  },
  {
    n: "05",
    title: "Regional Parts Sourcing",
    body: "Wear components sourced from regional suppliers so service parts are never a bottleneck.",
  },
];

export function StepsRail() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink py-28">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.14]"
        style={{ backgroundImage: "url(/images/environment.png)" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            VALIDATION RECORD
          </p>
          <h2 className="max-w-2xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
            Built the way a vehicle is built
          </h2>
        </FadeUp>

        <div className="relative mt-20 hidden md:block">
          <svg className="absolute left-0 top-6 h-px w-full" viewBox="0 0 1000 2" preserveAspectRatio="none">
            <motion.line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="#8A9096"
              strokeWidth="1"
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="grid grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.08} className="relative pt-16">
                <motion.span
                  className="pointer-events-none absolute -left-2 -top-6 font-display text-[6.5rem] font-black leading-none text-white/[0.08]"
                  style={reduce ? undefined : { y: ghostY }}
                >
                  {step.n}
                </motion.span>
                <div className="absolute left-0 top-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-signal" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">{step.n}</p>
                <h3 className="mt-2 font-display text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-aluminum/70">{step.body}</p>
              </FadeUp>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-10 border-l border-aluminum/15 pl-6 md:hidden">
          {STEPS.map((step, i) => (
            <FadeUp key={step.n} delay={i * 0.05} className="relative">
              <span className="pointer-events-none absolute -left-6 -top-4 font-display text-5xl font-black leading-none text-white/[0.08]">
                {step.n}
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-aluminum/50">{step.n}</p>
              <h3 className="mt-2 font-display text-lg font-medium text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-aluminum/70">{step.body}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
