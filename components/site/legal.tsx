import Link from "next/link";
import { kicker } from "@/components/site/bits";
import { LEGAL } from "@/lib/legal";
import { cn } from "@/lib/utils";

/*
 * The layout of the Terms of Service and Privacy Policy: a title, the date,
 * a short summary, a list of sections to jump to, and readable sections.
 */

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

export function LegalDocument({ label, title, summary, sections, other }: { label: string; title: string; summary: React.ReactNode; sections: LegalSection[]; other: { href: string; label: string } }) {
  return (
    <article className="mx-auto max-w-[75rem] px-6 pt-16 pb-24 sm:pt-[5.5rem]">
      <header className="max-w-[48rem]">
        <p className={kicker}>{label}</p>
        <h1 className="mt-4 font-display text-[2.5rem] leading-[1.04] font-bold tracking-[-0.04em] sm:text-[3.5rem]">{title}</h1>
        <p className="mt-4 text-lp-muted">Last updated {LEGAL.updated}</p>
        <div className="mt-8 rounded-2xl bg-lp-accent-soft p-6 text-[1.0625rem] leading-relaxed text-lp-accent-ink sm:p-7">{summary}</div>
      </header>

      <div className="mt-14 flex flex-wrap gap-x-16 gap-y-10">
        <nav aria-label="Sections" className="min-w-0 flex-[1_1_14rem] lg:max-w-[16rem]">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold tracking-wide text-lp-muted uppercase">On this page</p>
            <ol className="mt-3 space-y-1.5 text-[0.9375rem]">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 text-lp-body hover:text-lp-accent">
                    <span className="tnum w-5 shrink-0 text-lp-muted">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <Link href={other.href} className="mt-6 inline-block font-semibold text-lp-accent underline underline-offset-4">
              {other.label}
            </Link>
          </div>
        </nav>

        <div className="min-w-0 flex-[999_1_32rem] max-w-[46rem]">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className={cn("scroll-mt-24", i > 0 && "mt-12 border-t border-lp-line pt-10")}>
              <h2 id={`${s.id}-title`} className="font-display text-[1.625rem] leading-tight font-bold tracking-[-0.02em]">
                <span className="text-lp-muted">{i + 1}.</span> {s.title}
              </h2>
              <div className="legal-body mt-4">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

/** A bulleted list in a legal section. */
export function Points({ items }: { items: React.ReactNode[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** How to reach us: the support email and phone from Settings, and where we are. */
export function ContactLines({ email, phone }: { email: string; phone: string }) {
  return (
    <ul>
      {email ? (
        <li>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </li>
      ) : null}
      {phone ? (
        <li>
          Phone or WhatsApp: <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
        </li>
      ) : null}
      <li>
        The contact form on our <Link href="/contact">Contact us</Link> page
      </li>
      <li>
        Post: {LEGAL.operator}, {LEGAL.place}
      </li>
    </ul>
  );
}
