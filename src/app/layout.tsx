import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cookies } from "next/headers";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DealAnalyzer | Real Estate Investment Analyzer",
  description: "Analyze your rental property in seconds and decide if the deal makes sense.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Suspense fallback={<footer className="bg-slate-50 border-t border-slate-200 py-12" />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
