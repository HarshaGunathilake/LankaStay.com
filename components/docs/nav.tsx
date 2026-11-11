"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, Search, X } from "lucide-react";
import { ALL_DOCS, DOC_SECTIONS } from "@/lib/docs";
import { cn } from "@/lib/utils";

/* The list of guides down the side (a drop-down on phones), with a search box. */

function useSearch(query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const words = q.split(/\s+/);
    return ALL_DOCS.map((p) => {
      const hay = `${p.title} ${p.summary} ${p.keywords ?? ""} ${p.section}`.toLowerCase();
      const title = p.title.toLowerCase();
      const hits = words.filter((w) => hay.includes(w)).length;
      const score = hits === words.length ? hits * 2 + (title.includes(q) ? 5 : 0) + words.filter((w) => title.includes(w)).length : 0;
      return { p, score };
    })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.p);
  }, [query]);
}

function SearchBox({ value, onChange, inputRef }: { value: string; onChange: (v: string) => void; inputRef?: React.Ref<HTMLInputElement> }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-[1.125rem] -translate-y-1/2 text-lp-muted" aria-hidden />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the guides"
        aria-label="Search the guides"
        className="h-11 w-full rounded-[0.625rem] border border-lp-line bg-white pr-9 pl-9 text-[0.9375rem] outline-none placeholder:text-lp-muted focus:border-lp-accent focus:ring-2 focus:ring-lp-accent/20 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-md text-lp-muted hover:text-lp-ink">
          <X className="size-4" />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded border border-lp-line px-1.5 text-[0.75rem] text-lp-muted lg:block">/</kbd>
      )}
    </div>
  );
}

function List({ onPick }: { onPick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Guides" className="space-y-6">
      <Link
        href="/docs"
        onClick={onPick}
        aria-current={pathname === "/docs" ? "page" : undefined}
        className={cn("flex items-center gap-2 text-[0.9375rem] font-semibold", pathname === "/docs" ? "text-lp-accent" : "text-lp-ink hover:text-lp-accent")}
      >
        <BookOpen className="size-[1.125rem]" aria-hidden /> All guides
      </Link>
      {DOC_SECTIONS.map((s) => (
        <div key={s.title}>
          <p className="mb-1.5 text-[0.8125rem] font-semibold tracking-wide text-lp-muted uppercase">{s.title}</p>
          <ul className="space-y-px border-l border-lp-line">
            {s.pages.map((p) => {
              const on = pathname === `/docs/${p.slug}`;
              return (
                <li key={p.slug}>
                  <Link
                    href={`/docs/${p.slug}`}
                    onClick={onPick}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "-ml-px block border-l-2 py-1.5 pl-3.5 text-[0.9375rem] leading-snug transition-colors",
                      on ? "border-lp-accent font-semibold text-lp-accent" : "border-transparent text-lp-body hover:border-lp-line hover:text-lp-ink",
                    )}
                  >
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Results({ results, onPick }: { results: ReturnType<typeof useSearch>; onPick: () => void }) {
  if (!results) return null;
  if (results.length === 0) return <p className="px-1 py-3 text-[0.9375rem] text-lp-muted">No guide matches that. Try another word, or <Link href="/contact" className="font-medium text-lp-accent underline">ask us</Link>.</p>;
  return (
    <ul className="space-y-1" aria-label="Search results">
      {results.map((p) => (
        <li key={p.slug}>
          <Link href={`/docs/${p.slug}`} onClick={onPick} className="block rounded-lg px-3 py-2.5 hover:bg-white">
            <span className="block text-[0.9375rem] font-semibold text-lp-ink">{p.title}</span>
            <span className="block text-[0.875rem] leading-snug text-lp-muted">{p.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Computers: a sticky column. */
export function DocsSidebar() {
  const [query, setQuery] = useState("");
  const results = useSearch(query);
  const input = useRef<HTMLInputElement>(null);
  // "/" jumps to the search box, as on most docs sites.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "/" && !/input|textarea|select/i.test(t.tagName)) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <aside className="sticky top-[4.5rem] hidden h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain py-8 pr-2 lg:block">
      <SearchBox value={query} onChange={setQuery} inputRef={input} />
      <div className="mt-6">{results ? <Results results={results} onPick={() => setQuery("")} /> : <List />}</div>
    </aside>
  );
}

/** Phones and tablets: a bar at the top that opens the list. */
export function DocsMobileNav({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useSearch(query);
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  return (
    <div className="sticky top-[4.5rem] z-30 -mx-4 border-b border-lp-line bg-lp-ground/95 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="docs-mobile-list" className="flex min-h-12 w-full items-center gap-2 text-left text-[0.9375rem]">
        <BookOpen className="size-[1.125rem] shrink-0 text-lp-accent" aria-hidden />
        <span className="min-w-0 flex-1 truncate font-medium">{current}</span>
        <span className="text-lp-muted">All guides</span>
        <ChevronDown className={cn("size-5 text-lp-muted transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <div id="docs-mobile-list" className="max-h-[calc(100dvh-9rem)] overflow-y-auto pt-1 pb-6">
          <SearchBox value={query} onChange={setQuery} />
          <div className="mt-5">{results ? <Results results={results} onPick={close} /> : <List onPick={close} />}</div>
        </div>
      ) : null}
    </div>
  );
}

/** Computers: the headings of the guide, the current one highlighted while reading. */
export function OnThisPage() {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const heads = [...document.querySelectorAll<HTMLHeadingElement>(".doc-body > h2[id]")];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(heads.map((h) => ({ id: h.id, text: (h.firstChild?.textContent ?? h.textContent ?? "").trim() })));
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        const first = heads.find((h) => seen.get(h.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [pathname]);

  if (items.length < 2) return null;
  return (
    <nav aria-label="On this page" className="sticky top-[4.5rem] hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-10 xl:block">
      <p className="mb-2 text-[0.8125rem] font-semibold tracking-wide text-lp-muted uppercase">On this page</p>
      <ul className="space-y-1 border-l border-lp-line">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 pl-3 text-[0.875rem] leading-snug transition-colors",
                active === it.id ? "border-lp-accent font-medium text-lp-accent" : "border-transparent text-lp-muted hover:text-lp-ink",
              )}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
