import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import SHOTS from "@/lib/docs-shots.json";
import { cn } from "@/lib/utils";

/*
 * The building blocks of a help guide: headings with links, numbered steps,
 * screenshots, notes, and the names of buttons as they appear in the app.
 */

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** A section heading. Gets an id (for "On this page" and links) and a # link on hover. */
export function H2({ children, id }: { children: string; id?: string }) {
  const anchor = id ?? slugify(children);
  return (
    <h2 id={anchor} className="group">
      {children}
      <a href={`#${anchor}`} aria-label={`Link to ${children}`} className="ml-2 font-sans text-lp-line no-underline opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
        #
      </a>
    </h2>
  );
}

export function H3({ children }: { children: string }) {
  return <h3 id={slugify(children)}>{children}</h3>;
}

/** A button, tab or menu item, written the way it appears in the app. */
export function UI({ children }: { children: React.ReactNode }) {
  return <strong className="rounded-md border border-lp-line bg-white px-1.5 py-px text-[0.9375rem] font-semibold whitespace-nowrap text-lp-ink">{children}</strong>;
}

/** Numbered steps. */
export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="!list-none !pl-0 [counter-reset:step]">{children}</ol>;
}

export function Step({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <li className="relative !mt-0 border-l-2 border-lp-line pb-7 pl-9 [counter-increment:step] last:border-transparent last:pb-1">
      <span
        aria-hidden
        className="absolute -left-[0.95rem] top-0 grid size-[1.875rem] place-items-center rounded-full bg-lp-accent text-[0.875rem] font-bold text-white before:content-[counter(step)]"
      />
      <div className="font-semibold text-lp-ink">{title}</div>
      {children ? <div className="mt-1.5 space-y-3">{children}</div> : null}
    </li>
  );
}

type ShotProps = { src: keyof typeof SHOTS; alt: string; caption?: React.ReactNode; phone?: boolean; className?: string };

/** How wide each kind of screenshot is shown: whole pages fill the column, side panels and forms are narrower. */
const WIDTH: Record<string, string> = {
  page: "",
  full: "",
  form: "mx-auto max-w-[36rem]",
  doc: "mx-auto max-w-[40rem]",
  panel: "mx-auto max-w-[23rem]",
  phone: "mx-auto max-w-[17rem]",
};
const SIZES: Record<string, string> = {
  page: "(min-width: 1280px) 736px, 100vw",
  full: "(min-width: 1280px) 736px, 100vw",
  form: "576px",
  doc: "640px",
  panel: "368px",
  phone: "272px",
};

/** A screenshot of the app (public/docs/*.webp, cropped to what the guide talks about), opening full size when clicked. */
export function Shot({ src, alt, caption, className }: ShotProps) {
  const path = `/docs/${src}.webp`;
  const { w, h, kind } = SHOTS[src];
  const phone = kind === "phone";
  return (
    <figure className={cn("!mt-6 !mb-8", WIDTH[kind], className)}>
      <a href={path} target="_blank" rel="noopener" className="block !no-underline" aria-label={`${alt} (opens full size)`}>
        <Image
          src={path}
          width={w}
          height={h}
          alt={alt}
          sizes={SIZES[kind]}
          className={cn(
            "block h-auto w-full bg-white shadow-[0_18px_40px_-24px_rgba(14,26,25,0.35)]",
            phone ? "rounded-[1.75rem] border-[6px] border-lp-ink" : "rounded-xl border border-lp-line",
          )}
        />
      </a>
      {caption ? <figcaption className="mt-2.5 text-center text-[0.9375rem] leading-snug text-lp-muted">{caption}</figcaption> : null}
    </figure>
  );
}

/** Two screenshots side by side (phones, or before and after). */
export function ShotRow({ children }: { children: React.ReactNode }) {
  return <div className="!mt-6 grid items-start gap-6 sm:grid-cols-2 [&>figure]:!my-0 [&>figure]:max-w-none">{children}</div>;
}

const CALLOUT = {
  note: { icon: Info, label: "Good to know", box: "border-[#c9dbe8] bg-[#eef5fa]", icn: "text-[#2f6690]" },
  tip: { icon: Lightbulb, label: "Tip", box: "border-[#bfe0d4] bg-lp-accent-soft/60", icn: "text-lp-accent" },
  warning: { icon: AlertTriangle, label: "Important", box: "border-[#ecd3a8] bg-[#fbf3e4]", icn: "text-[#94601f]" },
} as const;

export function Callout({ type = "note", title, children }: { type?: keyof typeof CALLOUT; title?: string; children: React.ReactNode }) {
  const c = CALLOUT[type];
  const Icon = c.icon;
  return (
    <div className={cn("flex gap-3 rounded-xl border px-4 py-3.5 text-[1rem] leading-relaxed", c.box)} role="note">
      <Icon className={cn("mt-1 size-5 shrink-0", c.icn)} aria-hidden />
      <div className="min-w-0 space-y-2">
        <p className="font-semibold text-lp-ink">{title ?? c.label}</p>
        <div className="space-y-2">{children}</div>
      </div>
    </div>
  );
}

/** A link to another guide. */
export function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link href={`/docs/${to}`}>{children}</Link>;
}

/** A small two-column table: a term and what it means. */
export function Terms({ rows }: { rows: [React.ReactNode, React.ReactNode][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-lp-line bg-white">
      <dl className="divide-y divide-lp-hairline">
        {rows.map(([term, meaning], i) => (
          <div key={i} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
            <dt className="font-semibold text-lp-ink">{term}</dt>
            <dd className="text-[1rem] leading-relaxed">{meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Cards linking onwards at the end of a guide or on the docs home. */
export function NextCards({ items }: { items: { to: string; title: string; text: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <Link
          key={it.to}
          href={`/docs/${it.to}`}
          className="group block rounded-xl border border-lp-line bg-white p-4 !no-underline transition-colors hover:border-lp-accent"
        >
          <span className="block font-semibold text-lp-ink group-hover:text-lp-accent">{it.title} →</span>
          <span className="mt-1 block text-[0.9375rem] leading-snug font-normal text-lp-muted">{it.text}</span>
        </Link>
      ))}
    </div>
  );
}
