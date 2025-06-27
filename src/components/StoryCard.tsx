import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbsUp, faWater, faDollarSign, faCoins } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState } from 'react';
import { useZoraCoins } from '@/hooks/useZoraCoins';
import { useAccount } from 'wagmi';

interface StoryCardProps {
  title: string;
  author: string;
  image: string;
  votes: number;
  ripples: number;
  liquidity: string;
  coinAddress?: string;
  coinSymbol?: string;
  coinPrice?: string;
}

export function StoryCard({ title, author, image, votes, ripples, liquidity, coinAddress, coinSymbol, coinPrice }: StoryCardProps) {
  const [showTrading, setShowTrading] = useState(false);
  const [buyAmount, setBuyAmount] = useState('0.01');
  const { isConnected } = useAccount();
  const { buyCoin, sellCoin, isLoading, error } = useZoraCoins();

  const handleBuyCoin = async () => {
    if (!coinAddress || !isConnected) return;
    try {
      await buyCoin(coinAddress, buyAmount);
      alert('Purchase successful!');
      setShowTrading(false);
    } catch (err) {
      console.error('Buy failed:', err);
      alert('Purchase failed');
    }
  };
  return (
    <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl shadow-lg overflow-hidden group">
      <div className="relative h-32">
        <Image 
          src={`https://picsum.photos/seed/${title.replace(/\s/g, '-')}/400/200`}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-3 left-4 right-4 font-display font-semibold text-white text-lg line-clamp-2">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm mb-3">
        <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} size="xs" className="text-purple-300" />
            </div>
            <span className="text-gray-300 font-medium">{author}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon icon={faThumbsUp} className="text-gray-500" />
            <span>{votes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon icon={faWater} className="text-gray-500" />
            <span>{ripples} Ripples</span>
          </div>
          <div className="flex items-center space-x-1 font-medium text-green-400">
            <FontAwesomeIcon icon={faDollarSign} />
            <span>{liquidity}</span>
          </div>
        </div>
        
        {/* Coin Trading Section */}
        {coinAddress && (
          <div className="mt-3 pt-3 border-t border-gray-600">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCoins} className="text-yellow-400" />
                <span className="text-yellow-400 text-xs font-medium">{coinSymbol || 'COIN'}</span>
                <span className="text-gray-400 text-xs">${coinPrice || '0.001'}</span>
              </div>
              <button
                onClick={() => setShowTrading(!showTrading)}
                className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors"
                disabled={!isConnected}
              >
                {isConnected ? 'Trade' : 'Connect Wallet'}
              </button>
            </div>
            
            {/* Trading Interface */}
            {showTrading && isConnected && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="0.01"
                    step="0.01"
                    min="0.001"
                    className="flex-1 px-2 py-1 bg-black/30 border border-gray-600 rounded text-white text-xs"
                  />
                  <span className="text-gray-400 text-xs">ETH</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleBuyCoin}
                    disabled={isLoading}
                    className="flex-1 px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
                  >
                    {isLoading ? 'Buying...' : 'Buy'}
                  </button>
                  <button
                    onClick={() => setShowTrading(false)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 