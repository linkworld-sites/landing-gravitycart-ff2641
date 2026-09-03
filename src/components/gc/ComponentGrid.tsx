"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { FadeUp } from "./FadeUp";

function ForkDiagram({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <line x1="100" y1="10" x2="100" y2="90" stroke={stroke} strokeWidth="2" />
      <circle cx="100" cy="10" r="5" fill="none" stroke={stroke} strokeWidth="1.5" />
      <line x1="100" y1="90" x2="60" y2="150" stroke={stroke} strokeWidth="2" />
      <line x1="100" y1="90" x2="140" y2="150" stroke={stroke} strokeWidth="2" />
      <line x1="100" y1="55" x2="150" y2="55" strokeDasharray="3 3" stroke={stroke} strokeWidth="1" />
      <circle cx="60" cy="150" r="4" fill={stroke} />
      <circle cx="140" cy="150" r="4" fill={stroke} />
    </svg>
  );
}

function SeatDiagram({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <rect x="40" y="30" width="80" height="14" rx="3" fill="none" stroke={stroke} strokeWidth="2" />
      <line x1="60" y1="44" x2="60" y2="130" stroke={stroke} strokeWidth="2" />
      <line x1="60" y1="130" x2="60" y2="150" stroke={stroke} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="45" y1="150" x2="75" y2="150" stroke={stroke} strokeWidth="1" />
      <line x1="130" y1="44" x2="180" y2="44" strokeDasharray="2 4" stroke={stroke} strokeWidth="1" />
      <line x1="130" y1="130" x2="180" y2="130" strokeDasharray="2 4" stroke={stroke} strokeWidth="1" />
    </svg>
  );
}

function BrakeDiagram({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <circle cx="100" cy="80" r="55" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="100" cy="80" r="30" fill="none" stroke={stroke} strokeWidth="2" />
      <rect x="118" y="65" width="26" height="30" rx="4" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="100" cy="80" r="5" fill={stroke} />
    </svg>
  );
}

function FrameDiagram({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 200 160" className="h-full w-full">
      <path d="M40 130 L100 40 L160 130 Z" fill="none" stroke={stroke} strokeWidth="2" />
      <line x1="100" y1="40" x2="100" y2="130" stroke={stroke} strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="40" cy="130" r="4" fill={stroke} />
      <circle cx="160" cy="130" r="4" fill={stroke} />
      <circle cx="100" cy="40" r="4" fill={stroke} />
    </svg>
  );
}

type Exhibit = {
  index: string;
  title: string;
  partNo: string;
  dark: boolean;
  diagram: (props: { stroke: string }) => ReactNode;
  specs: [string, string][];
};

const EXHIBITS: Exhibit[] = [
  {
    index: "A",
    title: "Stainless Steel Fork",
    partNo: "GC-FRK-100",
    dark: true,
    diagram: ForkDiagram,
    specs: [
      ["MATERIAL", "304 stainless"],
      ["RAKE", "42mm"],
      ["MOUNT", "Quick-release, tool-free"],
    ],
  },
  {
    index: "B",
    title: "Adjustable Seat",
    partNo: "GC-SET-220",
    dark: false,
    diagram: SeatDiagram,
    specs: [
      ["TRAVEL", "300mm + 100mm ext."],
      ["MATERIAL", "6061 aluminum rail"],
      ["ADJUST", "Toolless cam clamp"],
    ],
  },
  {
    index: "C",
    title: "Shimano Dual Brake",
    partNo: "GC-BRK-180",
    dark: true,
    diagram: BrakeDiagram,
    specs: [
      ["DISC Ø", "180mm front & rear"],
      ["ACTUATION", "Hydraulic dual-disc"],
      ["STANDARD", "ECE R100 tested"],
    ],
  },
  {
    index: "D",
    title: "Aluminum Frame",
    partNo: "GC-FRM-001",
    dark: false,
    diagram: FrameDiagram,
    specs: [
      ["ALLOY", "6061-T6, mono-material"],
      ["RATED LOAD", "120kg"],
      ["RECYCLABLE", "100% at end-of-life"],
    ],
  },
];

function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  const stroke = exhibit.dark ? "#C6CBCE" : "#1C1F22";
  const Diagram = exhibit.diagram;
  return (
    <FadeUp
      className={`group relative overflow-hidden border border-aluminum/10 p-8 ${
        exhibit.dark ? "bg-graphite text-aluminum" : "bg-aluminum text-graphite"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
        <span>EXHIBIT {exhibit.index}</span>
        <span className="tabular">{exhibit.partNo}</span>
      </div>

      <div className={`mx-auto my-6 h-40 w-40 ${exhibit.dark ? "opacity-90" : "opacity-80"}`}>
        <Diagram stroke={stroke} />
      </div>

      <motion.h3
        className="inline font-display text-2xl font-medium"
        whileHover="hover"
        initial="rest"
      >
        {exhibit.title}
        <motion.span
          className="mt-1 block h-[2px] bg-signal"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.h3>

      <table className={`mt-5 w-full font-mono text-[12.5px] ${exhibit.dark ? "text-aluminum/80" : "text-graphite/80"}`}>
        <tbody>
          {exhibit.specs.map(([label, value]) => (
            <tr key={label} className={`border-t ${exhibit.dark ? "border-aluminum/10" : "border-graphite/10"}`}>
              <td className="py-2 opacity-60">{label}</td>
              <td className="py-2 text-right tabular">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </FadeUp>
  );
}

export function ComponentGrid() {
  return (
    <section id="specs" className="relative bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            PARTS CATALOG
          </p>
          <h2 className="max-w-xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
            Off-the-shelf parts, on-the-shelf trails
          </h2>
        </FadeUp>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-aluminum/10 md:grid-cols-2">
          {EXHIBITS.map((exhibit) => (
            <ExhibitCard key={exhibit.index} exhibit={exhibit} />
          ))}
        </div>
      </div>
    </section>
  );
}
