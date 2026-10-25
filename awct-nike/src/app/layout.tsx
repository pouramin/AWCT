import type { Metadata } from "next";
import "../components/sites/nike/nike.css";
export const metadata: Metadata = {
  title: "Men's Shoes & Sneakers. Nike.com",
  description: "Local recreation of Nike's men's shoes catalog.",
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
