import siteMeta from "../../content/site-meta.json";
import { SITE_URL } from "@/lib/site";

export function organizationJsonLd() {
  const org = siteMeta.organization;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: org.name,
        url: SITE_URL,
        description: org.description,
        ...(org.logo ? { logo: `${SITE_URL}${org.logo}` } : {}),
        ...(org.sameAs.length > 0 ? { sameAs: org.sameAs } : {}),
      },
      {
        "@type": "WebSite",
        name: org.name,
        url: SITE_URL,
      },
    ],
  };
}

export function productJsonLd() {
  const p = siteMeta.product;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    sku: p.sku,
    name: p.name,
    description: p.description,
    url: `${SITE_URL}/product`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Rated load", value: `${p.ratedLoadKg}kg` },
      { "@type": "PropertyValue", name: "Fork material", value: p.material },
      { "@type": "PropertyValue", name: "Brakes", value: p.brakes },
      { "@type": "PropertyValue", name: "Certifications", value: p.certifications.join(", ") },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: p.priceCurrency,
      price: p.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/product`,
    },
  };
}

export function getFaq() {
  return siteMeta.faq;
}

export function faqJsonLd() {
  const faq = siteMeta.faq;
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
