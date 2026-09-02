import type { Metadata } from "next";
import { Inter, Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { EditBridge } from "@/components/EditBridge";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/site";
import { organizationJsonLd } from "@/lib/site-meta";
import "./globals.css";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Big_Shoulders({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});
const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GravityCart — Engineered Like a Car. Built for the Mountain.",
    template: "%s — GravityCart",
  },
  description:
    "The Gravity Cart Sport: a certified, all-season gravity vehicle engineered by automotive experts. One machine, every terrain.",
  alternates: { canonical: "/" },
  verification: { google: "WlJ66mw7eszwjs5WXh-HAJ_3n22gXQA1yf23ABf0enE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className="bg-ink text-aluminum font-sans antialiased">
        <FunnelTracker />
        <EditBridge />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
