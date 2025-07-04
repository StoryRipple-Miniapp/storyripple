'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faCoins, faSpinner, faRefresh, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useAccount, useBalance } from 'wagmi'
import { useZoraCoins, CoinBalance } from '@/hooks/useZoraCoins'
import { formatEther } from 'viem'

interface CoinBalanceProps {
  className?: string
  onCoinSelect?: (coinAddress: string, symbol: string) => void
}

export function CoinBalanceComponent({ className = '', onCoinSelect }: CoinBalanceProps) {
  const { address, isConnected, chain } = useAccount()
  const { data: ethBalance } = useBalance({ address })
  const { getUserCoinBalances, getCoinDetails, isLoading } = useZoraCoins()
  const [balances, setBalances] = useState<CoinBalance[]>([])
  const [coinDetails, setCoinDetails] = useState<Record<string, any>>({})
  const [refreshing, setRefreshing] = useState(false)

  const loadBalances = async () => {
    if (!isConnected || !address) return

    setRefreshing(true)
    try {
      const userBalances = await getUserCoinBalances()
      setBalances(userBalances)

      // Load details for each coin
      const details: Record<string, any> = {}
      for (const balance of userBalances) {
        try {
          const coinDetail = await getCoinDetails(balance.coinAddress)
          details[balance.coinAddress] = coinDetail
        } catch (err) {
          console.error(`Failed to load details for ${balance.coinAddress}:`, err)
        }
      }
      setCoinDetails(details)
    } catch (error) {
      console.error('Failed to load balances:', error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadBalances()
  }, [isConnected, address])

  const handleRefresh = () => {
    loadBalances()
  }

  const calculateValue = (balance: string, coinAddress: string): string => {
    const detail = coinDetails[coinAddress]
    if (!detail || !detail.price) return '0.00'
    
    const balanceNum = parseFloat(formatEther(BigInt(balance || '0')))
    const priceNum = parseFloat(detail.price)
    return (balanceNum * priceNum).toFixed(4)
  }

  // Helper to get Zora explorer URL
  const getExplorerUrl = (coinAddress: string) => {
    // Use chain?.id from useAccount instead of ethBalance
    const chainId = chain?.id
    if (!chainId) return '#'
    if (chainId === 84532) { // Base Sepolia
      return `https://testnet.zora.co/coin/bsep:${coinAddress}`
    } else if (chainId === 8453) { // Base Mainnet
      return `https://zora.co/coin/base:${coinAddress}`
    }
    return '#'
  }

  if (!isConnected) {
    return (
      <div className={`bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 text-center ${className}`}>
        <FontAwesomeIcon icon={faWallet} className="text-4xl text-gray-500 mb-4" />
        <p className="text-gray-400">Connect your wallet to view coin balances</p>
      </div>
    )
  }

  return (
    <div className={`bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 ${className}`}>
      {/* ETH Balance */}
      {isConnected && ethBalance && (
        <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-black/40 border border-[#3f3379]">
          <span className="text-gray-400">ETH Balance</span>
          <span className="text-white font-semibold">{parseFloat(ethBalance.formatted).toFixed(4)} ETH</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={faCoins} className="text-[#5646a6] text-xl" />
          <h3 className="text-white font-semibold">Your Coins</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || isLoading}
          className="p-2 rounded-lg bg-black/40 border border-[#3f3379] hover:border-[#5646a6] transition-colors disabled:opacity-50"
        >
          <FontAwesomeIcon 
            icon={faRefresh} 
            className={`text-gray-400 ${refreshing ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>

      {/* Loading State */}
      {(isLoading || refreshing) && balances.length === 0 && (
        <div className="flex items-center justify-center py-8 text-gray-400">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
          Loading balances...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !refreshing && balances.length === 0 && (
        <div className="text-center py-8">
          <FontAwesomeIcon icon={faCoins} className="text-4xl text-gray-500 mb-4" />
          <p className="text-gray-400 mb-2">No coins found</p>
          <p className="text-gray-500 text-sm">
            Start by buying some story coins or creating your own!
          </p>
        </div>
      )}

      {/* Balances List */}
      {balances.length > 0 && (
        <div className="space-y-3">
          {balances.map((balance) => {
            const detail = coinDetails[balance.coinAddress]
            const formattedBalance = parseFloat(formatEther(BigInt(balance.balance || '0'))).toFixed(4)
            const usdValue = calculateValue(balance.balance, balance.coinAddress)
            
            return (
              <div
                key={balance.coinAddress}
                className="bg-black/40 rounded-lg p-4 border border-transparent hover:border-[#5646a6] transition-colors cursor-pointer"
                onClick={() => onCoinSelect?.(balance.coinAddress, balance.symbol)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium">{balance.symbol}</span>
                      <span className="text-gray-400 text-sm">({balance.name})</span>
                    </div>
                    <div className="text-gray-500 text-xs mb-2">
                      {balance.coinAddress.slice(0, 6)}...{balance.coinAddress.slice(-4)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div>
                        <span className="text-gray-400">Balance: </span>
                        <span className="text-white">{formattedBalance}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Value: </span>
                        <span className="text-white">${usdValue}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {detail && (
                      <>
                        <div className="text-white font-medium">
                          ${parseFloat(detail.price || '0').toFixed(6)}
                        </div>
                        <div className="text-xs text-gray-400">
                          Price per token
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <a
                    href={getExplorerUrl(balance.coinAddress)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline ml-2"
                  >
                    View on Zora Explorer
                  </a>
                </div>

                {/* Quick actions */}
                <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // This would open a buy modal or redirect to trading
                      console.log('Buy more of', balance.symbol)
                    }}
                    className="flex-1 py-1.5 px-3 rounded bg-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/30 transition-colors flex items-center justify-center space-x-1"
                  >
                    <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                    <span>Buy</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // This would open a sell modal or redirect to trading
                      console.log('Sell', balance.symbol)
                    }}
                    className="flex-1 py-1.5 px-3 rounded bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center space-x-1"
                  >
                    <FontAwesomeIcon icon={faArrowDown} className="text-xs" />
                    <span>Sell</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Summary */}
      {balances.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Portfolio Value</span>
            <span className="text-white font-semibold">
              ${balances.reduce((total, balance) => {
                return total + parseFloat(calculateValue(balance.balance, balance.coinAddress))
              }, 0).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 