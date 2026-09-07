"use client";

import { motion } from "framer-motion";
import { FadeUp } from "./FadeUp";

type Exhibit = {
  index: string;
  title: string;
  partNo: string;
  dark: boolean;
  image: string;
  description: string;
  specs: [string, string][];
};

const EXHIBITS: Exhibit[] = [
  {
    index: "A",
    title: "Stainless Steel Fork",
    partNo: "GC-FRK-100",
    dark: true,
    image: "/images/product/fork.jpg",
    description:
      "Optimised for enhanced steering behavior and driving dynamics, the stainless steel steering fork absorbs shocks and holds its form ride after ride — its layout also carries a fixation point for a dedicated towing device.",
    specs: [
      ["MATERIAL", "304 stainless steel"],
      ["MOUNT", "Quick-release, tool-free"],
      ["DURABILITY", "Shock-absorbing, form-stable"],
    ],
  },
  {
    index: "B",
    title: "Adjustable Seat",
    partNo: "GC-SET-220",
    dark: false,
    image: "/images/product/seat.jpg",
    description:
      "A well-dimensioned backrest and a durable two-part cover balance comfort and safety. Slide the seat 300mm, then extend another 100mm by converting the seat rest — one cart, every rider from age 12 to 99.",
    specs: [
      ["TRAVEL", "300mm + 100mm ext."],
      ["FIT", "Age 12 – 99"],
      ["COVER", "Two-part, quick-replace"],
    ],
  },
  {
    index: "C",
    title: "Shimano Dual Brake",
    partNo: "GC-BRK-180",
    dark: true,
    image: "/images/product/brake.jpg",
    description:
      "Proven Shimano hardware from the downhill-bike world, adapted for the road. Independent front and rear actuation resists fade under heat and keeps worn parts a five-minute swap.",
    specs: [
      ["DISC Ø", "180mm front & rear"],
      ["ACTUATION", "Independent, cable-actuated"],
      ["SERVICE", "5-minute part swap"],
    ],
  },
  {
    index: "D",
    title: "Aluminum Frame",
    partNo: "GC-FRM-001",
    dark: false,
    image: "/images/product/frame.jpg",
    description:
      "The unisize aluminum frame carries every critical part directly to its structure, keeping service access simple and the modular design fully recyclable at the end of its life.",
    specs: [
      ["ALLOY", "6061-T6, mono-material"],
      ["RATED LOAD", "120kg"],
      ["RECYCLABLE", "100% at end-of-life"],
    ],
  },
];

function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  return (
    <FadeUp
      className={`group relative overflow-hidden border border-aluminum/10 ${
        exhibit.dark ? "bg-graphite text-aluminum" : "bg-aluminum text-graphite"
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={exhibit.image}
          alt={exhibit.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink/70 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
          <span>EXHIBIT {exhibit.index}</span>
          <span className="tabular">{exhibit.partNo}</span>
        </div>
      </div>

      <div className="p-8">
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

        <p className={`mt-4 text-[14px] leading-relaxed ${exhibit.dark ? "text-aluminum/75" : "text-graphite/75"}`}>
          {exhibit.description}
        </p>

        <table className={`mt-6 w-full font-mono text-[12.5px] ${exhibit.dark ? "text-aluminum/80" : "text-graphite/80"}`}>
          <tbody>
            {exhibit.specs.map(([label, value]) => (
              <tr key={label} className={`border-t ${exhibit.dark ? "border-aluminum/10" : "border-graphite/10"}`}>
                <td className="py-2 opacity-60">{label}</td>
                <td className="py-2 text-right tabular">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FadeUp>
  );
}

export function ComponentGrid() {
  return (
    <section id="specs" className="relative bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <FadeUp>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
              GC-SPORT / ENGINEERED IN DETAIL
            </p>
            <h2 className="max-w-xl font-display text-4xl font-medium uppercase leading-[0.95] text-white md:text-5xl">
              Four systems, one engineered machine
            </h2>
            <p className="mt-6 max-w-md text-white/60">
              Developed with automotive-experienced engineers and validated across tarmac,
              gravel, grass and snow, every refinement below exists to keep the ride simple,
              serviceable and safe.
            </p>
          </FadeUp>
          <FadeUp className="flex justify-center bg-aluminum p-10 md:p-12">
            <img
              src="/images/product/studio.jpg"
              alt="Gravity Cart Sport, studio view"
              className="h-auto w-full max-w-md object-contain"
            />
          </FadeUp>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-aluminum/10 md:grid-cols-2">
          {EXHIBITS.map((exhibit) => (
            <ExhibitCard key={exhibit.index} exhibit={exhibit} />
          ))}
        </div>
      </div>
    </section>
  );
}
