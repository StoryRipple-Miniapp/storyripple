'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faPlug, faExclamationTriangle, faGlobe, faRightFromBracket, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IS_DEMO_MODE } from '@/lib/wagmi'
import { getWalletLogo } from '@/lib/wallet-logos'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { baseSepolia } from 'wagmi/chains'

export function WalletConnection() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: balance } = useBalance({ 
    address,
    chainId: baseSepolia.id,
    query: {
      refetchInterval: 2_000
    }
  })

  // Handle connection errors
  useEffect(() => {
    if (connectError) {
      if (connectError.message.includes('Talisman extension has not been configured')) {
        setError('Please complete Talisman wallet setup first');
      } else {
        setError(connectError.message);
      }
      // Clear error after 5 seconds
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [connectError]);

  // Clear error when closing connector list
  useEffect(() => {
    if (!showConnectors) {
      setError(null);
    }
  }, [showConnectors]);

  const isTestnet = chain?.testnet || IS_DEMO_MODE

  const handleDisconnect = () => {
    disconnect()
    setShowConnectors(false)
  }

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
          
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 text-left">
              {balance && (
                <span className="text-white font-medium">
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </span>
              )}
            </div>
            <button
              onClick={handleDisconnect}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors text-left flex items-center space-x-1"
              title="Disconnect wallet"
            >
              <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
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
      {isConnected ? (
        <button
          onClick={() => disconnect()}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-[#5646a6] text-white hover:bg-black/40 transition-all"
        >
          <FontAwesomeIcon icon={faWallet} className="text-purple-400" />
          <span className="font-display text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          {balance && (
            <span className="text-purple-400 font-display text-sm">
              {parseFloat(balance.formatted).toFixed(4)} ETH
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={() => setShowConnectors(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-[#5646a6] text-white hover:bg-black/40 transition-all"
        >
          <FontAwesomeIcon icon={faPlug} className="text-purple-400" />
          <span className="font-display text-sm">Connect Wallet</span>
        </button>
      )}

      {showConnectors && !isConnected && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-black/90 backdrop-blur-xl border border-[#5646a6] rounded-xl p-4 shadow-xl z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-display text-sm">Connect Wallet</h3>
            <button
              onClick={() => setShowConnectors(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  if (!connectError) setShowConnectors(false);
                }}
                disabled={isPending || !connector.ready}
                className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                  connector.ready
                    ? 'border-[#5646a6] hover:bg-[#5646a6]/20'
                    : 'border-gray-700 opacity-50 cursor-not-allowed'
                } transition-all`}
              >
                <span className="text-white text-sm font-display">
                  {connector.name}
                </span>
                {isPending && connector.ready && (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="text-purple-400 animate-spin"
                  />
                )}
                {!connector.ready && (
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-yellow-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 