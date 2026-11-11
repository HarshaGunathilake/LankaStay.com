import { cookies } from "next/headers";
import { APP_URL } from "../links";

/*
 * What the website shows from the app's Super Admin → Settings: the name,
 * price, contact details, whether sign-ups are open, and the Website switches
 * (Coming soon, waitlist form, search indexing). Read from the app's public
 * API and kept for a minute, so a change in Settings shows within a minute.
 */

interface PublicSite {
  name: string;
  email: string;
  phone: string;
  /** trialDays: free days before the first card charge for new sign-ups (0 = none) */
  signup: { open: boolean; monthlyAmount: number; trialDays: number };
  comingSoon: boolean;
  waitlistForm: boolean;
  indexable: boolean;
}

const FALLBACK: PublicSite = { name: "LankaStay", email: "", phone: "", signup: { open: false, monthlyAmount: 0, trialDays: 0 }, comingSoon: false, waitlistForm: false, indexable: false };

/** The cookie the preview link sets (see app/preview/route.ts). */
export const PREVIEW_COOKIE = "site_preview";

// Kept for a few seconds, so a busy page doesn't ask the app on every view.
const KEEP_MS = 15_000;
let kept: { at: number; site: PublicSite } | null = null;

async function fetchSite(): Promise<PublicSite | null> {
  try {
    const response = await fetch(`${APP_URL}/api/public/site`, {
      cache: "no-store",
      // ngrok (used for testing) shows a warning page instead of the answer without this.
      headers: { Accept: "application/json", "ngrok-skip-browser-warning": "1" },
      signal: AbortSignal.timeout(5000),
    });
    const json = (await response.json()) as { ok?: boolean; site?: PublicSite };
    // An older app sends no trialDays: no trial.
    if (response.ok && json.ok && json.site) return { ...json.site, signup: { ...json.site.signup, trialDays: Number(json.site.signup?.trialDays) || 0 } };
    console.error("[site] the app answered", response.status, "from", APP_URL);
  } catch (error) {
    console.error("[site] could not read the settings from", APP_URL, error);
  }
  return null;
}

export async function loadSite() {
  let site: PublicSite;
  if (kept && Date.now() - kept.at < KEEP_MS) site = kept.site;
  else {
    const fresh = await fetchSite();
    if (fresh) kept = { at: Date.now(), site: fresh };
    // The pages still show (without a price) if the app can't be reached for a moment.
    site = fresh ?? kept?.site ?? FALLBACK;
  }
  // While Coming soon is on, the preview link shows the real pages (to check them before launch).
  const key = process.env.PREVIEW_KEY ?? "";
  const adminPreview = site.comingSoon && key !== "" && (await cookies()).get(PREVIEW_COOKIE)?.value === key;
  // Signing in happens on the app's own domain, so the website can't tell who is signed in.
  return { ...site, signedIn: false, adminPreview };
}

export type Site = Awaited<ReturnType<typeof loadSite>>;

/** The free trial a new owner gets if they register now, in days (0 = none, or sign-ups are closed). */
export const trialDays = (site: { signup: { open: boolean; trialDays: number } }) => (site.signup.open ? site.signup.trialDays : 0);

/** A phone number as a wa.me link, or null. Local Sri Lankan numbers (07…) get 94. */
export function whatsappLink(phone: string) {
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.length === 10 && d.startsWith("0")) d = `94${d.slice(1)}`;
  return d.length >= 10 ? `https://wa.me/${d}` : null;
}
