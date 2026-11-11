import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/server/seo";
import { loadSite } from "@/lib/server/site";

// Built per request, so it follows SITE_URL and the app's Super Admin → Settings → Website.
export const dynamic = "force-dynamic";

/** Search and answer engines may read the website, unless indexing is switched off or the site is "coming soon". */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const url = siteUrl();
  const site = await loadSite();
  if (!site.indexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/preview"] }], sitemap: `${url}/sitemap.xml`, host: url };
}
