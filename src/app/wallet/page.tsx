'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';

export default function WalletPage() {
  const [walletCreated, setWalletCreated] = useState(false);
  const walletAddress = "0xd8dA6B...3f";

  return (
    <div className="min-h-screen">
      <Header title="Ripple Wallet" showWallet walletBalance="0" />
      
      <div className="px-6">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-white mb-2">0 RIPPLES</div>
          <div className="w-3 h-3 bg-green-400 rounded-full mx-auto"></div>
        </div>

        <div className="space-y-6">
          {/* Wallet Address */}
          <div className="card-gradient rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Wallet Address</h3>
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <span className="text-gray-300 font-mono text-sm">{walletAddress}</span>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="card-gradient rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Wallet Balance</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$0.00</div>
              <div className="text-sm text-gray-400">1 RIPPLE = $1.00</div>
            </div>
          </div>

          {/* Info Text */}
          <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
            <p className="text-sm text-gray-300 leading-relaxed">
              🟢 Your <span className="text-purple-400 font-semibold">1 RIPPLE</span> will be deducted for every Story Seed 
              you create.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your <span className="text-purple-400 font-semibold">0.50 RIPPLES</span> will be deducted for every ripple 
              you create.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setWalletCreated(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition-colors"
            >
              {walletCreated ? 'Copy Wallet Address' : 'Creating your Wallet'}
            </button>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-colors">
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 