import Link from "next/link";
import { FadeUp } from "./FadeUp";
import { getFaq } from "@/lib/site-meta";

export function FAQ() {
  const faq = getFaq();
  if (faq.length === 0) return null;

  return (
    <section id="faq" className="relative bg-ink py-24">
      <div className="mx-auto max-w-3xl px-6">
        <FadeUp>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            CERTIFICATION RECORD / FAQ
          </p>
          <h2 className="max-w-xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
            Specification questions, answered
          </h2>
        </FadeUp>

        <dl className="mt-14 divide-y divide-aluminum/10 border-t border-aluminum/10">
          {faq.map((item, i) => (
            <FadeUp key={item.q} delay={i * 0.05} className="py-6">
              <dt className="font-display text-lg font-medium text-white">{item.q}</dt>
              <dd className="mt-2 max-w-2xl font-mono text-[13px] leading-relaxed text-aluminum/80">
                {item.a}
              </dd>
            </FadeUp>
          ))}
        </dl>

        <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.14em] text-aluminum/50">
          Full test writeup:{" "}
          <Link
            href="/blog/2026-09-02-gravitycart-sport-launch"
            className="text-aluminum/80 underline decoration-aluminum/30 underline-offset-4 transition-colors hover:text-white"
          >
            One Chassis, Two Certified Modes
          </Link>
        </p>
      </div>
    </section>
  );
}
