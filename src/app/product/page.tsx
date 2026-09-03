import type { Metadata } from "next";
import { fetchProducts } from "@/lib/checkout";
import { CartProvider } from "@/components/CartContext";
import { Nav } from "@/components/gc/Nav";
import { ProductCatalog } from "@/components/gc/ProductCatalog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop the GC-SPORT-01 Chassis & Certified Parts",
  description:
    "Order the Gravity Cart Sport convertible chassis, ski conversion kit, and certified spare assemblies — stainless fork, hydraulic brakes — direct from GravityCart.",
  alternates: { canonical: "/product" },
};

export default async function ProductPage() {
  const products = await fetchProducts();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description ?? undefined,
        url: `${SITE_URL}/product`,
        offers: {
          "@type": "Offer",
          priceCurrency: p.currency || "EUR",
          price: (p.price_cents / 100).toFixed(2),
          availability:
            p.stock !== null && p.stock <= 0
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <CartProvider>
      <main className="relative min-h-screen bg-ink pt-28">
        <Nav />
        {products.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
          />
        )}
        <ProductCatalog products={products} />
      </main>
    </CartProvider>
  );
}
