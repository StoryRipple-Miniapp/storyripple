'use client';

import { Header } from '@/components/Header';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faImage, faPaperPlane, faReply, faCoins, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAccount } from 'wagmi';
import { useZoraCoins } from '@/hooks/useZoraCoins';

export default function CreatePage() {
  const [storyText, setStoryText] = useState('');
  const [maxRipples, setMaxRipples] = useState(30);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRippleMode, setIsRippleMode] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [createCoin, setCreateCoin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isConnected } = useAccount();
  const { createStoryCoin, isLoading } = useZoraCoins();

  const categories = ['Fantasy', 'Sci-Fi', 'Mystery', 'Horror', 'Romance', 'Adventure'];

  useEffect(() => {
    if (searchParams) {
      const rippleParam = searchParams.get('ripple');
      const storyIdParam = searchParams.get('storyId');
      
      if (rippleParam === 'true') {
        setIsRippleMode(true);
        setStoryId(storyIdParam);
      }
    }
  }, [searchParams]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    if (!storyText.trim()) return;

    setIsSubmitting(true);
    try {
      let coinData = null;
      
      // Create coin if enabled and not in ripple mode
      if (createCoin && !isRippleMode && isConnected) {
        coinData = await createStoryCoin({
          title: storyText.substring(0, 50), // Use first 50 chars as title
          author: 'Anonymous', // Could be fetched from Farcaster profile
          description: storyText
        });
      }

      // Create the story (this would integrate with your backend)
      const storyData = {
        text: storyText,
        categories: selectedCategories,
        maxRipples: isRippleMode ? undefined : maxRipples,
        coinAddress: coinData?.coinAddress,
        coinSymbol: coinData?.symbol,
        isRipple: isRippleMode,
        parentStoryId: storyId
      };

      console.log('Creating story:', storyData);

      // Navigate back to feeds after successful creation
      router.push('/feeds');
    } catch (error) {
      console.error('Failed to create story:', error);
    } finally {
      setIsSubmitting(false);
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
        {/* Story/Ripple Input Card */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 shadow-lg">
          <h3 className="text-white text-sm font-medium font-display mb-2">
            {isRippleMode ? 'Add your ripple to the story' : 'Write your story seed'}
          </h3>
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder={isRippleMode 
              ? "Continue the story... What happens next?" 
              : "In a realm where shadows dance and secrets whisper..."
            }
            className="w-full h-28 bg-transparent border-none outline-none text-white placeholder-gray-500 resize-none text-sm"
            maxLength={isRippleMode ? 500 : 250}
          />
          <div className="text-right text-gray-500 text-xs font-display">
            {storyText.length}/{isRippleMode ? 500 : 250}
          </div>
        </div>

        {/* Only show these sections for story creation, not ripples */}
        {!isRippleMode && (
          <>
            {/* Upload Thumbnail Card */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 shadow-lg text-center">
              <FontAwesomeIcon icon={faImage} className="text-purple-400 text-2xl mb-2" />
              <h3 className="text-white text-sm font-medium font-display mb-1">Upload Thumbnail</h3>
              <p className="text-xs text-gray-500">Tap to select an image</p>
            </div>

            {/* Story Categories Card */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 shadow-lg">
              <h3 className="text-white text-sm font-medium font-display mb-3">Story Categories</h3>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-2 rounded-full font-display font-medium text-xs flex items-center justify-center space-x-2 transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-[#c0b7d4] text-black'
                        : 'bg-black/20 border border-[#3f3379] text-white hover:bg-black/30'
                    }`}
                  >
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Set Max Ripples Card */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 shadow-lg">
              <h3 className="text-white text-sm font-medium font-display mb-3">Set Max Ripples</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={maxRipples}
                  onChange={(e) => setMaxRipples(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
                <div className="text-center text-white text-lg font-bold font-display">{maxRipples}</div>
              </div>
            </div>

            {/* Create Coin Toggle */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white text-sm font-medium font-display">Create Story Coin</h3>
                <FontAwesomeIcon icon={faCoins} className="text-yellow-400" />
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Enable trading for your story. Readers can buy/sell your story coin based on its popularity.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">
                  {createCoin ? 'Coin will be created' : 'No coin creation'}
                </span>
                <button
                  onClick={() => setCreateCoin(!createCoin)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    createCoin ? 'bg-[#c0b7d4]' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      createCoin ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              {!isConnected && createCoin && (
                <p className="text-xs text-orange-400 mt-2">
                  ⚠️ Connect wallet to create coins
                </p>
              )}
            </div>
          </>
        )}

        {/* Gas Fee Warning for Ripples */}
        {isRippleMode && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-yellow-400 text-lg">⚠️</span>
              <h3 className="text-white font-bold text-sm font-display">Gas Fee Required</h3>
            </div>
            <p className="text-gray-200 text-xs">
              Creating a ripple costs 0.001 RIPPLES in gas fees
            </p>
          </div>
        )}

        {/* Create Button */}
        <button 
          onClick={handleSubmit}
          disabled={!storyText.trim() || isSubmitting || isLoading}
          className="w-full bg-[#c0b7d4] hover:bg-[#d4cbe0] text-black px-4 py-3 rounded-full font-display font-medium text-sm transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(isSubmitting || isLoading) ? (
            <>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              <span>
                {createCoin && !isRippleMode ? 'Creating Story & Coin...' : isRippleMode ? 'Adding Ripple...' : 'Creating Story...'}
              </span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={isRippleMode ? faReply : faPaperPlane} />
              <span>{isRippleMode ? 'Add Ripple' : 'Start Story Seed'}</span>
            </>
          )}
        </button>

        <div className="h-4"></div>
      </div>
    </div>
  );
} 