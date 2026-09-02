import type { Metadata } from "next";
import { Inter, Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { EditBridge } from "@/components/EditBridge";
import { CookieConsent } from "@/components/CookieConsent";
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
  title: "GravityCart — Engineered Like a Car. Built for the Mountain.",
  description:
    "The Gravity Cart Sport: a certified, all-season gravity vehicle engineered by automotive experts. One machine, every terrain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <body className="bg-ink text-aluminum font-sans antialiased">
        <FunnelTracker />
        <EditBridge />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
