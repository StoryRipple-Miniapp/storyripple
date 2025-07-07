'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faEdit, faWarning, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { GalaxyBackground } from '@/components/GalaxyBackground';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useZoraCoins } from '@/hooks/useZoraCoins';
import { useRouter } from 'next/navigation';

interface Ripple {
  id: number;
  author: string;
  username: string;
  avatar: string;
  content: string;
  upvotes: number;
  hasUpvoted: boolean;
  isExpanded: boolean;
}

export default function StoryRipplePage() {
  const params = useParams();
  const storyId = params?.id as string;
  
  // Mock original stories data - in real app this would come from API
  const originalStories: {[key: string]: any} = {
    '1': {
      title: 'The Hunger Games: Arena of Choices',
      author: 'Katniss Everdeen',
      content: 'The arena shimmers before us - a wasteland of broken glass and twisted metal. The cornucopia gleams in the center, stocked with weapons and supplies. But I notice something different this time... there are three tunnels leading underground, each marked with a different district symbol. The gamemakers want us to choose our path. Do we rush for the cornucopia, explore the tunnels, or flee to the outer rim?',
      genre: 'Hunger Games'
    },
    '2': {
      title: 'Electoral Crossroads',
      author: 'Senator Williams', 
      content: 'The campaign war room buzzed with tension. Poll numbers were neck-and-neck, and we had just received leaked documents about our opponent\'s dark money funding. The decision lay before us: expose the corruption and risk seeming desperate, or take the high road and potentially lose everything we\'ve worked for. Either choice would change the political landscape forever.',
      genre: 'Politics'
    },
    '3': {
      title: 'Comedy Club Chaos',
      author: 'Comedy Central Mike',
      content: 'The spotlight blinded me as I approached the mic. My set was bombing spectacularly - crickets everywhere. Then I spotted her in the audience: my ex-girlfriend, the one who inspired all my best material... and all my worst heartbreak. I had two choices: stick to my safe, unfunny script, or risk everything with improvised jokes about our relationship. The audience was waiting...',
      genre: 'Humor'
    }
  };

  const currentStory = originalStories[storyId] || originalStories['1'];
  
  const [ripples, setRipples] = useState<Ripple[]>([
    {
      id: 1,
      author: 'TributeHunter92',
      username: '@TributeHunter92',
      avatar: 'https://picsum.photos/seed/hunter/40/40',
      content: `I choose the tunnel marked with District 12's symbol. As I descend, the walls are lined with coal dust - a reminder of home. But wait... I hear Peeta's voice echoing from deeper within. He's found something down here, something the gamemakers don't want us to see. A cache of bread, enough to feed half the tributes. Do we share it and risk exposing our location, or keep it secret?`,
      upvotes: 45,
      hasUpvoted: false,
      isExpanded: false
    },
    {
      id: 2,
      author: 'MockingjayRebel',
      username: '@MockingjayRebel',
      avatar: 'https://picsum.photos/seed/rebel/40/40',
      content: `Forget the tunnels! I grab a bow from the cornucopia and immediately notice the force field shimmering at the arena's edge. Using my knowledge from previous games, I fire an arrow at the weak point I spotted. The entire section flickers and shorts out. There's our escape route - but the Careers have seen what I've done. They're coming for me, and I have to choose: run for freedom or stay and fight to help others escape too.`,
      upvotes: 62,
      hasUpvoted: false,
      isExpanded: false
    },
    {
      id: 3,
      author: 'DistrictAlly',
      username: '@DistrictAlly',
      avatar: 'https://picsum.photos/seed/ally/40/40',
      content: `I ignore both options and head to the outer rim where I find something unexpected: a hidden camera crew recording everything. They're not gamemaker cameras - they're rebel cameras, broadcasting our struggles to the districts in real-time. The leader hands me a choice: we can hijack the broadcast to send a message of hope to the districts, but it means certain death when the gamemakers find us. What's more important - survival or rebellion?`,
      upvotes: 38,
      hasUpvoted: false,
      isExpanded: false
    }
  ]);

  const [newRipple, setNewRipple] = useState('');
  const [rippleCount, setRippleCount] = useState(12);
  
  // Add state to track created ripples
  const [userCreatedRipples, setUserCreatedRipples] = useState<Ripple[]>([]);

  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { sendTransaction } = useSendTransaction();
  const { createStoryCoin } = useZoraCoins();
  const router = useRouter();
  const [pendingTx, setPendingTx] = useState<{ hash: string | null, pending: boolean }>({ hash: null, pending: false });
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const RIPPLE_CREATION_COST = '0.002';

  // Load user created ripples from localStorage
  useEffect(() => {
    const loadUserRipples = () => {
      try {
        const storedRipples = localStorage.getItem(`userCreatedRipples_${storyId}`);
        if (storedRipples) {
          const parsedRipples = JSON.parse(storedRipples);
          setUserCreatedRipples(parsedRipples);
        }
      } catch (error) {
        console.error('Error loading user ripples:', error);
      }
    };

    loadUserRipples();
  }, [storyId]);

  // Combine ripples with user created ripples
  const allRipples = [...userCreatedRipples, ...ripples];

  const handleUpvote = (id: number) => {
    setRipples(ripples.map(ripple => 
      ripple.id === id 
        ? { 
            ...ripple, 
            upvotes: ripple.hasUpvoted ? ripple.upvotes - 1 : ripple.upvotes + 1,
            hasUpvoted: !ripple.hasUpvoted 
          }
        : ripple
    ));
  };

  const handleCreateRipple = async () => {
    if (!newRipple.trim()) return;
    if (!isConnected || !address) {
      setToast({ message: 'Please connect your wallet to create a ripple', type: 'error' });
      return;
    }
    const currentBalance = balance ? parseFloat(balance.formatted) : 0;
    const requiredAmount = parseFloat(RIPPLE_CREATION_COST);
    if (currentBalance < requiredAmount) {
      setToast({ message: 'Insufficient balance to create a ripple', type: 'error' });
      return;
    }
    setIsSubmitting(true);
    let coinData = null;
    try {
      const newRippleId = `ripple-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      coinData = await createStoryCoin({
        title: newRipple.substring(0, 50),
        author: {
          name: address?.slice(0, 6) + '...' + address?.slice(-4) || 'Anonymous',
          title: 'Ripple Creator',
          avatar: 'https://picsum.photos/seed/you/40/40',
          verified: false
        },
        description: newRipple,
        storyId: newRippleId
      });
    } catch (coinErr) {
      setToast({ message: coinErr instanceof Error ? coinErr.message : 'Failed to create coin', type: 'error' });
    }
    const newRippleObj: Ripple = {
      id: Date.now(),
      author: 'You',
      username: '@You',
      avatar: 'https://picsum.photos/seed/you/40/40',
      content: newRipple,
      upvotes: 0,
      hasUpvoted: false,
      isExpanded: false
    };
    const txParams = {
      to: '0x000000000000000000000000000000000000dEaD' as `0x${string}`,
      value: parseEther(RIPPLE_CREATION_COST),
    };
    await sendTransaction(txParams);
    setPendingTx({ hash: '', pending: true });
    // Add to user created ripples immediately
    const updatedUserRipples = [newRippleObj, ...userCreatedRipples];
    setUserCreatedRipples(updatedUserRipples);
    localStorage.setItem(`userCreatedRipples_${storyId}`, JSON.stringify(updatedUserRipples));
    setToast({ message: 'Ripple created! (pending confirmation)', type: 'success' });
    setIsSubmitting(false);
    setNewRipple('');
    setRippleCount(rippleCount - 1);
    setTimeout(() => router.push('/feeds'), 1500);
    setTimeout(() => setPendingTx({ hash: null, pending: false }), 30000);
  };

  // Alert styling for error messages
  const Alert = ({ message }: { message: string }) => (
    <div className="w-full bg-[#2a0d18] border-l-4 border-[#ff3b3b] text-[#ff3b3b] rounded-b-xl px-4 py-3 mt-0 mb-2 font-medium text-base">
      {message}
    </div>
  );

  return (
    <div className="min-h-screen font-rounded page-content" style={{ backgroundColor: '#1f1334' }}>
      <GalaxyBackground />
      <Header />
      
      <div className="px-4 py-6 space-y-4 relative z-10 max-w-lg mx-auto pt-24">
        {/* Original Story */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-400 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FontAwesomeIcon icon={faBookOpen} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium uppercase tracking-wide">Original Story</span>
            <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
              {currentStory.genre}
            </span>
          </div>
          <h1 className="text-xl font-bold text-white mb-3">{currentStory.title}</h1>
          <p className="text-sm text-gray-300 mb-4">by {currentStory.author}</p>
          <p className="text-white leading-relaxed">{currentStory.content}</p>
        </div>

        {/* Ripple Count Alert */}
        <div className="bg-blue-900/30 border border-blue-400 rounded-lg p-3 flex items-center space-x-2 mb-6">
          <FontAwesomeIcon icon={faWarning} className="text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">
            CREATE YOUR RIPPLE! {rippleCount} Story Continuations Left
          </span>
        </div>

        {/* Create New Ripple */}
        <div className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <FontAwesomeIcon icon={faEdit} className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Continue This Story</span>
          </div>
          <textarea
            value={newRipple}
            onChange={(e) => setNewRipple(e.target.value)}
            placeholder="What happens next in this story? Add your continuation, plot twist, or character decision..."
            className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400"
            rows={4}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-400">{newRipple.length}/500 characters</span>
            <button
              onClick={handleCreateRipple}
              disabled={!newRipple.trim() || isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Ripple'}
            </button>
          </div>
        </div>

        {/* Story Ripples */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">Story Continuations ({allRipples.length})</h2>
          {allRipples.map((ripple) => (
            <div
              key={ripple.id}
              className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl overflow-hidden relative group hover:border-purple-400 transition-all"
            >
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <Image
                    src={ripple.avatar}
                    alt={ripple.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-white">{ripple.author}</span>
                      <span className="text-xs text-gray-400">{ripple.username}</span>
                    </div>
                    <p className="text-white leading-relaxed">{ripple.content}</p>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        onClick={() => handleUpvote(ripple.id)}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all text-sm ${
                          ripple.hasUpvoted 
                            ? 'text-green-400 bg-green-400/10' 
                            : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                        }`}
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                        <span>{ripple.upvotes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 