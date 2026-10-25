import type { Metadata } from "next";
import "@/components/sites/pouramin/pouramin.css";

export const metadata: Metadata = {
  title: "Amin Pour — Builder, Developer, Creator",
  description:
    "Practical AI and developer tools, experiments, and real-world tests on TunnelLab.",
  icons: { icon: "/sites/pouramin/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
