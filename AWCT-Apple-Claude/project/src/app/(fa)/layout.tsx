import type { Metadata } from "next";
import "../globals.css";
import "@/components/sites/apple-iphone-18-pro/site.css";

export const metadata: Metadata = {
  title: "iPhone 18 Pro و iPhone 18 Pro Max - Apple",
  description:
    "iPhone 18 Pro و iPhone 18 Pro Max. دیافراگم متغیر در دوربین اصلی Fusion با ۴۸ مگاپیکسل، تراشهٔ A20 Pro و بهترین عمر باتری iPhone.",
};

export default function PersianRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
