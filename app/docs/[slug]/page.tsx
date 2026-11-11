import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOC_BODIES } from "@/components/docs/pages";
import { DocFooter, DocsShell } from "@/components/docs/shell";
import { JsonLd } from "@/components/site/json-ld";
import { ALL_DOCS, findDoc } from "@/lib/docs";
import { breadcrumbs, pageMeta, webPage } from "@/lib/server/seo";
import { loadSite } from "@/lib/server/site";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return ALL_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);
  const site = await loadSite();
  if (!doc) return {};
  return pageMeta({ siteName: site.name, index: site.indexable, title: `${doc.title} | ${site.name} help`, description: doc.summary, path: `/docs/${slug}` });
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = findDoc(slug);
  const Body = DOC_BODIES[slug];
  if (!doc || !Body) notFound();
  const site = await loadSite();

  return (
    <DocsShell site={site} current={doc.title}>
      <JsonLd
        items={[
          webPage("TechArticle", `/docs/${slug}`, doc.title, doc.summary),
          breadcrumbs([
            { name: site.name, path: "/" },
            { name: "Help", path: "/docs" },
            { name: doc.title, path: `/docs/${slug}` },
          ]),
        ]}
      />
      <article className="max-w-[46rem]">
        <nav aria-label="Breadcrumb" className="text-[0.875rem] text-lp-muted">
          <Link href="/docs" className="hover:text-lp-accent">
            Help
          </Link>
          <span className="mx-1.5" aria-hidden>
            /
          </span>
          <span>{doc.section}</span>
        </nav>
        <h1 className="mt-3 font-display text-[2.25rem] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[2.75rem]">{doc.title}</h1>
        <p className="mt-3 text-[1.1875rem] leading-relaxed text-lp-muted">{doc.summary}</p>
        <div className="doc-body mt-8">
          <Body site={site} />
        </div>
        <DocFooter slug={slug} site={site} />
      </article>
    </DocsShell>
  );
}
