'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faComment,
  faArrowUp,
  faUser,
  faRefresh,
  faChevronLeft,
  faChevronRight,
  faDollarSign,
  faThumbsUp,
  faChevronDown,
  faCoins
} from '@fortawesome/free-solid-svg-icons';
import { useAccount } from 'wagmi';
import { useZoraCoins } from '@/hooks/useZoraCoins';

export default function FeedsPage() {
  const [rippleTab, setRippleTab] = useState<'trending' | 'recent'>('trending');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyVotes, setStoryVotes] = useState<{[key: number]: number}>({});
  const [rippleVotes, setRippleVotes] = useState<{[key: number]: number}>({});
  const [userVotedStories, setUserVotedStories] = useState<{[key: number]: boolean}>({});
  const [userVotedRipples, setUserVotedRipples] = useState<{[key: number]: boolean}>({});
  const [showTrading, setShowTrading] = useState<{[key: number]: boolean}>({});
  const [buyAmount, setBuyAmount] = useState('0.01');
  const router = useRouter();
  const { isConnected } = useAccount();
  const { buyCoin, isLoading, error } = useZoraCoins();

  const trendingStories = [
    {
      id: 1,
      title: 'I love dogs especially....',
      image: 'https://picsum.photos/seed/dog/400/240',
      ripples: 4,
      storyPool: 50.00,
      upvotes: 38,
      avatars: [
        'https://picsum.photos/seed/user1/40/40',
        'https://picsum.photos/seed/user2/40/40',
        'https://picsum.photos/seed/user3/40/40',
        'https://picsum.photos/seed/user4/40/40'
      ],
      // Real coin data - these would come from your backend/API
      coinAddress: '0x1234567890123456789012345678901234567890',
      coinSymbol: 'DOGS',
      coinPrice: '0.0023'
    },
    {
      id: 2,
      title: 'Money Matters..',
      image: 'https://picsum.photos/seed/money/400/240',
      ripples: 4,
      storyPool: 75.50,
      upvotes: 39,
      avatars: [
        'https://picsum.photos/seed/user5/40/40',
        'https://picsum.photos/seed/user6/40/40',
        'https://picsum.photos/seed/user7/40/40',
        'https://picsum.photos/seed/user8/40/40'
      ],
      coinAddress: '0x2345678901234567890123456789012345678901',
      coinSymbol: 'MONEY',
      coinPrice: '0.0041'
    },
    {
      id: 3,
      title: 'The Space Adventure Chronicles',
      image: 'https://picsum.photos/seed/space/400/240',
      ripples: 8,
      storyPool: 120.25,
      upvotes: 52,
      avatars: [
        'https://picsum.photos/seed/user9/40/40',
        'https://picsum.photos/seed/user10/40/40',
        'https://picsum.photos/seed/user11/40/40',
        'https://picsum.photos/seed/user12/40/40'
      ],
      coinAddress: '0x3456789012345678901234567890123456789012',
      coinSymbol: 'SPACE',
      coinPrice: '0.0067'
    },
    {
      id: 4,
      title: 'Mystery in the Old Library',
      image: 'https://picsum.photos/seed/library/400/240',
      ripples: 6,
      storyPool: 89.75,
      upvotes: 44,
      avatars: [
        'https://picsum.photos/seed/user13/40/40',
        'https://picsum.photos/seed/user14/40/40',
        'https://picsum.photos/seed/user15/40/40',
        'https://picsum.photos/seed/user16/40/40'
      ]
      // No coin for this story - showing both scenarios
    }
  ];

  const ripples = [
    {
      id: 1,
      text: 'Why does money matter so much in our society? It seems like everything revolves around it...',
      upvotes: 38,
      author: { avatar: 'https://picsum.photos/seed/author1/50/50', name: '@alex_writer', handle: 'Alex Writer' },
      originalStory: 'Money Matters..',
      timeAgo: '2h ago',
      image: 'https://picsum.photos/seed/money2/80/80'
    },
    {
      id: 2,
      text: 'The true value of money lies not in what it can buy, but in the freedom it provides...',
      upvotes: 16,
      author: { avatar: 'https://picsum.photos/seed/author2/50/50', name: '@sarah_tales', handle: 'Sarah Tales' },
      originalStory: 'Money Matters..',
      timeAgo: '4h ago',
      image: 'https://picsum.photos/seed/purple/80/80'
    },
    {
      id: 3,
      text: 'The success story of Steve Jobs teaches us that innovation beats everything else...',
      upvotes: 45,
      author: { avatar: 'https://picsum.photos/seed/author3/50/50', name: '@tech_guru', handle: 'Tech Guru' },
      originalStory: 'Success Stories',
      timeAgo: '6h ago',
      image: 'https://picsum.photos/seed/books/80/80'
    },
    {
      id: 4,
      text: 'Women are who they are because society shapes them, but they can reshape society too...',
      upvotes: 22,
      author: { avatar: 'https://picsum.photos/seed/author4/50/50', name: '@emma_voice', handle: 'Emma Voice' },
      originalStory: 'Women Empowerment',
      timeAgo: '8h ago',
      image: 'https://picsum.photos/seed/women/80/80'
    },
    {
      id: 5,
      text: 'I love dogs honestly because they teach us unconditional love every single day...',
      upvotes: 30,
      author: { avatar: 'https://picsum.photos/seed/author5/50/50', name: '@dog_lover', handle: 'Dog Lover' },
      originalStory: 'I love dogs especially....',
      timeAgo: '12h ago',
      image: 'https://picsum.photos/seed/dogs/80/80'
    }
  ];

  // Navigation functions
  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % trendingStories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + trendingStories.length) % trendingStories.length);
  };

  // Vote functions
  const handleStoryVote = (storyId: number, currentVotes: number) => {
    if (userVotedStories[storyId]) {
      setStoryVotes(prev => ({ ...prev, [storyId]: (prev[storyId] || currentVotes) - 1 }));
      setUserVotedStories(prev => ({ ...prev, [storyId]: false }));
    } else {
      setStoryVotes(prev => ({ ...prev, [storyId]: (prev[storyId] || currentVotes) + 1 }));
      setUserVotedStories(prev => ({ ...prev, [storyId]: true }));
    }
  };

  const handleRippleVote = (rippleId: number, currentVotes: number) => {
    if (userVotedRipples[rippleId]) {
      setRippleVotes(prev => ({ ...prev, [rippleId]: (prev[rippleId] || currentVotes) - 1 }));
      setUserVotedRipples(prev => ({ ...prev, [rippleId]: false }));
    } else {
      setRippleVotes(prev => ({ ...prev, [rippleId]: (prev[rippleId] || currentVotes) + 1 }));
      setUserVotedRipples(prev => ({ ...prev, [rippleId]: true }));
    }
  };

  const handleCreateRipple = (storyId: number) => {
    router.push(`/create?ripple=true&storyId=${storyId}`);
  };

  const getCurrentStories = () => {
    const stories = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentStoryIndex + i) % trendingStories.length;
      stories.push(trendingStories[index]);
    }
    return stories;
  };

  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
      {/* Galaxy Background */}
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
      
      <div className="px-4 py-6 relative z-10 max-w-sm mx-auto pt-28 pb-32 space-y-8">
        
        {/* Trending Stories Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-bold font-display">TRENDING STORIES</h2>
            <div className="flex space-x-2">
              <button
                onClick={prevStory}
                className="w-8 h-8 bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-full flex items-center justify-center text-white hover:border-[#7c3aed] transition-all"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
              </button>
              <button
                onClick={nextStory}
                className="w-8 h-8 bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-full flex items-center justify-center text-white hover:border-[#7c3aed] transition-all"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {getCurrentStories().map((story) => (
              <div key={story.id} className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-md border border-[#5646a6] rounded-2xl overflow-hidden relative group hover:border-[#7c3aed] transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/20 via-transparent to-[#5646a6]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Story Image */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  
                  {/* Story Content */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-3 leading-tight line-clamp-2">{story.title}</h3>
                    
                    {/* User Avatars */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {story.avatars.slice(0, 3).map((avatar, index) => (
                            <img
                              key={index}
                              src={avatar}
                              alt={`User ${index + 1}`}
                              className="w-6 h-6 rounded-full border-2 border-[#1f1334] hover:scale-110 transition-transform"
                            />
                          ))}
                        </div>
                        <span className="text-gray-300 text-xs ml-2 font-medium">+{story.ripples}</span>
                      </div>
                      
                      {/* Upvote Button */}
                      <button
                        onClick={() => handleStoryVote(story.id, story.upvotes)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                          userVotedStories[story.id] 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                            : 'bg-black/30 text-gray-400 hover:text-green-400 hover:bg-green-500/20'
                        }`}
                      >
                        <FontAwesomeIcon icon={faThumbsUp} className="text-sm" />
                      </button>
                    </div>
                    
                    {/* Story Pool & Upvotes */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-2 border border-green-500/30">
                        <FontAwesomeIcon icon={faDollarSign} className="text-green-400 text-sm" />
                        <span className="text-green-400 font-bold text-sm">{story.storyPool.toFixed(2)}</span>
                        <span className="text-green-300 text-xs">POOL</span>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-white text-xs font-medium">
                          {storyVotes[story.id] || story.upvotes} Upvotes
                        </p>
                      </div>
                    </div>

                    {/* Coin Trading Section */}
                    {story.coinAddress && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            <FontAwesomeIcon icon={faCoins} className="text-yellow-400 text-xs" />
                            <span className="text-yellow-400 text-xs font-medium">{story.coinSymbol}</span>
                            <span className="text-gray-400 text-xs">${story.coinPrice}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTrading(prev => ({ ...prev, [story.id]: !prev[story.id] }));
                            }}
                            className="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors"
                            disabled={!isConnected}
                          >
                            {isConnected ? 'Trade' : 'Connect'}
                          </button>
                        </div>
                        
                        {/* Trading Interface */}
                        {showTrading[story.id] && isConnected && (
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
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  await buyCoin(story.coinAddress!, buyAmount);
                                  alert('Purchase successful!');
                                  setShowTrading(prev => ({ ...prev, [story.id]: false }));
                                } catch (err) {
                                  console.error('Buy failed:', err);
                                  alert('Purchase failed');
                                }
                              }}
                              disabled={isLoading}
                              className="w-full px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-xs rounded transition-colors"
                            >
                              {isLoading ? 'Buying...' : 'Buy Coin'}
                            </button>
                            {error && (
                              <p className="text-red-400 text-xs">{error}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {trendingStories.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(index / 2) === Math.floor(currentStoryIndex / 2)
                    ? 'bg-[#c0b7d4] w-6' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Ripples Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-bold font-display">RIPPLES</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setRippleTab('trending')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  rippleTab === 'trending' 
                    ? 'bg-gradient-to-r from-[#c0b7d4] to-[#d4cbe0] text-black' 
                    : 'bg-black/30 text-gray-400 border border-[#5646a6] hover:border-[#7c3aed]'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setRippleTab('recent')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  rippleTab === 'recent' 
                    ? 'bg-gradient-to-r from-[#c0b7d4] to-[#d4cbe0] text-black' 
                    : 'bg-black/30 text-gray-400 border border-[#5646a6] hover:border-[#7c3aed]'
                }`}
              >
                Recent
              </button>
            </div>
          </div>

          {/* Ripples List */}
          <div className="bg-gradient-to-r from-[#4c3b7a]/40 to-[#5b4a8a]/30 backdrop-blur-md border border-[#6b5b9a]/50 rounded-2xl overflow-hidden">
            {ripples.map((ripple, index) => (
              <div key={ripple.id} className="relative">
                <div className="p-5 flex items-center space-x-4">
                  {/* Left: Upvote Button */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleRippleVote(ripple.id, ripple.upvotes)}
                      className="w-14 h-14 rounded-full bg-gradient-to-b from-green-400 to-green-500 text-white flex items-center justify-center transition-all hover:shadow-lg hover:shadow-green-500/30"
                    >
                      <FontAwesomeIcon icon={faArrowUp} className="text-lg" />
                    </button>
                    <span className="text-white text-sm font-medium mt-2">
                      {rippleVotes[ripple.id] || ripple.upvotes} Upvotes
                    </span>
                  </div>
                  
                  {/* Center Left: Story Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={ripple.image} 
                      alt="Story"
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  </div>
                  
                  {/* Center: Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg mb-3 leading-tight">
                      {ripple.text}
                    </h3>
                    <button className="text-gray-300 text-sm flex items-center space-x-1 hover:text-white transition-colors">
                      <span>Read more</span>
                      <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                    </button>
                  </div>
                  
                  {/* Right: Rippler & Creator */}
                  <div className="flex flex-col space-y-4">
                    {/* Rippler */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-1 font-medium">RIPPLER</div>
                      <img 
                        src={ripple.author.avatar} 
                        alt={ripple.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    
                    {/* Creator */}
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-1 font-medium">CREATOR</div>
                      <img 
                        src={`https://picsum.photos/seed/creator${ripple.id}/50/50`} 
                        alt="Creator"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    
                    {/* Refresh Icon */}
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                        <FontAwesomeIcon icon={faRefresh} className="text-green-400 text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Thin separator line (except for last item) */}
                {index < ripples.length - 1 && (
                  <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}