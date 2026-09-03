import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getLegalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = ["", "/product", "/checkout", "/checkout/success", "/blog"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));

  const posts = getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified,
  }));

  const legal = getLegalSlugs().map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified,
  }));

  return [...staticPages, ...posts, ...legal];
}
