"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { VideoLoop } from "./VideoLoop";
import { WordStagger } from "./FadeUp";

const CLAUSES = "CE · ECE 2006/42/EG · ISO EN 12100 · ISO EN 4210 · SHIMANO CERTIFIED DRIVETRAIN";

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 500], [0, -40]);
  const copyOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 900], [1, 1.05]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="fixed inset-0 z-0 h-screen w-full"
        style={reduce ? undefined : { scale: videoScale }}
      >
        <VideoLoop src="/videos/hero.mp4" poster="/images/hero.png" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_45%,rgba(10,12,14,0.6),transparent_70%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16"
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="max-w-[720px]">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
            GC-SPORT / 01 — HOMOLOGATION RECORD
          </p>
          <h1 className="font-display text-[13vw] font-medium uppercase leading-[0.92] tracking-wide text-white md:text-[6.5rem]">
            <WordStagger text="ONE CHASSIS" startDelay={0.15} />
            <WordStagger text="WHEELS OR SKIS" startDelay={0.23} />
            <WordStagger text="CERTIFIED" startDelay={0.31} />
          </h1>
          <motion.p
            className="mt-6 max-w-[480px] font-sans text-base text-white/85 md:text-lg"
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          >
            One certified chassis, rated to 120kg, converts tool-free between wheel and
            ski assemblies — built for pavement, gravel and packed snow.
          </motion.p>
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
            className="mt-9"
          >
            <Link href="/product" className="inline-block">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block rounded-full bg-signal px-8 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
              >
                Shop the GC-SPORT-01
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 pb-6">
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 sm:block">
          {CLAUSES}
        </p>
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/60"
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}
