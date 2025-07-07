'use client';

import { Header } from '@/components/Header';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faEye, faEyeSlash, faCopy, faSpinner, faCoins, faCircleInfo, faExclamationTriangle, faExchangeAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useAccount, useConnect, useBalance, useSwitchChain } from 'wagmi';
import { useZoraCoins } from '@/hooks/useZoraCoins';
import { TradingWidget } from '@/components/TradingWidget';
import { baseSepolia } from 'wagmi/chains';

export default function WalletPage() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchChain } = useSwitchChain();
  
  // Fetch Base Sepolia balance with error handling
  const { data: balance, isLoading: balanceLoading, error: balanceError, refetch: refetchBalance } = useBalance({
    address: address,
    chainId: baseSepolia.id,
    query: {
      enabled: isConnected && !!address,
      refetchInterval: 10000, // Refetch every 10 seconds
      retry: 3,
    }
  });

  const { isLoading: zoraLoading, error: zoraError, getUserCoinBalances } = useZoraCoins();
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [coinBalances, setCoinBalances] = useState<any[]>([]);
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [switchingNetwork, setSwitchingNetwork] = useState(false);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  
  // Check if user is on the correct network
  const isOnCorrectNetwork = chain?.id === baseSepolia.id;
  
  // Fetch ETH price from CoinGecko
  const fetchEthPrice = async () => {
    setPriceLoading(true);
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error('Failed to fetch ETH price:', error);
      setEthPrice(null);
    } finally {
      setPriceLoading(false);
    }
  };
  
  // Fetch ETH price on component mount and every 60 seconds
  useEffect(() => {
    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);
  
  // Load coin balances when wallet is connected
  useEffect(() => {
    if (isConnected && address && isOnCorrectNetwork) {
      setLoadingBalances(true);
      getUserCoinBalances().then((balances) => {
        setCoinBalances(balances);
        setLoadingBalances(false);
      });
    }
  }, [isConnected, address, getUserCoinBalances, isOnCorrectNetwork]);

  // Reload balances when page becomes visible
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isConnected && address && isOnCorrectNetwork) {
        setLoadingBalances(true);
        getUserCoinBalances().then((balances) => {
          setCoinBalances(balances);
          setLoadingBalances(false);
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isConnected, address, getUserCoinBalances, isOnCorrectNetwork]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'userCreatedStories') {
        if (isConnected && address && isOnCorrectNetwork) {
          setLoadingBalances(true);
          getUserCoinBalances().then((balances) => {
            setCoinBalances(balances);
            setLoadingBalances(false);
          });
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [isConnected, address, getUserCoinBalances, isOnCorrectNetwork]);

  const handleRefreshBalances = () => {
    if (isConnected && address && isOnCorrectNetwork) {
      setLoadingBalances(true);
      getUserCoinBalances().then((balances) => {
        setCoinBalances(balances);
        setLoadingBalances(false);
      });
    }
  };
  
  // Debug logging for balance issues
  useEffect(() => {
    if (isConnected && address) {
      console.log('=== WALLET DEBUG INFO ===');
      console.log('Address:', address);
      console.log('Connected:', isConnected);
      console.log('Current Chain:', chain?.name, chain?.id);
      console.log('Target Chain:', baseSepolia.name, baseSepolia.id);
      console.log('Is on correct network:', isOnCorrectNetwork);
      console.log('Balance:', balance);
      console.log('Balance Loading:', balanceLoading);
      console.log('Balance Error:', balanceError);
      console.log('ETH Price:', ethPrice);
      console.log('========================');
    }
  }, [isConnected, address, chain, balance, balanceLoading, balanceError, isOnCorrectNetwork, ethPrice]);
  
  const handleAddFunds = () => {
    // Open Base Sepolia faucet in new window
    window.open('https://faucet.quicknode.com/base/sepolia', '_blank');
  };
  
  const handleSwitchNetwork = async () => {
    if (!switchChain) return;
    
    setSwitchingNetwork(true);
    try {
      await switchChain({ chainId: baseSepolia.id });
      // Refetch balance after network switch
      setTimeout(() => {
        refetchBalance();
      }, 1000);
    } catch (error) {
      console.error('Failed to switch network:', error);
    } finally {
      setSwitchingNetwork(false);
    }
  };
  
  const fullWalletAddress = address || "0x0000000000000000000000000000000000000000";
  const shortWalletAddress = address 
    ? `${address.substring(0, 6)}....${address.substring(address.length - 4)}`
    : "0x0000....0000";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullWalletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const handleTradeComplete = (txHash: string) => {
    // Refresh balances after trade
    if (isConnected && address) {
      refetchBalance();
      getUserCoinBalances().then((balances) => {
        setCoinBalances(balances);
      });
    }
  };

  // Get current creation costs for display
  const STORY_CREATION_COST = '0.005'  // 0.005 ETH for story
  const RIPPLE_CREATION_COST = '0.002' // 0.002 ETH for ripple

  // Helper function to format balance display
  const formatBalance = () => {
    if (balanceLoading) return 'Loading...';
    if (balanceError) return 'Error loading balance';
    if (!isConnected) return '0.000 ETH';
    if (!isOnCorrectNetwork) return 'Switch to Base Sepolia';
    if (balance) return `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`;
    return '0.000 ETH';
  };

  // Helper function to calculate and format USD value
  const formatUsdValue = () => {
    if (!balance || !ethPrice || balanceLoading || balanceError || !isConnected || !isOnCorrectNetwork) {
      return null;
    }
    
    const ethAmount = parseFloat(balance.formatted);
    const usdValue = ethAmount * ethPrice;
    return usdValue.toFixed(2);
  };

  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
      <Header />
      
      <div className="px-4 py-6 space-y-5 relative z-10 max-w-sm mx-auto overflow-y-auto scrollbar-hide pt-24">
        {/* Network Warning */}
        {isConnected && !isOnCorrectNetwork && (
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-400" />
              <span className="text-orange-400 font-medium text-sm">Wrong Network</span>
            </div>
            <p className="text-orange-300 text-xs mb-3">
              You're connected to {chain?.name || 'Unknown Network'}. Please switch to Base Sepolia to see your balance and use the app.
            </p>
            <button
              onClick={handleSwitchNetwork}
              disabled={switchingNetwork}
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-full font-display font-medium text-sm hover:bg-orange-600 transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={switchingNetwork ? faSpinner : faExchangeAlt} className={switchingNetwork ? 'animate-spin' : ''} />
              <span>{switchingNetwork ? 'Switching...' : 'Switch to Base Sepolia'}</span>
            </button>
          </div>
        )}

        {/* Balance Error */}
        {balanceError && isOnCorrectNetwork && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400" />
              <span className="text-red-400 font-medium text-sm">Balance Error</span>
            </div>
            <p className="text-red-300 text-xs mb-3">
              Failed to load balance: {balanceError.message}
            </p>
            <button
              onClick={() => refetchBalance()}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-full font-display font-medium text-sm hover:bg-red-600 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <FontAwesomeIcon icon={faSpinner} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Wallet Balance Card */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-sm font-medium font-display">Wallet Balance</h3>
            <div className="text-xs text-purple-400 flex items-center">
              <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
              {chain?.name || 'Base Sepolia Network'}
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-lg p-6 relative group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(86,70,166,0.3)] opacity-60"></div>
            
            <div className="text-center relative z-10">
              <div className="text-3xl font-bold text-white mb-1">
                {formatBalance()}
              </div>
              
              {/* USD Value Display */}
              {formatUsdValue() && (
                <div className="text-lg font-medium text-green-400 mb-2 flex items-center justify-center space-x-1">
                  <FontAwesomeIcon icon={faDollarSign} className="text-sm" />
                  <span>${formatUsdValue()} USD</span>
                  {priceLoading && (
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xs ml-1" />
                  )}
                </div>
              )}
              
              <div className="text-xs text-gray-400 mb-3">
                {!isConnected ? 'Connect wallet to see balance' : 
                 !isOnCorrectNetwork ? 'Switch to Base Sepolia network' :
                 balanceLoading ? 'Loading balance...' :
                 'Available for creating stories and ripples'}
              </div>
              
              {/* ETH Price Display */}
              {ethPrice && isConnected && isOnCorrectNetwork && (
                <div className="text-xs text-gray-500 mb-3">
                  ETH Price: ${ethPrice.toLocaleString()} USD
                </div>
              )}
              
              {isConnected && isOnCorrectNetwork && !balanceError && (
                <div className="space-y-2 text-left bg-black/20 rounded-lg p-3 border border-[#5646a6]/30">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Story Creation Cost:</span>
                    <div className="text-right">
                      <span className="text-white">{STORY_CREATION_COST} ETH</span>
                      {ethPrice && (
                        <div className="text-xs text-gray-400">
                          ${(parseFloat(STORY_CREATION_COST) * ethPrice).toFixed(2)} USD
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Ripple Creation Cost:</span>
                    <div className="text-right">
                      <span className="text-white">{RIPPLE_CREATION_COST} ETH</span>
                      {ethPrice && (
                        <div className="text-xs text-gray-400">
                          ${(parseFloat(RIPPLE_CREATION_COST) * ethPrice).toFixed(2)} USD
                        </div>
                      )}
                    </div>
                  </div>
                  {parseFloat(balance?.formatted || '0') < parseFloat(STORY_CREATION_COST) && (
                    <div className="text-orange-400 text-xs mt-2 flex items-center">
                      <FontAwesomeIcon icon={faCircleInfo} className="mr-1" />
                      Insufficient balance for story creation
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {isConnected && isOnCorrectNetwork && (
            <button 
              onClick={handleAddFunds}
              className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full font-display font-medium text-sm hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <FontAwesomeIcon icon={faCoins} />
              <span>Get Free Base Sepolia ETH</span>
            </button>
          )}
        </div>

        {/* Wallet Address Card */}
        <div className="space-y-2">
          <h3 className="text-white text-sm font-medium font-display">Wallet Address</h3>
          <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-lg p-4 relative group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(86,70,166,0.3)] opacity-60"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex-1 min-w-0 mr-4">
                <span className="text-white font-mono text-sm block truncate">
                  {showFullAddress ? fullWalletAddress : shortWalletAddress}
                </span>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button 
                  onClick={() => setShowFullAddress(!showFullAddress)}
                  className="text-[#5646a6] hover:text-white transition-colors p-1 flex items-center space-x-1"
                  title={showFullAddress ? "Hide address" : "Show full address"}
                >
                  <FontAwesomeIcon icon={showFullAddress ? faEyeSlash : faEye} size="sm" />
                  <span className="text-xs">{showFullAddress ? "Hide" : "Show"}</span>
                </button>
                <button 
                  onClick={handleCopyAddress}
                  className={`${copySuccess ? 'text-[#c0b7d4]' : 'text-[#5646a6]'} hover:text-white transition-colors p-1 flex items-center space-x-1`}
                  title={copySuccess ? "Copied!" : "Copy address"}
                >
                  <FontAwesomeIcon icon={faCopy} size="sm" />
                  <span className="text-xs">{copySuccess ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Connect Wallet Button */}
        {!isConnected && (
          <button 
            onClick={() => connect({ connector: connectors[0] })}
            className="w-full bg-[#c0b7d4] text-black px-4 py-3 rounded-full font-display font-medium text-sm transition-all flex items-center justify-center space-x-2 hover:bg-[#d4cbe0] shadow-lg"
          >
            <FontAwesomeIcon icon={faCoins} />
            <span>Connect Wallet</span>
          </button>
        )}

        {/* Story Coin Balances */}
        {isConnected && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-sm font-medium font-display">Story Coin Balances</h3>
              <button
                onClick={handleRefreshBalances}
                disabled={loadingBalances}
                className="px-3 py-1 bg-[#5646a6] text-white rounded text-xs font-medium hover:bg-[#6d5fc7] transition-colors disabled:opacity-50"
              >
                {loadingBalances ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            {loadingBalances ? (
              <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 text-center">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin text-purple-400 mb-2" />
                <p className="text-gray-400 text-sm">Loading coin balances...</p>
              </div>
            ) : coinBalances.length > 0 ? (
              <div className="space-y-2">
                {coinBalances.map((coin, index) => (
                  <div key={index} className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium text-sm">{coin.symbol}</div>
                        <div className="text-gray-400 text-xs">{coin.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium text-sm">{parseFloat(coin.balance).toFixed(0)}</div>
                        <div className="text-gray-400 text-xs">{coin.value} ETH</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 text-center">
                <p className="text-gray-400 text-sm">
                  No story coins found. Create stories with coins to see them here!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom padding for navigation clearance */}
        <div className="h-4"></div>
      </div>
    </div>
  );
} 