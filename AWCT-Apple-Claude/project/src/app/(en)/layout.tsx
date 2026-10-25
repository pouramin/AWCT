import type { Metadata } from "next";
import "../globals.css";
import "@/components/sites/apple-iphone-18-pro/site.css";

export const metadata: Metadata = {
  title: "iPhone 18 Pro and iPhone 18 Pro Max - Apple",
  description:
    "iPhone 18 Pro and iPhone 18 Pro Max. Variable aperture on the 48MP Fusion Main camera, the A20 Pro chip, and the best iPhone battery life.",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
