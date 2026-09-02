// Signature element: the Mode Conversion Bay's scroll-scrubbed wheel↔ski
// crossfade with live torque callouts — no competitor's landing page can
// show its own product changing shape as you scroll.
import type { Metadata } from "next";
import { Nav } from "@/components/gc/Nav";
import { Hero } from "@/components/gc/Hero";
import { CertificationMarquee } from "@/components/gc/CertificationMarquee";
import { ModeConversionBay } from "@/components/gc/ModeConversionBay";
import { NumbersBand } from "@/components/gc/NumbersBand";
import { StepsRail } from "@/components/gc/StepsRail";
import { ComponentGrid } from "@/components/gc/ComponentGrid";
import { FAQ } from "@/components/gc/FAQ";
import { VideoCTA } from "@/components/gc/VideoCTA";
import { productJsonLd, faqJsonLd } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: "GravityCart — Engineered Like a Car. Built for the Mountain.",
  description:
    "The Gravity Cart Sport: a certified, all-season gravity vehicle engineered by automotive experts. One machine, every terrain.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqSchema = faqJsonLd();
  return (
    <main className="relative min-h-screen bg-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd()) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Nav />
      <Hero />
      <CertificationMarquee />
      <ModeConversionBay />
      <NumbersBand />
      <StepsRail />
      <ComponentGrid />
      <FAQ />
      <VideoCTA />
    </main>
  );
}
