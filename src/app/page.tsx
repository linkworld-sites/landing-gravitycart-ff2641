import type { Metadata } from "next";
import { Nav } from "@/components/gc/Nav";
import { Hero } from "@/components/gc/Hero";
import { ExperienceSection } from "@/components/gc/ExperienceSection";
import { NumbersBand } from "@/components/gc/NumbersBand";
import { StepsRail } from "@/components/gc/StepsRail";
import { ComponentGrid } from "@/components/gc/ComponentGrid";
import { RiderVoices } from "@/components/gc/RiderVoices";
import { OperatorsTeaser } from "@/components/gc/OperatorsTeaser";
import { VideoCTA } from "@/components/gc/VideoCTA";

export const metadata: Metadata = {
  title: "GravityCart — Engineered Like a Car. Built for the Mountain.",
  description:
    "The Gravity Cart Sport: an all-season gravity vehicle engineered by automotive experts. One machine, every terrain.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink">
      <Nav />
      <Hero />
      <ExperienceSection />
      <NumbersBand />
      <StepsRail />
      <ComponentGrid />
      <RiderVoices />
      <OperatorsTeaser />
      <VideoCTA />
    </main>
  );
}
