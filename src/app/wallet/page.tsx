'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faEye, faEyeSlash, faCopy, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAccount, useConnect, useBalance } from 'wagmi';
import { useZoraCoins } from '@/hooks/useZoraCoins';


export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { data: balance } = useBalance({
    address: address,
  });
  const { isLoading: zoraLoading, error: zoraError } = useZoraCoins();
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
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

  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
      {/* Improved galaxy/starfield background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large twinkling stars */}
        {[...Array(15)].map((_, i) => (
          <span
            key={`large-${i}`}
            className="absolute block bg-white rounded-full"
            style={{
              width: '2px',
              height: '2px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Medium floating stars */}
        {[...Array(25)].map((_, i) => (
          <span
            key={`medium-${i}`}
            className="absolute block bg-white rounded-full"
            style={{
              width: '1.5px',
              height: '1.5px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `galaxyFloat ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
        
        {/* Small pulsing stars */}
        {[...Array(40)].map((_, i) => (
          <span
            key={`small-${i}`}
            className="absolute block bg-white rounded-full"
            style={{
              width: '1px',
              height: '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `starPulse ${Math.random() * 5 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
        
        {/* Tiny distant stars */}
        {[...Array(60)].map((_, i) => (
          <span
            key={`tiny-${i}`}
            className="absolute block bg-white rounded-full opacity-30"
            style={{
              width: '0.5px',
              height: '0.5px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <Header />
      
      <div className="px-4 py-6 space-y-5 relative z-10 max-w-sm mx-auto overflow-y-auto scrollbar-hide">
        {/* Top Right Ripples Display */}
        <div className="flex justify-end">
          <div className="inline-flex items-center space-x-2 bg-black/30 backdrop-blur-md border border-[#5646a6]/40 rounded-full px-4 py-2 shadow-lg">
            <span className="text-white font-semibold text-sm">0 RIPPLES</span>
            {/* Profile image placeholder - will be replaced with actual profile fetch */}
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center border border-purple-300/30">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Wallet Address Card */}
        <div className="space-y-2">
          <h3 className="text-white text-sm font-medium font-display">Wallet Address</h3>
          <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-lg p-4 relative group shadow-lg">
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(86,70,166,0.3)] opacity-60"></div>
            
            <div className="flex items-center justify-between relative z-10">
              <span className="text-white font-mono text-sm">
                {showFullAddress ? fullWalletAddress : shortWalletAddress}
              </span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowFullAddress(!showFullAddress)}
                  className="text-[#5646a6] hover:text-white transition-colors p-1"
                  title={showFullAddress ? "Hide address" : "Show full address"}
                >
                  <FontAwesomeIcon icon={showFullAddress ? faEyeSlash : faEye} size="sm" />
                </button>
                <button 
                  onClick={handleCopyAddress}
                  className={`${copySuccess ? 'text-[#c0b7d4]' : 'text-[#5646a6]'} hover:text-white transition-colors p-1`}
                  title={copySuccess ? "Copied!" : "Copy address"}
                >
                  <FontAwesomeIcon icon={faCopy} size="sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <div className="space-y-2">
          <h3 className="text-white text-sm font-medium font-display">Wallet Balance</h3>
          <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-lg p-6 relative group shadow-lg">
            {/* Enhanced glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(86,70,166,0.3)] opacity-60"></div>
            
            <div className="text-center relative z-10">
              <div className="text-3xl font-bold text-white mb-1">
                {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '$0.00'}
              </div>
              <div className="text-xs text-gray-500">
                {isConnected ? 'Real wallet balance' : '1 RIPPLE = $1.00'}
              </div>
            </div>
          </div>
        </div>

        {/* Story Coin Balances */}
        {isConnected && (
          <div className="space-y-2">
            <h3 className="text-white text-sm font-medium font-display">Story Coin Balances</h3>
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 text-center">
              <p className="text-gray-400 text-sm">
                Coin balances will appear here once you own story coins
              </p>
            </div>
          </div>
        )}

        {/* Separator Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5646a6]/50 to-transparent"></div>

        {/* Terms & Conditions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 accent-[#c0b7d4] bg-transparent border-[#5646a6] rounded focus:ring-[#c0b7d4] focus:ring-2"
            />
            <label htmlFor="terms" className="text-xs text-gray-400">Terms & Conditions Apply</label>
          </div>
          
          <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
            <p>
              Gas Fee of <span className="text-white font-medium">1 RIPPLE</span> will be incurred for every Story Seed
            </p>
            <p>
              Gas Fee of <span className="text-white font-medium">0.50 RIPPLE</span> will be incurred for every Story Ripple
            </p>
            <p>
              Gas Fee of <span className="text-white font-medium">0.25 RIPPLE</span> will be incurred for 1 valid Upvote
            </p>
          </div>
        </div>

        {/* Action Buttons - Now in one line after terms */}
        <div className="flex space-x-3 pt-2">
          {!isConnected ? (
            <button 
              onClick={() => connect({ connector: connectors[0] })}
              className="w-full bg-[#c0b7d4] text-black px-4 py-2 rounded-full font-display font-medium text-xs flex items-center justify-center space-x-2 hover:bg-[#d4cbe0] transition-all whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faSpinner} />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => {
                  setIsCreatingWallet(true);
                  setTimeout(() => setIsCreatingWallet(false), 3000);
                }}
                className="flex-1 bg-[#c0b7d4] text-black px-4 py-2 rounded-full font-display font-medium text-xs flex items-center justify-center space-x-2 hover:bg-[#d4cbe0] transition-all whitespace-nowrap"
              >
                <FontAwesomeIcon 
                  icon={faSpinner} 
                  className={`${isCreatingWallet ? 'animate-spin' : ''}`} 
                  size="sm" 
                />
                <span>Wallet Connected</span>
              </button>
              
              <button className="flex-1 bg-black/20 backdrop-blur-md border border-[#3f3379] text-white px-4 py-2 rounded-full font-display font-medium text-xs hover:bg-black/30 transition-all shadow-lg whitespace-nowrap">
                Add funds
              </button>
            </>
          )}
        </div>

        {/* Bottom padding for navigation clearance */}
        <div className="h-4"></div>
      </div>
    </div>
  );
} 