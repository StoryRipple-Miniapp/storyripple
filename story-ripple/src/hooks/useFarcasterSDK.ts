'use client';

import { useState, useEffect } from 'react';
import { sdk } from '@farcaster/frame-sdk';

/**
 * React hook that waits for the Farcaster host to be ready.
 * Returns { initialized, error }.
 */
export function useFarcasterSDK() {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function init() {
      try {
        await sdk.actions.ready(); // hides host splash, signals readiness
        setInitialized(true);
      } catch (err) {
        console.error('Farcaster SDK init error:', err);
        setError(err as Error);
      }
    }
    init();
  }, []);

  return { initialized, error };
}
