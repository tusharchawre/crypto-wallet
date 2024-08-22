import type { Metadata } from "next";

import "./globals.css";
import { WalletProvider } from "./context/WalletContext";


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
          <WalletProvider>
      <body>{children}</body>

          </WalletProvider>

    </html>
  );
}
