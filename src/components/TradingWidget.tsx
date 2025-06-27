'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faArrowUp, faArrowDown, faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useAccount } from 'wagmi'
import { useZoraCoins } from '@/hooks/useZoraCoins'
import { formatEther } from 'viem'

interface TradingWidgetProps {
  coinAddress: string
  coinSymbol: string
  currentPrice?: string
  className?: string
  onTradeComplete?: (txHash: string) => void
}

export function TradingWidget({ 
  coinAddress, 
  coinSymbol, 
  currentPrice, 
  className = '',
  onTradeComplete 
}: TradingWidgetProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [isTrading, setIsTrading] = useState(false)
  const [coinDetails, setCoinDetails] = useState<any>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)
  
  const { isConnected } = useAccount()
  const { buyCoin, sellCoin, getCoinDetails, isLoading, error } = useZoraCoins()

  // Load coin details on mount and when coinAddress changes
  useEffect(() => {
    const loadCoinDetails = async () => {
      if (!coinAddress) return
      
      setLoadingDetails(true)
      try {
        const details = await getCoinDetails(coinAddress)
        setCoinDetails(details)
      } catch (err) {
        console.error('Failed to load coin details:', err)
      } finally {
        setLoadingDetails(false)
      }
    }

    loadCoinDetails()
  }, [coinAddress, getCoinDetails])

  const handleTrade = async () => {
    if (!amount || !isConnected || !coinAddress) return

    setIsTrading(true)
    try {
      let result
      if (tradeType === 'buy') {
        // For buying, amount is in ETH
        result = await buyCoin(coinAddress, amount)
      } else {
        // For selling, amount is in coin tokens
        result = await sellCoin(coinAddress, amount)
      }
      
      if (result.success && onTradeComplete) {
        onTradeComplete(result.txHash)
      }
      
      setAmount('')
      
      // Refresh coin details after trade
      if (coinAddress) {
        try {
          const updatedDetails = await getCoinDetails(coinAddress)
          setCoinDetails(updatedDetails)
        } catch (err) {
          console.error('Failed to refresh coin details:', err)
        }
      }
    } catch (error) {
      console.error('Trade failed:', error)
    } finally {
      setIsTrading(false)
    }
  }

  const price = coinDetails?.price || currentPrice || '0'
  const estimatedCost = tradeType === 'buy' 
    ? parseFloat(amount || '0') // ETH amount for buying
    : parseFloat(amount || '0') * parseFloat(price) // ETH value for selling

  return (
    <div className={`bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 ${className}`}>
      {/* Loading State */}
      {loadingDetails && (
        <div className="flex items-center justify-center py-4 text-gray-400">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
          Loading coin details...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          {error}
        </div>
      )}

      {/* Coin Info */}
      {coinDetails && (
        <div className="mb-4 p-3 bg-black/40 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Current Price</span>
            <span className="text-white font-medium">${parseFloat(price).toFixed(6)}</span>
          </div>
          {coinDetails.marketCap && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Market Cap</span>
              <span className="text-white text-sm">${parseFloat(formatEther(BigInt(coinDetails.marketCap || '0'))).toFixed(2)}</span>
            </div>
          )}
          {coinDetails.volume24h && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">24h Volume</span>
              <span className="text-white text-sm">${parseFloat(coinDetails.volume24h).toFixed(2)}</span>
            </div>
          )}
        </div>
      )}

      {/* Trade Type Selector */}
      <div className="flex bg-black/40 rounded-lg p-1 mb-4">
        <button
          onClick={() => setTradeType('buy')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            tradeType === 'buy'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
          Buy
        </button>
        <button
          onClick={() => setTradeType('sell')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            tradeType === 'sell'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
          Sell
        </button>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-xs text-gray-400 mb-2">
          Amount {tradeType === 'buy' ? '(ETH)' : `(${coinSymbol})`}
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="0.001"
          min="0"
          className="w-full bg-black/40 border border-[#3f3379] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#5646a6] focus:outline-none"
        />
      </div>

      {/* Price Info */}
      <div className="space-y-2 mb-4 text-xs">
        <div className="flex justify-between text-gray-400">
          <span>Price per {coinSymbol}:</span>
          <span className="text-white">${parseFloat(price).toFixed(6)}</span>
        </div>
        {amount && (
          <div className="flex justify-between text-gray-400">
            <span>
              {tradeType === 'buy' ? 'Total Cost:' : 'Estimated Value:'}
            </span>
            <span className="text-white">
              <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
              {tradeType === 'buy' 
                ? `${parseFloat(amount).toFixed(4)} ETH`
                : `${estimatedCost.toFixed(4)} ETH`
              }
            </span>
          </div>
        )}
      </div>

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={!amount || !isConnected || isTrading || isLoading || loadingDetails}
        className={`w-full py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center space-x-2 ${
          tradeType === 'buy'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-red-500 hover:bg-red-600 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {(isTrading || isLoading) ? (
          <>
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={tradeType === 'buy' ? faArrowUp : faArrowDown} />
            <span>{tradeType === 'buy' ? 'Buy' : 'Sell'} {coinSymbol}</span>
          </>
        )}
      </button>

      {!isConnected && (
        <p className="text-xs text-gray-500 text-center mt-2">
          Connect your wallet to trade
        </p>
      )}
    </div>
  )
} 