import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://roastmyfaceit.example";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/disclaimer`, lastModified: now, priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, priority: 0.3 },
  ];
}
