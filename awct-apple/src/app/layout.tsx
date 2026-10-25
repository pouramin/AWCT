import type { Metadata } from "next";
import "../components/sites/apple/apple.css";
export const metadata: Metadata = {
  title: "iPhone 18 Pro and iPhone 18 Pro Max - Apple",
  description:
    "iPhone 18 Pro. Pro further. A local, editable recreation of the Apple product page.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
