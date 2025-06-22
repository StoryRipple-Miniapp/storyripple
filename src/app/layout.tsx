import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Story Ripple",
  description: "Collaborative branching stories on Farcaster",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#1f1334",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white min-h-screen antialiased`} style={{ backgroundColor: '#1f1334' }}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20 pb-24">
            {children}
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
