"use client";

import { Sun, Users, Clock, Trophy } from "lucide-react";
import { FadeUp } from "./FadeUp";

const BENEFITS = [
  {
    icon: Sun,
    label: "New season, same lift",
    body: "Turn an existing chairlift into a summer attraction: guests ride up, then descend by cart down the same slopes used for winter sport.",
  },
  {
    icon: Users,
    label: "Built for the whole group",
    body: "The adjustable seat fits riders from age 12 to 99, so one machine serves the whole family.",
  },
  {
    icon: Clock,
    label: "Guests stay longer",
    body: "A guest activity that keeps visitors on-site longer instead of leaving right after the lift ride.",
  },
  {
    icon: Trophy,
    label: "Beyond single rides",
    body: "Corporate outings, team-building days and group races: a turnkey activity that scales from a handful of riders to a full fleet.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-graphite py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            FOR OPERATORS
          </p>
          <h2 className="font-display text-4xl font-medium uppercase leading-[0.95] text-aluminum md:text-6xl">
            The ride your guests will talk about all season
          </h2>
          <p className="mt-6 max-w-xl text-aluminum/70">
            Guests ride down the mountain. Operators fill their lift and their season. Here&apos;s
            what the Gravity Cart Sport means for both.
          </p>
        </FadeUp>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-aluminum/15 sm:grid-cols-2">
          {BENEFITS.map(({ icon: Icon, label, body }) => (
            <FadeUp key={label} className="bg-ink/40 p-8">
              <Icon className="h-6 w-6 text-signal" strokeWidth={1.5} />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-aluminum/80">
                {label}
              </p>
              <p className="mt-3 text-aluminum/70">{body}</p>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-10">
          <p className="max-w-xl text-sm text-aluminum/50">
            All of it runs on the same automotive-grade chassis — built to handle every guest,
            every day of the season.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
