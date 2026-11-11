# LankaStay website

The public website for **lankastay.com**: Home, Features, Pricing, About us and
Contact us, plus `robots.txt`, `sitemap.xml` and `llms.txt`.

Signing in, registering and the dashboards are a separate project (the app),
on **app.lankastay.com**. This website:

- reads what it shows from the app: the name, the monthly price, the support
  email and phone, whether sign-ups are open, and Super Admin → Settings →
  Website (Coming soon, the waitlist form, search indexing). Changes in
  Settings show here within about 15 seconds;
- sends the Contact us form and the Coming soon waitlist form to the app,
  which emails them or saves them;
- links Sign in and Register to the app.

It has no database and no secrets of its own.

## Run it on your computer

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_APP_URL to where the app runs, e.g. http://localhost:3000
npm run dev                  # http://localhost:3001
```

Run the app at the same time (its own `npm run dev`, on port 3000), with
`NEXT_PUBLIC_SITE_URL=http://localhost:3001` in the app's `.env.local`, so the
app accepts this website's forms.

## Settings (.env.local, or the host's environment variables)

| Name | Example | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_URL` | `https://app.lankastay.com` | The app: where settings are read from, forms are sent, and Sign in / Register go |
| `SITE_URL` | `https://lankastay.com` | This website's address, for canonical links, the sitemap and share images |
| `PREVIEW_KEY` | any long random text | Optional. While Coming soon is on, open `/preview?key=…` to see the real pages; `/preview?off=1` to stop |

`NEXT_PUBLIC_` values are built into the pages: after changing one, build again.

## Deploy (Vercel)

1. Push this folder to its own Git repository and import it as a **new Vercel project**.
2. Set the environment variables above.
3. Add the domains `lankastay.com` and `www.lankastay.com` to this project (redirect `www` to the main one).
4. In the **app's** Vercel project, add the domain `app.lankastay.com`, and set:
   - `NEXT_PUBLIC_SITE_URL=https://lankastay.com` (lets this website's forms through; old links to /features, /pricing and so on redirect here), then redeploy the app;
   - `APP_URL=https://app.lankastay.com` (links in emails, payments).
5. In the Dodo Payments dashboard, point the webhook to `https://app.lankastay.com/api/webhooks/dodo`.
6. DNS at your domain registrar: `lankastay.com` → Vercel's A record, `www` and `app` → CNAME `cname.vercel-dns.com` (Vercel shows the exact values when you add each domain).
