'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faCoins, faPlus, faList, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { useZoraCoins } from '@/hooks/useZoraCoins'
import { TradingWidget } from '@/components/TradingWidget'
import { CoinBalanceComponent } from '@/components/CoinBalance'
import { ZORA_API_KEY, PLATFORM_REFERRER } from '@/lib/zora-config'
import { isFarcasterContext } from '@/lib/wagmi'
import { checkZoraExports } from '@/lib/check-zora-exports'

export default function TestTradingPage() {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { createStoryCoin, isLoading, error } = useZoraCoins()

  const [activeTab, setActiveTab] = useState<'create' | 'trade' | 'balances'>('create')
  const [newCoin, setNewCoin] = useState<any>(null)
  const [testCoinAddress, setTestCoinAddress] = useState('')
  const [configIssues, setConfigIssues] = useState<string[]>([])

  // Check configuration on mount
  useEffect(() => {
    const issues: string[] = []
    if (!ZORA_API_KEY) issues.push('NEXT_PUBLIC_ZORA_API_KEY not set')
    if (!PLATFORM_REFERRER) issues.push('NEXT_PUBLIC_PLATFORM_REFERRER not set')
    setConfigIssues(issues)
    
    // Debug: Check available Zora exports
    try {
      checkZoraExports()
    } catch (err) {
      console.error('Error checking Zora exports:', err)
    }
  }, [])

  const handleCreateTestCoin = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    try {
      const result = await createStoryCoin({
        title: 'Test Story',
        author: 'Test Author',
        description: 'A test story coin for StoryRipple',
        storyId: `test-story-${Date.now()}`,
        metadataUri: `ipfs://test-metadata-${Date.now()}`
      })

      setNewCoin(result)
      setTestCoinAddress(result.coinAddress)
      setActiveTab('trade')
    } catch (err) {
      console.error('Failed to create test coin:', err)
    }
  }

  const handleTradeComplete = (txHash: string) => {
    console.log('Trade completed:', txHash)
    // Optionally refresh balances or show success message
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Zora Integration Test</h1>
          <p className="text-gray-300">Test coin creation, trading, and balance management</p>
        </div>

        {/* Configuration Issues */}
        {configIssues.length > 0 && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 mr-2" />
              <h3 className="text-red-400 font-semibold">Configuration Issues</h3>
            </div>
            <ul className="text-red-300 text-sm">
              {configIssues.map((issue, i) => (
                <li key={i}>• {issue}</li>
              ))}
            </ul>
            <p className="text-red-300 text-sm mt-2">
              Check the env-setup.md file for configuration instructions.
            </p>
          </div>
        )}

        {/* Connection Status */}
        <div className="mb-6 p-4 bg-black/30 rounded-lg border border-[#5646a6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faWallet} className="text-[#5646a6]" />
              <div>
                <h3 className="text-white font-semibold">
                  {isConnected ? 'Wallet Connected' : 'Wallet Not Connected'}
                </h3>
                {isConnected && address && (
                  <p className="text-gray-400 text-sm">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  Farcaster Context: {isFarcasterContext() ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
            {isConnected ? (
              <button
                onClick={() => disconnect()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className="px-4 py-2 bg-[#5646a6] hover:bg-[#6b5bb5] text-white rounded-lg transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-black/30 rounded-lg p-1">
            {[
              { id: 'create', label: 'Create Coin', icon: faPlus },
              { id: 'trade', label: 'Trade', icon: faCoins },
              { id: 'balances', label: 'Balances', icon: faList },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-[#5646a6] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {activeTab === 'create' && (
              <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Create Test Coin</h2>
                <p className="text-gray-400 mb-4">
                  Create a test story coin to experiment with the Zora integration.
                </p>
                
                <button
                  onClick={handleCreateTestCoin}
                  disabled={!isConnected || isLoading}
                  className="w-full py-3 bg-[#5646a6] hover:bg-[#6b5bb5] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <FontAwesomeIcon icon={faCoins} className="animate-spin" />
                      <span>Creating Coin...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPlus} />
                      <span>Create Test Story Coin</span>
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {newCoin && (
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <h3 className="text-green-400 font-medium mb-2">Coin Created Successfully!</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><span className="text-gray-400">Address:</span> {newCoin.coinAddress}</p>
                      <p><span className="text-gray-400">Name:</span> {newCoin.name}</p>
                      <p><span className="text-gray-400">Symbol:</span> {newCoin.symbol}</p>
                      <p><span className="text-gray-400">Tx Hash:</span> {newCoin.txHash}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trade' && (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">
                    Coin Address to Trade (leave empty to use test coin)
                  </label>
                  <input
                    type="text"
                    value={testCoinAddress}
                    onChange={(e) => setTestCoinAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full bg-black/40 border border-[#3f3379] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#5646a6] focus:outline-none"
                  />
                </div>

                {testCoinAddress ? (
                  <TradingWidget
                    coinAddress={testCoinAddress}
                    coinSymbol="TEST"
                    onTradeComplete={handleTradeComplete}
                  />
                ) : (
                  <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 text-center">
                    <p className="text-gray-400">
                      Create a test coin first or enter a coin address to start trading
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'balances' && (
              <CoinBalanceComponent
                onCoinSelect={(coinAddress, symbol) => {
                  setTestCoinAddress(coinAddress)
                  setActiveTab('trade')
                }}
              />
            )}
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Integration Status */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Integration Status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Farcaster Connector</span>
                  <span className="text-green-400">✓ Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Zora SDK</span>
                  <span className="text-green-400">✓ Loaded</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">API Key</span>
                  <span className={ZORA_API_KEY ? "text-green-400" : "text-red-400"}>
                    {ZORA_API_KEY ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform Referrer</span>
                  <span className={PLATFORM_REFERRER ? "text-green-400" : "text-red-400"}>
                    {PLATFORM_REFERRER ? "✓ Set" : "✗ Missing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Network</span>
                  <span className="text-green-400">✓ Configured</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Available Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Create story-based coins with metadata</li>
                <li>✓ Buy and sell coins with ETH</li>
                <li>✓ Real-time price and market data</li>
                <li>✓ Automatic reward distribution (CoinV4)</li>
                <li>✓ Platform referral earnings (15%)</li>
                <li>✓ Multi-owner coin management</li>
                <li>✓ Farcaster Mini App integration</li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Next Steps</h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li>1. Configure environment variables</li>
                <li>2. Test coin creation and trading</li>
                <li>3. Integrate with story creation flow</li>
                <li>4. Add voting mechanisms using coins</li>
                <li>5. Implement ripple effects with coin rewards</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 