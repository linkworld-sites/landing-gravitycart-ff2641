"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";

export function VideoCTA() {
  return (
    <section className="relative overflow-hidden bg-ink pt-32">
      <div className="relative flex min-h-[85vh] flex-col items-center justify-center px-6">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src="/videos/hero.mp4"
          poster="/images/hero.png"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-x-0 top-0 z-[1] h-[200px] bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-[200px] bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-0 z-[1] bg-ink/40" />

        <FadeUp className="relative z-10 max-w-2xl text-center">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            GC-SPORT / FINAL INSPECTION PASSED
          </p>
          <h2 className="font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-6xl">
            Shimano stops it. Gravity starts it.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-white/60">
            One machine, every season — engineered like a car, certified like one too.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-full bg-signal px-8 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
            >
              Book a Test Ride
            </motion.button>
            <motion.a
              href="#certifications"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="liquid-glass rounded-full px-8 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-white"
            >
              View Certification Record
            </motion.a>
          </div>
        </FadeUp>

        <footer className="relative z-10 mt-32 w-full max-w-6xl border-t border-white/10 pt-8 pb-4">
          <div className="flex flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/40 md:flex-row">
            <span>© 2026 GravityCart. All specifications subject to certification revision.</span>
            <nav className="flex items-center gap-6">
              <Link href="/blog" className="transition-colors hover:text-white">
                Journal
              </Link>
              <Link href="/legal/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Link href="/legal/cookies" className="transition-colors hover:text-white">
                Cookies
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </section>
  );
}
