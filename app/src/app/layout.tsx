import type { Metadata } from "next";
import { siteConfig, constructMetadata } from "@/config/site";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/ui/header-wrapper";
import FooterSection from "@/components/layouts/footer";
import UTMProvider from "@/components/providers/utm-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <UTMProvider>
          <HeaderWrapper />
          {children}
          <GoogleTagManager gtmId={siteConfig.analytics.gtmId} />
          <FooterSection />
        </UTMProvider>
      </body>
    </html>
  );
}