import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/BottomNavigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Story Ripple",
  description: "Collaborative branching stories on Farcaster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white min-h-screen`} style={{backgroundColor: '#1f1334'}}>
        <div className="pb-20">
          {children}
        </div>
        <BottomNavigation />
      </body>
    </html>
  );
}
