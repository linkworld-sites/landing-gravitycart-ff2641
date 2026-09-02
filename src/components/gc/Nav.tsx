"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/#certifications", label: "CERTIFICATION" },
  { href: "/#bay", label: "CONVERSION BAY" },
  { href: "/#specs", label: "PARTS CATALOG" },
];

const ROUTE_LINKS = [
  { href: "/product", label: "SHOP" },
  { href: "/checkout", label: "CHECKOUT" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      className="group relative font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
      whileTap={{ scale: 0.96 }}
    >
      {label}
      <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </motion.a>
  );
}

function NavRouteLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.span className="inline-block" whileTap={{ scale: 0.96 }}>
      <Link
        href={href}
        className="group relative font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
      >
        {label}
        <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-signal transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </Link>
    </motion.span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 font-mono transition-colors duration-300 md:px-10 ${
        scrolled ? "bg-ink/85 backdrop-blur-sm border-b border-aluminum/10" : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
        GRAVITYCART <span className="text-white/40">// GC-SPORT-01</span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        {LINKS.map((l) => (
          <NavLink key={l.href} {...l} />
        ))}
        {ROUTE_LINKS.map((l) => (
          <NavRouteLink key={l.href} {...l} />
        ))}
        <Link href="/blog" className="text-[11px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white">
          JOURNAL
        </Link>
      </nav>
    </header>
  );
}
