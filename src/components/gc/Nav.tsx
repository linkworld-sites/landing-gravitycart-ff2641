"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#experience", label: "FOR OPERATORS" },
  { href: "/#specs", label: "ENGINEERING" },
];

const ROUTE_LINKS = [
  { href: "/operators", label: "OPERATORS" },
  { href: "/product", label: "SHOP" },
  { href: "/faq", label: "FAQ" },
  { href: "/availability", label: "AVAILABILITY" },
  { href: "/compare", label: "COMPARE" },
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 font-mono transition-colors duration-300 md:px-10 ${
        scrolled || open ? "bg-ink/85 backdrop-blur-sm border-b border-aluminum/10" : "bg-transparent"
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
          BLOG
        </Link>
      </nav>

      <div className="flex items-center gap-4 md:hidden">
        <Link
          href="/product"
          className="rounded-full bg-signal px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white"
        >
          Shop
        </Link>
        <motion.button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center text-white"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-aluminum/10 bg-ink/95 px-6 py-4 backdrop-blur-sm md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
            {ROUTE_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="py-3 text-[12px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
            >
              BLOG
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
