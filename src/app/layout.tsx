import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";
import { GalaxyBackground } from "@/components/GalaxyBackground";
import { AppInitializer } from "@/components/AppInitializer";

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
          <AppInitializer>
            <GalaxyBackground />
            <div className="min-h-screen">
              <main className="pb-8">
                {children}
              </main>
            </div>
          </AppInitializer>
        </WalletProvider>
      </body>
    </html>
  );
}
