import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/space-grotesk/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  // Lets the share image (app/opengraph-image.png) and canonical links use the site's full address.
  metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined,
  title: "LankaStay",
  description: "Bookings, guests and expenses for small villas in Sri Lanka.",
  applicationName: "LankaStay",
};

export const viewport: Viewport = {
  themeColor: "#f3f5f4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
