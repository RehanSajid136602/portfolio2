import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LazyMotion, domAnimation } from "framer-motion";
import DecorationsClient from "@/components/effects/DecorationsClient";
import { FixedNav } from "@/components/ui/FixedNav";
import { StatusBar } from "@/components/ui/StatusBar";
import { MobileNav } from "@/components/ui/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Muhammad Rehan | Software Engineer",
  description: "Portfolio of Muhammad Rehan, a software engineer specializing in motion design and high-performance web applications.",
  keywords: ["software engineer", "web developer", "portfolio", "react", "next.js", "motion design"],
  authors: [{ name: "Muhammad Rehan" }],
  openGraph: {
    title: "Muhammad Rehan | Software Engineer",
    description: "Portfolio showcasing high-performance web applications with motion design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <LazyMotion features={domAnimation}>
          <DecorationsClient />
          <FixedNav />
          <MobileNav />
          <StatusBar />
          {children}
        </LazyMotion>
      </body>
    </html>
  );
}
