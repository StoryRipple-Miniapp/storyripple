'use client';

import { Header } from '@/components/Header';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faImage, faPaperPlane, faReply, faCoins, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useZoraCoins } from '@/hooks/useZoraCoins';
import Image from 'next/image';

export default function CreatePage() {
  const [storyText, setStoryText] = useState('');
  const [maxRipples, setMaxRipples] = useState(30);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isRippleMode, setIsRippleMode] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);
  const [createCoin, setCreateCoin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction } = useSendTransaction();
  const { createStoryCoin, isLoading } = useZoraCoins();

  // Add state to track created stories and pass them to feeds
  const [createdStories, setCreatedStories] = useState<any[]>([]);

  // Add error state for alert
  const [error, setError] = useState<string | null>(null);

  // Creation costs in ETH
  const STORY_CREATION_COST = '0.005'  // 0.005 ETH for story
  const RIPPLE_CREATION_COST = '0.002' // 0.002 ETH for ripple

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setThumbnail(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!storyText.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!isConnected || !address) {
      setError('Please connect your wallet to create a story');
      return;
    }

    // Check for sufficient ETH balance
    const currentBalance = balance ? parseFloat(balance.formatted) : 0;
    const requiredAmount = parseFloat(isRippleMode ? RIPPLE_CREATION_COST : STORY_CREATION_COST);
    if (currentBalance < requiredAmount) {
      setError('Insufficient balance');
      return;
    }

    setIsSubmitting(true);
    try {
      // Send ETH as creation fee
      const platformAddress = '0x000000000000000000000000000000000000dEaD'; // Burn address for demo
      
      await sendTransaction({
        to: platformAddress,
        value: parseEther(isRippleMode ? RIPPLE_CREATION_COST : STORY_CREATION_COST),
      });

      let coinData = null;
      
      // Create coin if enabled and not in ripple mode
      if (createCoin && !isRippleMode && isConnected) {
        // Generate a unique story ID for the coin
        const newStoryId = `story-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        
        coinData = await createStoryCoin({
          title: storyText.substring(0, 50), // Use first 50 chars as title
          author: 'Anonymous', // Could be fetched from Farcaster profile
          description: storyText,
          storyId: newStoryId
        });
      }

      // Create the story object for feeds
      const newStory = {
        id: Date.now(), // Use timestamp as unique ID
        author: {
          name: address?.slice(0, 6) + '...' + address?.slice(-4) || 'Anonymous',
          title: 'Story Creator',
          avatar: {
            initials: 'SC',
            color: 'purple'
          },
          verified: false
        },
        content: storyText,
        image: thumbnail || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
        timeAgo: 'just now',
        likes: 0,
        ripples: 0,
        poolValue: 0,
        type: 'user-created',
        genre: 'User Story',
        categories: selectedCategories,
        maxRipples: isRippleMode ? undefined : maxRipples,
        coinAddress: coinData?.coinAddress,
        coinSymbol: coinData?.symbol,
        isRipple: isRippleMode,
        parentStoryId: storyId
      };

      console.log('Creating story:', newStory);

      // Store in localStorage for feeds page to access
      const existingStories = JSON.parse(localStorage.getItem('userCreatedStories') || '[]');
      const updatedStories = [newStory, ...existingStories];
      localStorage.setItem('userCreatedStories', JSON.stringify(updatedStories));
      
      // Reset form
      setStoryText('');
      setSelectedCategories([]);
      setMaxRipples(30);
      setThumbnail(null);
      setCreateCoin(true);
      
      // Show success message
      alert('Story created successfully!');
      
      // Redirect to feeds after a short delay
      setTimeout(() => {
        router.push('/feeds');
      }, 1500);
      
    } catch (err) {
      console.error('Failed to create story:', err);
      alert('Creation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current creation cost for display
  const getCurrentCost = () => {
    return isRippleMode ? RIPPLE_CREATION_COST : STORY_CREATION_COST;
  };

  // Check if user has enough balance
  const hasEnoughBalance = () => {
    if (!balance) return false;
    const currentBalance = parseFloat(balance.formatted);
    const requiredAmount = parseFloat(getCurrentCost());
    return currentBalance >= requiredAmount;
  };

  return (
    <div className="min-h-screen font-rounded page-content" style={{ backgroundColor: '#1f1334' }}>
      <Header />
      
      <div className="px-4 py-6 space-y-5 relative z-10 max-w-sm mx-auto overflow-y-auto scrollbar-hide pt-24">
        {/* Story/Ripple Input Card */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 shadow-lg">
          <h3 className="text-white text-sm font-medium font-display mb-2">
            {isRippleMode ? 'Add your ripple to the story' : 'Write your story seed'}
          </h3>
          {error && (
            <div className="w-full max-w-xs mx-auto bg-[#2a0d18] border-l-4 border-[#ff5a5a] text-[#ff5a5a] rounded-lg px-3 py-2 mt-1 mb-2 font-medium text-sm shadow-sm">
              {error}
            </div>
          )}
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
              <label htmlFor="thumbnail-upload" className="block cursor-pointer">
                <FontAwesomeIcon icon={faImage} className="text-purple-400 text-2xl mb-2" />
                <h3 className="text-white text-sm font-medium font-display mb-1">Upload Thumbnail</h3>
                <p className="text-xs text-gray-500">Tap to select an image</p>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {thumbnail && (
                  <div className="mt-3 flex justify-center">
                    <Image
                      src={thumbnail}
                      alt="Thumbnail Preview"
                      width={120}
                      height={120}
                      className="rounded-lg object-cover max-h-32"
                    />
                  </div>
                )}
              </label>
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
              <h3 className="text-white font-bold text-sm font-display">Creation Fee Required</h3>
            </div>
            <p className="text-gray-200 text-xs">
              Creating a ripple costs {RIPPLE_CREATION_COST} ETH
            </p>
            {balance && (
              <p className="text-gray-300 text-xs mt-1">
                Your balance: {parseFloat(balance.formatted).toFixed(4)} ETH
              </p>
            )}
            {!hasEnoughBalance() && balance && (
              <p className="text-red-400 text-xs mt-1">
                ⚠️ Insufficient balance
              </p>
            )}
          </div>
        )}

        {/* Create Button */}
        <button 
          onClick={handleSubmit}
          disabled={!storyText.trim() || isSubmitting || isLoading || !hasEnoughBalance()}
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
              <span>
                {isRippleMode ? `Add Ripple (${RIPPLE_CREATION_COST} ETH)` : `Start Story (${STORY_CREATION_COST} ETH)`}
              </span>
            </>
          )}
        </button>

        <div className="h-4"></div>
      </div>
    </div>
  );
} 