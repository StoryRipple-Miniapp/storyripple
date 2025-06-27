import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BottomNavigation } from "@/components/BottomNavigation";
import { WalletProvider } from "@/components/WalletProvider";
import { DemoBanner } from "@/components/DemoBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Story Ripple",
  description: "Collaborative branching stories on Farcaster",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1f1334',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans text-white min-h-screen antialiased" style={{ backgroundColor: '#1f1334' }}>
        <WalletProvider>
          <DemoBanner />
          <div className="min-h-screen">
            <main className="pb-28">
              {children}
            </main>
          </div>
          <BottomNavigation />
        </WalletProvider>
      </body>
    </html>
  );
}
