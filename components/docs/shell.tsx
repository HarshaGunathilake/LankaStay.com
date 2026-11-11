import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, MessageCircle } from "lucide-react";
import { SitePage } from "@/components/site/site-page";
import { neighbours } from "@/lib/docs";
import { whatsappLink, type Site } from "@/lib/server/site";
import { DocsMobileNav, DocsSidebar, OnThisPage } from "./nav";

/** The frame of every help page: guides down the side, the page, and "On this page". */
export function DocsShell({ site, current, children }: { site: Site; current: string; children: React.ReactNode }) {
  return (
    <SitePage site={site}>
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[15.5rem_minmax(0,1fr)_12.5rem]">
        <DocsSidebar />
        <DocsMobileNav current={current} />
        <div className="min-w-0 pt-8 pb-24 lg:pt-12">{children}</div>
        <OnThisPage />
      </div>
    </SitePage>
  );
}

/** Bottom of a guide: the previous and next guides, and how to get help. */
export function DocFooter({ slug, site }: { slug: string; site: Site }) {
  const { prev, next } = neighbours(slug);
  const wa = site.phone ? whatsappLink(site.phone) : null;
  return (
    <footer className="mt-16 space-y-10">
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="group rounded-xl border border-lp-line bg-white p-4 transition-colors hover:border-lp-accent">
            <span className="flex items-center gap-1.5 text-[0.875rem] text-lp-muted">
              <ArrowLeft className="size-4" aria-hidden /> Previous
            </span>
            <span className="mt-1 block font-semibold group-hover:text-lp-accent">{prev.title}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link href={`/docs/${next.slug}`} className="group rounded-xl border border-lp-line bg-white p-4 text-right transition-colors hover:border-lp-accent">
            <span className="flex items-center justify-end gap-1.5 text-[0.875rem] text-lp-muted">
              Next <ArrowRight className="size-4" aria-hidden />
            </span>
            <span className="mt-1 block font-semibold group-hover:text-lp-accent">{next.title}</span>
          </Link>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl bg-lp-accent-soft/70 px-5 py-5 sm:px-6">
        <div className="min-w-0 flex-[1_1_16rem]">
          <p className="font-semibold">Still stuck?</p>
          <p className="text-[0.9375rem] text-lp-accent-ink">Tell us what you were trying to do. We reply ourselves, usually the same day.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 rounded-[0.625rem] bg-lp-accent px-4 font-semibold text-white hover:bg-lp-accent-deep">
              <MessageCircle className="size-[1.125rem]" aria-hidden /> WhatsApp us
            </a>
          ) : null}
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-2 rounded-[0.625rem] border border-[#b9cfc8] bg-white px-4 font-semibold hover:border-lp-accent">
            <Mail className="size-[1.125rem]" aria-hidden /> Contact us
          </Link>
        </div>
      </div>
    </footer>
  );
}
