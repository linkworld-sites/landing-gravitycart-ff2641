import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import { Nav } from "@/components/gc/Nav";
import { CheckoutClient } from "@/components/gc/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Complete Your GravityCart Order",
  description:
    "Review your cart and complete your certified GravityCart order through secure hosted payment.",
  alternates: { canonical: "/checkout" },
};

export default function CheckoutPage() {
  return (
    <CartProvider>
      <main className="relative min-h-screen bg-ink pt-28">
        <Nav />
        <CheckoutClient />
      </main>
    </CartProvider>
  );
}
