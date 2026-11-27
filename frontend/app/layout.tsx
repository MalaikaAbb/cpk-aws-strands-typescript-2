// SHARED — do not edit on section branches.
// Docs (quickstart) root layout, minus <Providers>: each section mounts its own
// CopilotKit provider in app/(sections)/<slug>/ so sections stay independent.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@copilotkit/react-core/v2/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CopilotKit × Strands (TS) docs sections",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
