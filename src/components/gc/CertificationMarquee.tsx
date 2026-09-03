"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";

const BADGES = [
  { code: "CE", sub: "CONFORMITÉ EUROPÉENNE" },
  { code: "ECE", sub: "2006/42/EG" },
  { code: "ISO", sub: "EN 12100" },
  { code: "ISO", sub: "EN 4210" },
  { code: "SHIM", sub: "CERTIFIED DRIVETRAIN" },
  { code: "CE", sub: "MACHINERY DIRECTIVE" },
  { code: "ECE", sub: "R100 BRAKE" },
  { code: "ISO", sub: "9001 QMS" },
];

function StampBadge({ code, sub }: { code: string; sub: string }) {
  return (
    <div className="liquid-glass flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-aluminum/15 md:h-16 md:w-16">
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
        <circle cx="32" cy="32" r="27" fill="none" stroke="#C6CBCE" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
      <span className="relative font-mono text-[11px] font-semibold tracking-[0.08em] text-aluminum">
        {code}
      </span>
      <span className="relative mt-0.5 max-w-[52px] text-center font-mono text-[6px] uppercase leading-tight tracking-[0.06em] text-aluminum/60">
        {sub}
      </span>
    </div>
  );
}

function Track({ reverse }: { reverse: boolean }) {
  return (
    <div
      className={`flex w-max gap-4 ${reverse ? "animate-marquee-right" : "animate-marquee-left"} [animation-play-state:running] hover:[animation-play-state:paused]`}
    >
      {[...BADGES, ...BADGES].map((b, i) => (
        <StampBadge key={`${b.code}-${b.sub}-${i}`} code={b.code} sub={b.sub} />
      ))}
    </div>
  );
}

export function CertificationMarquee() {
  return (
    <section id="certifications" className="relative bg-gradient-to-b from-transparent via-black/60 to-graphite py-20">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-aluminum/60">
            Certified to the same standards as the vehicles it&apos;s built like
          </p>
        </FadeUp>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <Track reverse={false} />
          <Track reverse={true} />
        </motion.div>
      </div>
    </section>
  );
}
