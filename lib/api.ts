import { APP_URL } from "./links";

/*
 * The website's two forms (Contact us, and the Coming soon waitlist) send to
 * the app's public API. The app accepts them from this site's address only
 * (SITE_URL in the app's settings).
 */

export type ApiResponse = { ok: true } | { ok: false; status: number; code: string; error: string };

export async function api(path: string, body: unknown): Promise<ApiResponse> {
  try {
    const response = await fetch(`${APP_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
    });
    const json = (await response.json().catch(() => null)) as Record<string, unknown> | null;
    if (response.ok && json?.ok) return { ok: true };
    return { ok: false, status: response.status, code: String(json?.code ?? "server_error"), error: String(json?.error ?? "Something went wrong. Please try again.") };
  } catch {
    return { ok: false, status: 0, code: "network", error: "We couldn't reach the server. Check your connection and try again." };
  }
}
