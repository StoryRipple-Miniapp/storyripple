'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SplashScreen } from './SplashScreen';

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Only show splash on first load
  useEffect(() => {
    if (!showSplash) {
      setIsLoading(false);
    }
  }, [showSplash]);

  useEffect(() => {
    // Preload critical pages for faster navigation
    const preloadPages = async () => {
      try {
        router.prefetch('/feeds');
        router.prefetch('/create');
        router.prefetch('/profile');
        router.prefetch('/wallet');
        // Prefetch a sample ripple page
        router.prefetch('/ripple/1');
      } catch (error) {
        console.log('Preloading completed with some pages skipped');
      }
    };
    preloadPages();
  }, [router]);

  const handleSplashComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowSplash(false);
      if (pathname !== '/feeds') {
        router.push('/feeds');
      }
    }, 1000);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} isLoading={isLoading} />;
  }

  return <>{children}</>;
} 