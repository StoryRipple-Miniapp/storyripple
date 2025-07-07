'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faPlug, faExclamationTriangle, faGlobe, faRightFromBracket, faSpinner, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { IS_DEMO_MODE } from '@/lib/wagmi'
import { getWalletLogo } from '@/lib/wallet-logos'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { baseSepolia } from 'wagmi/chains'

export function WalletConnection() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)
  const [ethPrice, setEthPrice] = useState<number | null>(null)
  const router = useRouter()
  
  // Fetch balance with proper error handling
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useBalance({ 
    address,
    chainId: baseSepolia.id,
    query: {
      enabled: isConnected && !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
      retry: 3,
    }
  })

  const isTestnet = chain?.testnet || IS_DEMO_MODE
  const isOnCorrectNetwork = chain?.id === baseSepolia.id

  // Fetch ETH price from CoinGecko
  const fetchEthPrice = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      const data = await response.json()
      setEthPrice(data.ethereum.usd)
    } catch (error) {
      console.error('Failed to fetch ETH price:', error)
      setEthPrice(null)
    }
  }

  // Fetch ETH price on component mount and every 5 minutes
  useEffect(() => {
    fetchEthPrice()
    const interval = setInterval(fetchEthPrice, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const handleDisconnect = () => {
    disconnect()
    setShowConnectors(false)
  }

  const formatBalance = () => {
    if (balanceLoading) return 'Loading...';
    if (balanceError) return 'Error';
    if (!isConnected) return '0.000 ETH';
    if (!isOnCorrectNetwork) return 'Wrong Network';
    if (balance) return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`;
    return '0.000 ETH';
  }

  const formatUsdValue = () => {
    if (!balance || !ethPrice || balanceLoading || balanceError || !isConnected || !isOnCorrectNetwork) {
      return null;
    }
    
    const ethAmount = parseFloat(balance.formatted);
    const usdValue = ethAmount * ethPrice;
    return usdValue.toFixed(2);
  }

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        {/* Wrong Network Indicator */}
        {!isOnCorrectNetwork && (
          <div className="flex items-center space-x-1 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 text-xs" />
            <span className="text-red-400 text-xs font-medium">WRONG NETWORK</span>
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
              className={isOnCorrectNetwork ? "text-green-400" : "text-red-400"} 
            />
          </button>
          
          <div className="flex flex-col">
            <div className="text-xs text-gray-400 text-left">
              <span className={`font-medium ${isOnCorrectNetwork ? 'text-white' : 'text-red-400'}`}>
                {formatBalance()}
              </span>
            </div>
            {/* USD Value Display */}
            {formatUsdValue() && (
              <div className="text-xs text-green-400 text-left flex items-center space-x-1">
                <FontAwesomeIcon icon={faDollarSign} className="text-xs" />
                <span>${formatUsdValue()}</span>
              </div>
            )}
            <button
              onClick={handleDisconnect}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors text-left flex items-center space-x-1"
              title="Disconnect wallet"
            >
              <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
            </button>
            <span className={`text-xs ${isOnCorrectNetwork ? 'text-gray-500' : 'text-red-400'}`}>
              {chain?.name || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
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
                  connect({ connector })
                  setShowConnectors(false)
                  router.push('/wallet')
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
                  {isPending && (
                    <div className="flex items-center space-x-1">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xs" />
                      <span className="text-xs text-yellow-400">Connecting...</span>
                    </div>
                  )}
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