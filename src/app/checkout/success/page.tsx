import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/gc/Nav";
import { CheckoutSuccessClient } from "@/components/gc/CheckoutSuccessClient";

export const metadata: Metadata = {
  title: "Order Confirmed — GravityCart",
  description: "Your certified GravityCart order has been placed and payment confirmed.",
  alternates: { canonical: "/checkout/success" },
};

export default function CheckoutSuccessPage() {
  return (
    <main className="relative min-h-screen bg-ink pt-28">
      <Nav />
      <Suspense fallback={null}>
        <CheckoutSuccessClient />
      </Suspense>
    </main>
  );
}
