"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FadeUp } from "./FadeUp";

const SNAP = [0.2, 0.8, 0.2, 1] as const;

function RegistrationMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`absolute h-4 w-4 text-graphite/50 ${className}`} aria-hidden>
      <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="1" />
      <circle cx="10" cy="10" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

type CalloutProps = {
  x: number;
  y: number;
  label: string;
  opacity: MotionValue<number>;
  align?: "left" | "right";
};

function Callout({ x, y, label, opacity, align = "right" }: CalloutProps) {
  const lineLen = align === "right" ? 34 : -34;
  return (
    <motion.g style={{ opacity }}>
      <line x1={x} y1={y} x2={x + lineLen} y2={y - 14} stroke="#1C1F22" strokeWidth="0.75" />
      <circle cx={x} cy={y} r="2" fill="#E63946" />
      <text
        x={x + lineLen + (align === "right" ? 3 : -3)}
        y={y - 14}
        fontSize="6.5"
        fontFamily="var(--font-mono)"
        fill="#1C1F22"
        textAnchor={align === "right" ? "start" : "end"}
      >
        {label}
      </text>
    </motion.g>
  );
}

export function ModeConversionBay() {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });
  const mode = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  const wheelOpacity = useTransform(mode, [0, 0.42], [1, 0]);
  const wheelScale = useTransform(mode, [0, 0.5], [1, 0.6]);
  const skiOpacity = useTransform(mode, [0.58, 1], [0, 1]);
  const skiTilt = useTransform(mode, [0.5, 1], [-8, 0]);

  const calloutW1 = useTransform(mode, [0, 0.3], [1, 0]);
  const calloutW2 = useTransform(mode, [0, 0.36], [1, 0]);
  const calloutS1 = useTransform(mode, [0.64, 1], [0, 1]);
  const calloutS2 = useTransform(mode, [0.7, 1], [0, 1]);

  const thumbLeft = useTransform(mode, [0, 1], ["4%", "58%"]);
  const summerOpacity = useTransform(mode, [0, 0.5], [1, 0.35]);
  const winterOpacity = useTransform(mode, [0.5, 1], [0.35, 1]);

  return (
    <section id="bay" className="relative bg-graphite">
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <FadeUp>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            EXHIBIT / MODE-CONVERSION BAY
          </p>
          <h2 className="max-w-xl font-display text-4xl font-medium uppercase leading-[0.95] text-aluminum md:text-6xl">
            One chassis. Two certified configurations.
          </h2>
        </FadeUp>
      </div>

      <div ref={wrapperRef} className="relative mt-12 h-[280vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center px-6">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-sm border border-aluminum/30 bg-aluminum noise-overlay">
            <RegistrationMark className="left-3 top-3" />
            <RegistrationMark className="right-3 top-3" />
            <RegistrationMark className="bottom-3 left-3" />
            <RegistrationMark className="bottom-3 right-3" />

            <div
              className="pointer-events-none absolute inset-6 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0, transparent calc(100%/12 - 1px), #1C1F22 calc(100%/12 - 1px), #1C1F22 calc(100%/12))",
              }}
            />

            <div className="relative flex flex-col items-center gap-6 px-8 py-10 md:py-14">
              <div className="flex w-full max-w-xs items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
                <motion.span style={reduce ? undefined : { opacity: summerOpacity }}>SUMMER</motion.span>
                <motion.span style={reduce ? undefined : { opacity: winterOpacity }}>WINTER</motion.span>
              </div>
              <div className="relative h-8 w-full max-w-xs rounded-full border border-graphite/30 bg-graphite/10">
                <motion.div
                  className="absolute top-1/2 h-6 w-[38%] -translate-y-1/2 rounded-full bg-graphite shadow-sm"
                  style={reduce ? { left: "4%" } : { left: thumbLeft }}
                  transition={{ ease: SNAP, duration: 0.15 }}
                />
              </div>

              <svg viewBox="0 0 320 380" className="h-[42vh] max-h-[380px] w-auto">
                <line x1="160" y1="20" x2="160" y2="360" stroke="#1C1F22" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="140" y="60" width="40" height="260" rx="14" fill="none" stroke="#1C1F22" strokeWidth="1.5" />
                <line x1="160" y1="30" x2="160" y2="60" stroke="#1C1F22" strokeWidth="1.5" />
                <circle cx="160" cy="30" r="6" fill="none" stroke="#1C1F22" strokeWidth="1.5" />

                <motion.g style={reduce ? undefined : { opacity: wheelOpacity, scale: wheelScale }}>
                  <circle cx="160" cy="100" r="34" fill="none" stroke="#1C1F22" strokeWidth="2" />
                  <circle cx="160" cy="100" r="6" fill="#1C1F22" />
                </motion.g>
                <motion.g style={reduce ? undefined : { opacity: wheelOpacity, scale: wheelScale }}>
                  <circle cx="160" cy="300" r="34" fill="none" stroke="#1C1F22" strokeWidth="2" />
                  <circle cx="160" cy="300" r="6" fill="#1C1F22" />
                </motion.g>

                <motion.g style={reduce ? { opacity: 0 } : { opacity: skiOpacity, rotate: skiTilt }}>
                  <rect x="130" y="72" width="60" height="18" rx="8" fill="none" stroke="#8A9096" strokeWidth="2" />
                </motion.g>
                <motion.g style={reduce ? { opacity: 0 } : { opacity: skiOpacity, rotate: skiTilt }}>
                  <rect x="130" y="290" width="60" height="18" rx="8" fill="none" stroke="#8A9096" strokeWidth="2" />
                </motion.g>

                {!reduce && (
                  <>
                    <Callout x={194} y={100} label="4× M8 — 12Nm" opacity={calloutW1} align="right" />
                    <Callout x={126} y={100} label="WHEEL HUB · QR-LEVER" opacity={calloutW2} align="left" />
                    <Callout x={194} y={300} label="2× M10 — 18Nm" opacity={calloutS1} align="right" />
                    <Callout x={126} y={300} label="SKI BINDING · TOOL-FREE" opacity={calloutS2} align="left" />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-aluminum/15 md:grid-cols-2">
          {[
            {
              title: "WHEEL MODE",
              accent: "text-signal",
              rows: [
                ["SURFACE", "Gravel, tarmac, hardpack"],
                ["TERRAIN GRADE", "≤ 18% descent"],
                ["WHEEL Ø", "20\" / 406mm"],
                ["RATED LOAD", "120kg"],
              ],
            },
            {
              title: "SKI MODE",
              accent: "text-steel",
              rows: [
                ["SURFACE", "Groomed piste, packed snow"],
                ["TERRAIN GRADE", "≤ 25% descent"],
                ["SKI LENGTH", "780mm"],
                ["RATED LOAD", "120kg"],
              ],
            },
          ].map((card) => (
            <FadeUp key={card.title} className="bg-graphite p-8">
              <p className={`mb-6 font-mono text-[11px] uppercase tracking-[0.22em] ${card.accent}`}>{card.title}</p>
              <table className="w-full font-mono text-[13px] text-aluminum/85">
                <tbody>
                  {card.rows.map(([label, value]) => (
                    <tr key={label} className="border-t border-aluminum/10">
                      <td className="py-2.5 text-aluminum/50">{label}</td>
                      <td className="py-2.5 text-right tabular">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
