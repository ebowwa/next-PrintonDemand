// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import {
  NEXT_SITE_TITLE,
  NEXT_SITE_DESCRIPTION,
  HOME_OG_IMAGE_URL,
  favicon,
  keywords,
  authors,
  creator,
  publisher,
  twitterCard,
  twitterSite,
  twitterCreator,
  ogType,
  robots,
} from "@/lib/constants";
import GoogleAnalytics from "@/components/(third-party)/GoogleAnalytics/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: NEXT_SITE_TITLE,
  description: NEXT_SITE_DESCRIPTION,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
    type: ogType,
  },
  twitter: {
    card: twitterCard,
    site: twitterSite,
    creator: twitterCreator,
  },
  robots: {
    index: robots.includes('index'),
    follow: robots.includes('follow'),
  },
  icons: {
    icon: favicon,
  },
  keywords: keywords,
  authors: authors,
  creator: creator,
  publisher: publisher,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}