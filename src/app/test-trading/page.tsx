'use client'

import { Header } from '@/components/Header'
import { TradingWidget } from '@/components/TradingWidget'

export default function TestTradingPage() {
  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
      <Header />
      
      <div className="px-4 py-6 space-y-6 relative z-10 max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Trading Test</h1>
          <p className="text-gray-400 text-sm">Test the trading widget functionality</p>
        </div>
        
        <TradingWidget
          coinAddress="0x1234567890123456789012345678901234567890"
          coinSymbol="TEST"
          currentPrice="0.001"
          className="mb-6"
        />
        
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4">
          <h3 className="text-white text-sm font-medium mb-2">Test Instructions:</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>1. Connect your wallet first</li>
            <li>2. Try switching between Buy/Sell</li>
            <li>3. Enter an amount to see estimated cost</li>
            <li>4. Click trade button to test transaction</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 