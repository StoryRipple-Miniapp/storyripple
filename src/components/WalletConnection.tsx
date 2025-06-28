'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faPlug, faExclamationTriangle, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { IS_DEMO_MODE } from '@/lib/wagmi'
import { getWalletLogo } from '@/lib/wallet-logos'
import Image from 'next/image'

export function WalletConnection() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)

  const isTestnet = chain?.testnet || IS_DEMO_MODE

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        {/* Testnet Indicator */}
        {isTestnet && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-400 text-xs" />
            <span className="text-orange-400 text-xs font-medium">TESTNET</span>
          </div>
        )}
        
        {/* Connected Wallet */}
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center">
            <button 
              className="nft-card w-11 h-11 flex items-center justify-center group"
              onClick={() => setShowConnectors(!showConnectors)}
              title="Wallet Connected"
            >
              <FontAwesomeIcon 
                icon={faWallet} 
                size="lg" 
                className="text-green-400" 
              />
            </button>
            <span className="text-xs text-gray-400 mt-1 font-medium">my wallet</span>
          </div>
          
          <div className="flex flex-col">
            <button
              onClick={() => disconnect()}
              className="text-xs text-gray-400 hover:text-white transition-colors text-left"
              title={`Disconnect`}
            >
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </button>
            <span className="text-xs text-gray-500">
              {chain?.name || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <button 
          className="nft-card w-11 h-11 flex items-center justify-center group"
          onClick={() => setShowConnectors(!showConnectors)}
          aria-label="Connect wallet"
        >
          <FontAwesomeIcon 
            icon={faPlug} 
            size="lg" 
            className="text-gray-400 group-hover:text-white transition-colors" 
          />
        </button>
        <span className="text-xs text-gray-400 mt-1 font-medium">my wallet</span>
      </div>
      
      {/* Connector Dropdown */}
      {showConnectors && (
        <div className="absolute top-12 right-0 bg-black/90 backdrop-blur-md border border-[#5646a6] rounded-xl shadow-lg p-4 min-w-64 z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white text-sm font-medium">Connect Wallet</h3>
            <button
              onClick={() => setShowConnectors(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          {IS_DEMO_MODE && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <FontAwesomeIcon icon={faGlobe} className="text-blue-400" />
                <span className="text-blue-400 font-medium text-sm">Demo Mode</span>
              </div>
              <p className="text-blue-300 text-xs">
                Running on Base Sepolia testnet. Get free testnet ETH to try all features!
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  setShowConnectors(false);
                }}
                disabled={isPending}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
              >
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image
                    src={getWalletLogo(connector.name)}
                    alt={connector.name}
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span>{connector.name}</span>
                  {isPending && <span className="text-xs text-yellow-400">Connecting...</span>}
                </div>
              </button>
            ))}
          </div>
          
          {IS_DEMO_MODE && (
            <div className="mt-4 pt-3 border-t border-gray-600">
              <p className="text-xs text-gray-400 mb-2">Need testnet ETH?</p>
              <a
                href="https://faucet.quicknode.com/base/sepolia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                Get Base Sepolia ETH →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 