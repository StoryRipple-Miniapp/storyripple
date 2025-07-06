'use client';

import { Header } from '@/components/Header';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp,
  faComment,
  faShare,
  faEllipsisH,
  faBookmark,
  faChevronDown,
  faCheckCircle,
  faPlus,
  faInfoCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount, useBalance, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

// Refined Alert styling for mobile: smaller font, less padding, softer red, rounded corners, max-w-xs on mobile
const Alert = ({ message }: { message: string }) => (
  <div className="w-full max-w-xs mx-auto bg-[#2a0d18] border-l-4 border-[#ff5a5a] text-[#ff5a5a] rounded-lg px-3 py-2 mt-1 mb-2 font-medium text-sm shadow-sm">
    {message}
  </div>
);

export default function FeedsPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { sendTransaction } = useSendTransaction()
  
  const [likedPosts, setLikedPosts] = useState<{[key: number]: boolean}>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<{[key: number]: boolean}>({});
  const [showInsufficientFunds, setShowInsufficientFunds] = useState<{[key: number]: boolean}>({});
  const [votingInProgress, setVotingInProgress] = useState<{[key: number]: boolean}>({});
  // Add a state for copiedPostId
  const [copiedPostId, setCopiedPostId] = useState<number | null>(null);
  const [error, setError] = useState<{ message: string, details?: string, context?: string } | null>(null);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  
  // Add state to track created stories from create page
  const [userCreatedStories, setUserCreatedStories] = useState<any[]>([]);

  // Voting cost in ETH (0.001 ETH per vote)
  const VOTING_COST = '0.001'

  // Add useEffect to load user created stories from localStorage
  useEffect(() => {
    const loadUserStories = () => {
      try {
        const storedStories = localStorage.getItem('userCreatedStories');
        if (storedStories) {
          const parsedStories = JSON.parse(storedStories);
          setUserCreatedStories(parsedStories);
        }
      } catch (error) {
        console.error('Error loading user stories:', error);
      }
    };

    loadUserStories();
  }, []);

  // Generate avatar function
  const generateAvatar = (name: string, color: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return {
      initials,
      color,
      bgColor: `bg-${color}-500`
    };
  };

  // Diverse LinkedIn-style feed posts with different genres
  const feedPosts = [
    {
      id: 1,
      author: {
        name: 'Katniss Everdeen',
        title: 'District 12 Tribute | Mockingjay',
        avatar: generateAvatar('Katniss Everdeen', 'green'),
        verified: true
      },
      content: 'The arena changes everything you think you know about survival. I\'ve been working on an interactive story where YOU choose the tribute\'s path. Do they ally with the Careers? Hide in the forest? Or attempt to destroy the arena itself? Each choice leads to different districts being inspired to rebel. The Capitol won\'t like this one... 🏹',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', // dystopian
      timeAgo: '1h',
      likes: 234,
      ripples: 89,
      poolValue: 156.80,
      type: 'dystopian',
      genre: 'Hunger Games'
    },
    {
      id: 2,
      author: {
        name: 'Senator Williams',
        title: 'Political Strategist | Campaign Manager',
        avatar: generateAvatar('Senator Williams', 'blue'),
        verified: true
      },
      content: 'Behind every election, there are a thousand untold stories of compromise and corruption. I\'m crafting an interactive political thriller where readers navigate the moral complexities of power. Do you expose the truth and lose everything, or play the game to change it from within? Democracy hangs in the balance with every choice. 🗳️',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // political
      timeAgo: '3h',
      likes: 178,
      ripples: 67,
      poolValue: 203.50,
      type: 'political',
      genre: 'Politics'
    },
    {
      id: 3,
      author: {
        name: 'Comedy Central Mike',
        title: 'Stand-up Comedian | Comedy Writer',
        avatar: generateAvatar('Comedy Central Mike', 'yellow'),
        verified: false
      },
      content: 'They say comedy is tragedy plus time... but what if readers could choose the punchline? I\'m building a choose-your-own-adventure comedy where every decision leads to either a standing ovation or getting booed off stage. The best part? Real comedians are contributing alternate endings based on their worst bombing experiences! 😂',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80', // comedy
      timeAgo: '5h',
      likes: 298,
      ripples: 124,
      poolValue: 89.25,
      type: 'comedy',
      genre: 'Humor'
    },
    {
      id: 4,
      author: {
        name: 'Isabella Rose',
        title: 'Romance Novelist | Hopeless Romantic',
        avatar: generateAvatar('Isabella Rose', 'pink'),
        verified: true
      },
      content: 'Love isn\'t just about the destination—it\'s about the choices that lead you there. My latest interactive romance lets readers shape not just the relationship, but the very definition of love itself. Will they choose passion over stability? Adventure over security? Each path reveals a different truth about the human heart. Some endings will make you cry happy tears. 💕',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80', // romance
      timeAgo: '7h',
      likes: 445,
      ripples: 203,
      poolValue: 278.75,
      type: 'romance',
      genre: 'Romance'
    },
    {
      id: 5,
      author: {
        name: 'Dr. Sarah Chen',
        title: 'AI Researcher | Sci-Fi Author',
        avatar: generateAvatar('Dr. Sarah Chen', 'purple'),
        verified: true
      },
      content: 'What happens when AI becomes indistinguishable from human consciousness? My interactive sci-fi story poses this question through the eyes of an android who doesn\'t know they\'re artificial. Readers must choose whether to reveal the truth or let them live in blissful ignorance. The philosophical implications are staggering—and the emotional impact is devastating. 🤖',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80', // sci-fi
      timeAgo: '9h',
      likes: 321,
      ripples: 156,
      poolValue: 345.30,
      type: 'scifi',
      genre: 'Science Fiction'
    },
    {
      id: 6,
      author: {
        name: 'Detective Morgan',
        title: 'Retired Homicide Detective | Crime Writer',
        avatar: generateAvatar('Detective Morgan', 'indigo'),
        verified: false
      },
      content: 'Twenty years on the force taught me that every case has multiple truths depending on your perspective. I\'m creating an interactive murder mystery where readers can investigate as the detective, the suspect, or even the victim\'s ghost. Each viewpoint reveals different clues and leads to different conclusions. Justice isn\'t always black and white. 🔍',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80', // mystery
      timeAgo: '11h',
      likes: 267,
      ripples: 98,
      poolValue: 145.60,
      type: 'mystery',
      genre: 'Mystery'
    }
  ];

  // Combine feed posts with user created stories
  const allPosts = [...userCreatedStories, ...feedPosts];

  const handleUpvote = async (postId: number) => {
    if (!isConnected || !address) {
      setError({ message: 'Please connect your wallet to vote', context: postId.toString() });
      return
    }

    // Check if user has enough balance
    const currentBalance = balance ? parseFloat(balance.formatted) : 0
    const requiredAmount = parseFloat(VOTING_COST)
    
    console.log('=== UPVOTE DEBUG ===')
    console.log('Connected:', isConnected)
    console.log('Address:', address)
    console.log('Balance object:', balance)
    console.log('Current balance:', currentBalance)
    console.log('Required amount:', requiredAmount)
    console.log('Chain:', balance?.symbol)
    console.log('===================')
    
    if (currentBalance < requiredAmount) {
      console.log('❌ INSUFFICIENT BALANCE')
      setError({ message: 'Insufficient balance!', details: `You have: ${currentBalance.toFixed(4)} ETH. You need: ${requiredAmount} ETH. Get testnet ETH from: https://faucet.quicknode.com/base/sepolia`, context: postId.toString() });
      setShowInsufficientFunds(prev => ({ ...prev, [postId]: true }));
      setTimeout(() => {
        setShowInsufficientFunds(prev => ({ ...prev, [postId]: false }));
      }, 5000);
      return;
    }

    if (currentBalance === 0) {
      console.log('❌ ZERO BALANCE')
      setError({ message: 'Your wallet balance is 0 ETH!', details: 'Get testnet ETH from: https://faucet.quicknode.com/base/sepolia', context: postId.toString() });
      return;
    }

    console.log('✅ Balance check passed, attempting transaction...')
    setVotingInProgress(prev => ({ ...prev, [postId]: true }));
    
    try {
      // Send ETH as voting fee to a liquidity pool address
      const liquidityPoolAddress = '0x742d35Cc6634C0532925a3b8D7389CAd5A234D8f' // Replace with your liquidity pool address
      
      console.log('Sending transaction to:', liquidityPoolAddress)
      console.log('Amount:', VOTING_COST, 'ETH')
      
      const tx = await sendTransaction({
        to: liquidityPoolAddress,
        value: parseEther(VOTING_COST),
      })
      
      console.log('Vote transaction sent:', tx)
      
      // Update UI after successful transaction
      setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
      
      // Update the feed post pool value
      const postIndex = feedPosts.findIndex(post => post.id === postId)
      if (postIndex !== -1) {
        feedPosts[postIndex].poolValue += parseFloat(VOTING_COST)
        feedPosts[postIndex].likes += likedPosts[postId] ? -1 : 1
      }
      
      setError({ message: 'Vote successful!', details: `${VOTING_COST} ETH added to story prize pool.\n\nTransaction: ${tx}`, context: postId.toString() });
      
    } catch (error) {
      console.error('❌ Voting failed:', error)
      
      // More detailed error handling
      const errorMessage = error instanceof Error ? error.message : String(error)
      
      if (errorMessage?.includes('insufficient funds')) {
        setError({ message: 'Insufficient funds for gas fees!', details: 'You need more ETH to pay for transaction fees. Get testnet ETH from: https://faucet.quicknode.com/base/sepolia', context: postId.toString() });
      } else if (errorMessage?.includes('user rejected')) {
        setError({ message: 'Transaction was rejected by user', context: postId.toString() });
      } else {
        setError({ message: 'Voting failed!', details: errorMessage || 'Unknown error', context: postId.toString() });
      }
    } finally {
      setVotingInProgress(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleRippleClick = (postId: number) => {
    router.push(`/ripple/${postId}`);
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCreateStory = () => {
    router.push('/create');
  };

  // Update share handler to use custom message and preview image
  const handleShare = async (story: any) => {
    try {
      const shareUrl = `${window.location.origin}/ripple/${story.id}`;
      const shareText = `Join me on Story Ripple! Control the narrative of every story.\n\nCheck out this story: ${story.author.name} - ${story.content.substring(0, 100)}...`;
      const shareImage = `${window.location.origin}/assets/preview-1200x800.png`;
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([], 'preview-1200x800.png', { type: 'image/png' })] })) {
        await navigator.share({
          title: 'Story Ripple',
          text: shareText,
          url: shareUrl,
          files: [
            new File([], 'preview-1200x800.png', { type: 'image/png' })
          ]
        });
      } else {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          alert('Link copied to clipboard!');
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = `${shareText}\n${shareUrl}`;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Link copied to clipboard!');
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Mock ripples data for expanded view
  const mockRipples = [
    { id: 1, author: 'Alice', content: 'Great story! Love the interactive elements.', timeAgo: '2h' },
    { id: 2, author: 'Bob', content: 'This reminds me of my favorite book series.', timeAgo: '1h' },
    { id: 3, author: 'Carol', content: 'Can\'t wait to see where this goes next!', timeAgo: '30m' }
  ];

  // Update the insufficient funds tooltip text
  const getInsufficientFundsText = () => {
    return `Insufficient funds to vote - ${VOTING_COST} ETH required`
  }

  // Helper to convert ETH to USD (mocked, 1 ETH = $3500)
  const ETH_TO_USD = 3500;
  // Helper to clamp pool value to max $250
  const clampPoolValue = (eth: number) => Math.min(eth * ETH_TO_USD, 250);
  const toUSD = (eth: number) => `$${clampPoolValue(eth).toFixed(2)}`;

  // Set a max ripples per post
  const MAX_RIPPLES = 20;
  const clampRipples = (ripples: number) => Math.min(ripples, MAX_RIPPLES);

  return (
    <div className="min-h-screen font-rounded page-content" style={{ backgroundColor: '#1f1334' }}>
      <Header />
      <div className="px-4 py-6 space-y-4 relative z-10 max-w-sm mx-auto overflow-y-auto scrollbar-hide pt-12">
        {/* Create Button Section */}
        <div className="mb-6">
          {error && (
            <Alert message={error.message} />
          )}
          <button
            onClick={handleCreateStory}
            className="w-full btn-primary flex items-center justify-center space-x-3 py-4 rounded-xl hover:scale-105 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faPlus} className="text-lg" />
            <span className="text-lg font-semibold">Create Your Story</span>
          </button>
        </div>
        {/* Feed Posts */}
        <div className="space-y-6">
          {allPosts.map((post) => (
            <article key={post.id} className="bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-400 transition-all">
              
              {/* Post Header */}
              <div className="p-4 border-b border-gray-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Generated Avatar */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${post.author.avatar.color}-400 to-${post.author.avatar.color}-600 flex items-center justify-center text-white font-bold text-sm`}>
                      {post.author.avatar.initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{post.author.name}</h3>
                        {post.author.verified && (
                          <FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-sm" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{post.author.title}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">{post.timeAgo} ago</p>
                        <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                          {post.genre}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors p-2">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-white leading-relaxed mb-4">{post.content}</p>
                
                {/* Unified Image Sizing & Motion */}
                {post.image && (
                  <div className="rounded-lg overflow-hidden mb-4 group cursor-pointer" onClick={() => router.push(`/ripple/${post.id}`)}>
                    <Image
                      src={post.image}
                      alt="Post content"
                      width={500}
                      height={400}
                      className="w-full h-96 object-cover group-hover:scale-105 group-hover:brightness-110 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>

              {/* Engagement Stats */}
              <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span>{post.likes + (likedPosts[post.id] ? 1 : 0)} upvotes</span>
                  {/* Prize pool as green rectangle, labeled 'Liquidity' */}
                  <div className="flex space-x-4 items-center">
                    <span className="bg-green-900/80 border border-green-400 text-green-300 font-semibold rounded-lg px-3 py-1 text-xs flex items-center">
                      Liquidity: <span className="ml-2 text-green-200 font-bold">{toUSD(post.poolValue / ETH_TO_USD)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    {/* Upvote icon in square with rounded border, icon green */}
                    <button 
                      onClick={() => handleUpvote(post.id)}
                      disabled={votingInProgress[post.id]}
                      className="flex items-center space-x-2 bg-transparent p-0 border-none shadow-none"
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-md border border-green-400 bg-black/40">
                        <FontAwesomeIcon icon={faArrowUp} className="text-green-400" />
                      </span>
                      <span className="text-sm font-medium text-white">
                        {votingInProgress[post.id] ? 'Voting...' : 'Upvote'}
                      </span>
                    </button>

                    <button 
                      onClick={() => handleRippleClick(post.id)}
                      className="flex items-center space-x-2 bg-transparent p-0 border-none shadow-none"
                    >
                      <span className="w-6 h-6 flex items-center justify-center rounded-md border border-white bg-black/40">
                        <FontAwesomeIcon icon={faComment} className="text-white" />
                      </span>
                      <span className="text-sm font-medium text-white">Ripple</span>
                    </button>

                    <button onClick={() => handleShare(post)} className="flex items-center space-x-2 bg-transparent p-0 border-none shadow-none">
                      <span className="w-6 h-6 flex items-center justify-center rounded-md border border-white bg-black/40">
                        <FontAwesomeIcon icon={faShare} className="text-white" />
                      </span>
                      <span className="text-sm font-medium text-white">Share</span>
                      {copiedPostId === post.id && (
                        <span className="ml-2 text-xs text-green-400">Link copied!</span>
                      )}
                    </button>
                  </div>

                  <button 
                    onClick={() => handleBookmark(post.id)}
                    className={`p-2 rounded-full transition-all ${
                      bookmarkedPosts[post.id]
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-400'
                    }`}
                  >
                    <FontAwesomeIcon icon={faBookmark} className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Insufficient Funds Warning */}
              {showInsufficientFunds[post.id] && (
                <div className="px-4 py-3 bg-red-500/10 border-l-4 border-red-500">
                  <p className="text-sm text-red-400">
                    {getInsufficientFundsText()}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}