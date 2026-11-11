import type { MetadataRoute } from "next";
import { PUBLIC_PAGES, siteUrl } from "@/lib/server/seo";
import { loadSite } from "@/lib/server/site";

// Built per request, so it follows SITE_URL and the app's Super Admin → Settings → Website.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await loadSite();
  if (!site.indexable) return [];
  const url = siteUrl();
  return PUBLIC_PAGES.map((p) => ({ url: `${url}${p.path === "/" ? "" : p.path}`, lastModified: new Date(), changeFrequency: p.changeFrequency, priority: p.priority }));
}
