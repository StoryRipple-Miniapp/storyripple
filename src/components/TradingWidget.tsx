'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faArrowUp, faArrowDown, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useAccount } from 'wagmi'
import { useZoraCoins } from '@/hooks/useZoraCoins'

interface TradingWidgetProps {
  coinAddress: string
  coinSymbol: string
  currentPrice: string
  className?: string
}

export function TradingWidget({ coinAddress, coinSymbol, currentPrice, className = '' }: TradingWidgetProps) {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [isTrading, setIsTrading] = useState(false)
  
  const { isConnected } = useAccount()
  const { buyCoin, sellCoin, isLoading } = useZoraCoins()

  const handleTrade = async () => {
    if (!amount || !isConnected) return

    setIsTrading(true)
    try {
      if (tradeType === 'buy') {
        await buyCoin(coinAddress, amount)
      } else {
        await sellCoin(coinAddress, amount)
      }
      setAmount('')
    } catch (error) {
      console.error('Trade failed:', error)
    } finally {
      setIsTrading(false)
    }
  }

  const estimatedCost = parseFloat(amount || '0') * parseFloat(currentPrice)

  return (
    <div className={`bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 ${className}`}>
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
          Amount ({coinSymbol})
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-black/40 border border-[#3f3379] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#5646a6] focus:outline-none"
        />
      </div>

      {/* Price Info */}
      <div className="space-y-2 mb-4 text-xs">
        <div className="flex justify-between text-gray-400">
          <span>Price per {coinSymbol}:</span>
          <span className="text-white">${currentPrice}</span>
        </div>
        {amount && (
          <div className="flex justify-between text-gray-400">
            <span>Estimated {tradeType === 'buy' ? 'cost' : 'value'}:</span>
            <span className="text-white">
              <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
              {estimatedCost.toFixed(4)}
            </span>
          </div>
        )}
      </div>

      {/* Trade Button */}
      <button
        onClick={handleTrade}
        disabled={!amount || !isConnected || isTrading || isLoading}
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