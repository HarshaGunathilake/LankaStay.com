import { NextResponse } from "next/server";
import { PREVIEW_COOKIE } from "@/lib/server/site";

/*
 * While Coming soon is on, open /preview?key=<PREVIEW_KEY> to see the real
 * pages in this browser (for a week). /preview?off=1 goes back to what
 * visitors see.
 */
export function GET(request: Request) {
  const url = new URL(request.url);
  const response = NextResponse.redirect(new URL("/", url));
  if (url.searchParams.has("off")) {
    response.cookies.delete(PREVIEW_COOKIE);
    return response;
  }
  const key = process.env.PREVIEW_KEY ?? "";
  if (key && url.searchParams.get("key") === key) {
    response.cookies.set(PREVIEW_COOKIE, key, { httpOnly: true, sameSite: "lax", secure: url.protocol === "https:", maxAge: 7 * 24 * 3600, path: "/" });
  }
  return response;
}
