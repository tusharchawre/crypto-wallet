import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Crypto Wallet",
  description: "A Cohort 3.0 Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
