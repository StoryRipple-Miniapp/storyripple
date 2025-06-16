'use client';

import React, { useState } from 'react';
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK';

export default function HomePage() {
  const { initialized, error } = useFarcasterSDK();
  const [ready, setReady] = useState(false);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <p>Error initializing Farcaster SDK: {error.message}</p>
      </div>
    );
  }
  if (!initialized || !ready) {
    if (initialized && !ready) {
      setReady(true);
    }
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <p>Initializing...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 space-y-4">
      <h1 className="text-4xl font-bold text-indigo-400">Story Ripple launched</h1>
      <p className="text-center text-gray-400 max-w-md">
        Your Farcaster mini-app is ready and connected.
      </p>
      <div className="flex items-center space-x-2">
        <span className="w-3 h-3 bg-green-500 rounded-full" />
        <span className="text-green-400 text-sm">Connected</span>
      </div>
    </div>
  );
}
