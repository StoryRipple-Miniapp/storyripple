'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SplashScreen } from './SplashScreen';

interface AppInitializerProps {
  children: React.ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Preload critical pages for faster navigation
    const preloadPages = async () => {
      try {
        // Preload main navigation pages
        router.prefetch('/feeds');
        router.prefetch('/leaderboard'); 
        router.prefetch('/create');
        router.prefetch('/profile');
        router.prefetch('/rules');
        router.prefetch('/wallet');

        // Simulate minimum loading time for smooth UX
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.log('Preloading completed with some pages skipped');
      }
    };

    preloadPages();
  }, [router]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Navigate to feeds page if we're on the home page
    if (pathname === '/') {
      router.push('/feeds');
    }
  };

  if (isLoading) {
    return <SplashScreen onComplete={handleLoadingComplete} />;
  }

  return <>{children}</>;
} 