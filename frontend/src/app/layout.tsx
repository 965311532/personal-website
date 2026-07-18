import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./vibecurb.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrielearmento.com"),
  title: {
    default: "Gabriele Armento — Builder for uncertain worlds",
    template: "%s — Gabriele Armento",
  },
  description:
    "Gabriele Armento is an Italian founder and software builder working across research, data, markets, and AI-native products.",
  openGraph: {
    title: "Gabriele Armento — Builder for uncertain worlds",
    description:
      "I make ambiguity operational across research, data, markets, and AI-native products.",
    url: "https://gabrielearmento.com",
    siteName: "Gabriele Armento",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriele Armento — Builder for uncertain worlds",
    description:
      "I make ambiguity operational across research, data, markets, and AI-native products.",
  },
  alternates: {
    canonical: "https://gabrielearmento.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
