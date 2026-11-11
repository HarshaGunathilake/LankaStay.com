import type { Metadata } from "next";
import Link from "next/link";
import { BedDouble, CalendarCheck2, CircleUserRound, Rocket, Wallet } from "lucide-react";
import { DocsShell } from "@/components/docs/shell";
import { JsonLd } from "@/components/site/json-ld";
import { DOC_SECTIONS } from "@/lib/docs";
import { appLink } from "@/lib/links";
import { breadcrumbs, pageMeta, webPage } from "@/lib/server/seo";
import { loadSite } from "@/lib/server/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await loadSite();
  return pageMeta({
    siteName: site.name,
    index: site.indexable,
    title: `Help and guides | ${site.name}`,
    description: `Step-by-step guides, with screenshots, for every part of ${site.name}: bookings, rooms, guests, payments, invoices, expenses, bills, staff payslips and reports.`,
    path: "/docs",
  });
}

const ICONS = [Rocket, BedDouble, CalendarCheck2, Wallet, CircleUserRound];

const START = [
  { to: "create-account", title: "Create your account", text: "Register and confirm your email." },
  { to: "setup-checklist", title: "Set up in 10 minutes", text: "Rooms, prices and your first booking." },
  { to: "new-booking", title: "Make a booking", text: "The whole villa or single rooms." },
  { to: "check-in-out", title: "Check-in and check-out", text: "Extras, the final bill and settling up." },
];

export default async function DocsHome() {
  const site = await loadSite();
  return (
    <DocsShell site={site} current="All guides">
      <JsonLd
        items={[
          webPage("CollectionPage", "/docs", `${site.name} help`, `Guides for every part of ${site.name}.`),
          breadcrumbs([
            { name: site.name, path: "/" },
            { name: "Help", path: "/docs" },
          ]),
        ]}
      />
      <section className="max-w-[50rem]">
        <p className="text-[0.9375rem] font-semibold text-lp-accent">Help and guides</p>
        <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] font-bold tracking-[-0.035em] sm:text-[3.25rem]">How to use {site.name}</h1>
        <p className="mt-4 text-[1.1875rem] leading-relaxed text-lp-muted">
          Step-by-step guides with screenshots for every part of the app, from your first booking to staff payslips and monthly reports. Search with the box on the left, or press{" "}
          <kbd className="rounded border border-lp-line bg-white px-1.5 text-[0.9375rem]">/</kbd>.
        </p>
      </section>

      <section aria-labelledby="start" className="mt-10">
        <h2 id="start" className="font-display text-xl font-bold tracking-tight">
          New here? Start with these
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {START.map((s, i) => (
            <li key={s.to}>
              <Link href={`/docs/${s.to}`} className="group flex h-full flex-col rounded-xl border border-lp-line bg-white p-4 transition-colors hover:border-lp-accent">
                <span className="grid size-7 place-items-center rounded-full bg-lp-accent text-[0.8125rem] font-bold text-white">{i + 1}</span>
                <span className="mt-3 font-semibold group-hover:text-lp-accent">{s.title}</span>
                <span className="mt-1 text-[0.9375rem] leading-snug text-lp-muted">{s.text}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="All guides" className="mt-12 grid gap-5 md:grid-cols-2">
        {DOC_SECTIONS.map((sec, i) => {
          const Icon = ICONS[i] ?? Rocket;
          return (
            <div key={sec.title} className="rounded-2xl border border-lp-line bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-lp-accent-soft text-lp-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h2 className="font-display text-xl font-bold tracking-tight">{sec.title}</h2>
              </div>
              <ul className="mt-4 divide-y divide-lp-hairline">
                {sec.pages.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/docs/${p.slug}`} className="group block py-2.5">
                      <span className="font-medium group-hover:text-lp-accent">{p.title}</span>
                      <span className="block text-[0.9375rem] leading-snug text-lp-muted">{p.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl bg-lp-ink px-6 py-6 text-white">
        <div className="min-w-0 flex-[1_1_18rem]">
          <p className="font-display text-xl font-bold">Try it as you read</p>
          <p className="mt-1 text-lp-night-muted">Keep a guide open beside the app and follow along.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {site.signup.open ? (
            <Link href={appLink("/register")} className="inline-flex min-h-11 items-center rounded-[0.625rem] bg-lp-mint px-4 font-semibold text-lp-ink hover:bg-white">
              {site.signup.trialDays > 0 ? `Start your ${site.signup.trialDays}-day free trial` : "Register your villa"}
            </Link>
          ) : null}
          <Link href={appLink("/login")} className="inline-flex min-h-11 items-center rounded-[0.625rem] border border-white/30 px-4 font-semibold hover:bg-white/10">
            Sign in
          </Link>
        </div>
      </section>
    </DocsShell>
  );
}
