'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faEdit, faWarning } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

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

export default function RipplePage() {
  const [ripples, setRipples] = useState<Ripple[]>([
    {
      id: 1,
      author: 'Lady Ice',
      username: '@Lady.Ice',
      avatar: 'https://picsum.photos/seed/lady/40/40',
      content: "Why does money matter when hope can't be bought? I saw a broken vending machine in the alley, coins clinking like distant laughter more valuable than any currency.",
      upvotes: 30,
      hasUpvoted: false,
      isExpanded: false
    },
    {
      id: 2,
      author: 'Lenny Lexus',
      username: '@Lenny.Lexus',
      avatar: 'https://picsum.photos/seed/lenny/40/40',
      content: "I slipped a coin into the slot anyway. The machine whirred, then ejected a brass key stamped with a stranger's name. 'Trust me'",
      upvotes: 14,
      hasUpvoted: false,
      isExpanded: false
    },
    {
      id: 3,
      author: 'Pookie',
      username: '@Pookie',
      avatar: 'https://picsum.photos/seed/pookie/40/40',
      content: "That key led me to a hidden vault below the city—inside, shelves groaned under ledgers of people's dreams, recorded in ink and debt.",
      upvotes: 10,
      hasUpvoted: false,
      isExpanded: false
    }
  ]);

  const [newRipple, setNewRipple] = useState('');
  const [rippleCount, setRippleCount] = useState(8);

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

  const toggleExpand = (id: number) => {
    setRipples(ripples.map(ripple => 
      ripple.id === id 
        ? { ...ripple, isExpanded: !ripple.isExpanded }
        : ripple
    ));
  };

  const handleCreateRipple = () => {
    if (!newRipple.trim()) return;
    
    const newRippleObj: Ripple = {
      id: ripples.length + 1,
      author: 'You',
      username: '@You',
      avatar: 'https://picsum.photos/seed/you/40/40',
      content: newRipple,
      upvotes: 0,
      hasUpvoted: false,
      isExpanded: false
    };
    
    setRipples([newRippleObj, ...ripples]);
    setNewRipple('');
    setRippleCount(rippleCount - 1);
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
      
      <div className="px-4 py-6 space-y-4 relative z-10 max-w-sm mx-auto pt-28 pb-32">
        {/* Page Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-display font-bold text-white">Ripple</h1>
        </div>

        {/* Ripple Count Alert */}
        <div className="bg-blue-900/30 border border-blue-400 rounded-lg p-3 flex items-center space-x-2 mb-6">
          <FontAwesomeIcon icon={faWarning} className="text-blue-400" />
          <span className="text-blue-300 text-sm font-medium">
            RIPPPLE NOW! {rippleCount} Ripples Left
          </span>
        </div>

        {/* Ripple Thread */}
        <div className="space-y-4">
          {ripples.map((ripple, index) => (
            <div
              key={ripple.id}
              className="bg-black/40 backdrop-blur-md border border-gray-600 rounded-xl overflow-hidden relative group"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/20 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 p-4">
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Image
                      src={ripple.avatar}
                      alt={ripple.author}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-white font-medium text-sm">{ripple.author}</span>
                      <span className="text-blue-400 text-sm">{ripple.username}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {ripple.isExpanded 
                        ? ripple.content 
                        : ripple.content.length > 100 
                          ? `${ripple.content.substring(0, 100)}...`
                          : ripple.content
                      }
                    </p>

                    {ripple.content.length > 100 && (
                      <button
                        onClick={() => toggleExpand(ripple.id)}
                        className="text-blue-400 text-sm hover:text-blue-300 transition-colors mb-2"
                      >
                        {ripple.isExpanded ? 'Read less ↑' : 'Read more ↓'}
                      </button>
                    )}
                  </div>

                  {/* Upvote Button */}
                  <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                    <button
                      onClick={() => handleUpvote(ripple.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        ripple.hasUpvoted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-700 hover:bg-green-600 text-gray-300 hover:text-white'
                      }`}
                    >
                      <FontAwesomeIcon icon={faArrowUp} className="text-xs" />
                    </button>
                    <span className="text-white text-xs font-medium">
                      {ripple.upvotes} Upvotes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Ripple Section */}
        <div className="fixed bottom-20 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-gray-600 p-4">
          <div className="max-w-sm mx-auto">
            <div className="mb-3">
              <h3 className="text-white font-display font-medium text-lg mb-2">Create a Ripple*</h3>
              <div className="bg-purple-900/40 border border-purple-400 rounded-lg px-3 py-2 inline-block">
                <span className="text-purple-300 text-sm">⚠ Requires 0.50 RIPPLES</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <textarea
                  value={newRipple}
                  onChange={(e) => setNewRipple(e.target.value)}
                  placeholder="Enter your text here... ✏️"
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg p-3 text-gray-300 placeholder-gray-500 resize-none focus:outline-none focus:border-purple-400 transition-colors"
                  rows={3}
                  maxLength={100}
                />
                <div className="absolute bottom-2 right-2 text-gray-500 text-xs">
                  {newRipple.length}/100
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-gray-400 text-sm">Gas Fee of 0.50 RIPPLE will be incurred</span>
                </div>
              </div>

              <button
                onClick={handleCreateRipple}
                disabled={!newRipple.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-full font-display font-medium transition-colors"
              >
                POST YOUR RIPPLE*
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 