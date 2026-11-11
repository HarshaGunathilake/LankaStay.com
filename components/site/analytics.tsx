"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

/*
 * Google Tag Manager (which runs Google Analytics) for the public website, and the cookie banner that asks first.
 * Nothing from Google loads until the visitor presses Accept. The choice is remembered
 * in this browser, and "Cookie settings" in the footer opens the banner again.
 * The villa app itself has no analytics.
 * Production builds only, so local development doesn't count as visits.
 * NEXT_PUBLIC_GTM_ID overrides the container; set it to "off" to turn analytics and the banner off.
 * GA_ID is the Analytics property inside the container, used only to switch it off if a visitor declines.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MPXCLWNK";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-3TYCZWG47P";
const ENABLED = process.env.NODE_ENV === "production" && /^GTM-[A-Z0-9]+$/.test(GTM_ID);
const KEY = "ls-cookie-consent";
const OPEN_EVENT = "ls-cookie-settings";

type Choice = "granted" | "denied" | null;

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(v: "granted" | "denied") {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* private mode: the choice lasts for this visit only */
  }
}

/** Removes Google Analytics cookies after the visitor changes their mind. */
function clearGaCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function Analytics() {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ENABLED) return;
    const c = readChoice();
    setChoice(c);
    setOpen(c === null);
    setReady(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!ENABLED || !ready) return null;

  const decide = (v: "granted" | "denied") => {
    saveChoice(v);
    setOpen(false);
    if (v === "denied" && choice === "granted") {
      // Google's script is already running on this page: stop it, tidy up, and start clean.
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
      clearGaCookies();
      window.location.reload();
      return;
    }
    setChoice(v);
  };

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script id="gtm" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
        </>
      ) : null}
      {open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-lp-line bg-white p-5 text-lp-ink shadow-[0_20px_50px_-20px_rgba(14,26,25,0.45)] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-[24rem]"
        >
          <p id="cookie-title" className="font-semibold">
            Cookies
          </p>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-lp-body">
            We&apos;d like to use Google Analytics cookies to count visits and see which pages help. Nothing else, and no ads.{" "}
            <Link href="/privacy#cookies" className="font-medium text-lp-accent underline underline-offset-2">
              Privacy Policy
            </Link>
          </p>
          <div className="mt-4 flex gap-2.5">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="h-11 flex-1 rounded-full bg-lp-accent px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-lp-accent-deep"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="h-11 flex-1 rounded-full border border-lp-line bg-white px-5 text-[0.9375rem] font-semibold text-lp-ink transition-colors hover:border-lp-ink"
            >
              Decline
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** "Cookie settings" link for footers: opens the banner again so the visitor can change their choice. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!ENABLED) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={`text-left ${className ?? ""}`}>
      Cookie settings
    </button>
  );
}
