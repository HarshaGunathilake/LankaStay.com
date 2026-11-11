/*
 * The website lives on its own domain (lankastay.com); signing in, signing up
 * and the dashboards are on the app's (app.lankastay.com). Set
 * NEXT_PUBLIC_APP_URL to the app's address, e.g. https://app.lankastay.com.
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "");

/** A page of the app, e.g. appLink("/register") */
export const appLink = (path: string) => `${APP_URL}${path}`;
