'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'
import { useState, useEffect } from 'react'

// Create a singleton query client to prevent re-initialization
let queryClientInstance: QueryClient | null = null;

const getQueryClient = () => {
  if (!queryClientInstance) {
    queryClientInstance = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
  }
  return queryClientInstance;
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent hydration issues
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    // Show loading state during hydration
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1f1334' }}>
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 