import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";
import { productJsonLd, getFaq, faqJsonLd } from "@/lib/site-meta";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description || undefined,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const faq = getFaq();
  const faqSchema = faqJsonLd();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || undefined,
    datePublished: post.date || undefined,
    url: `${SITE_URL}/blog/${slug}`,
    author: { "@type": "Organization", name: "GravityCart" },
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
      <Link href="/blog" className="underline opacity-70">← All posts</Link>
      <h1 className="mt-8 text-4xl font-bold tracking-tight">{post.title}</h1>
      {post.date && <p className="mt-2 text-sm opacity-60">{post.date}</p>}
      <article
        className="post-body mt-10"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      {faq.length > 0 && (
        <section className="mt-16 border-t border-aluminum/15 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-aluminum/70">
            FAQ
          </p>
          <dl className="mt-6 space-y-6">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-aluminum/10 pb-6">
                <dt className="font-semibold text-aluminum">{item.q}</dt>
                <dd className="mt-2 text-aluminum/80 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </main>
  );
}
