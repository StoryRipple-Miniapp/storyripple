'use client';

import { Header } from '@/components/Header';
import { StoryCard } from '@/components/StoryCard';
import { RippleCard } from '@/components/RippleCard';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFire, faWater, faStar, faChevronRight, faCrown } from '@fortawesome/free-solid-svg-icons';

export default function FeedsPage() {
  const [activeTab, setActiveTab] = useState<'stories' | 'ripples'>('stories');

  const trendingStories = [
    {
      title: 'The Mysterious Garden',
      author: '@alice',
      image: '/stories/1.jpg',
      votes: 124,
      ripples: 23,
      liquidity: '$456.78'
    },
    {
      title: 'Space Adventure Chronicles',
      author: '@bob',
      image: '/stories/2.jpg',
      votes: 89,
      ripples: 15,
      liquidity: '$312.45'
    },
    {
      title: 'The Last Library on Earth',
      author: '@bookworm',
      image: '/stories/3.jpg',
      votes: 234,
      ripples: 45,
      liquidity: '$567.89'
    }
  ];

  const ripples = [
    {
      text: 'Why were twenty wolves standing in the garden, their eyes reflecting the moonlight like mirrors?',
      author: '@charlie',
      originalAuthor: '@alice',
      votes: 45,
      avatar: 'https://img.clerk.com/preview.png?size=100&seed=1&bg=blue&fg=white&initials=C'
    },
    {
      text: 'The old woman whispered something in a language I didn\'t recognize, but somehow I understood every word...',
      author: '@diana',
      originalAuthor: '@alice',
      votes: 32,
      avatar: 'https://img.clerk.com/preview.png?size=100&seed=2&bg=green&fg=black&initials=D'
    },
    {
      text: 'Behind the garden gate, I could see lights dancing between the trees - but there was no wind.',
      author: '@eve',
      originalAuthor: '@alice',
      votes: 28,
      avatar: 'https://img.clerk.com/preview.png?size=100&seed=3&bg=red&fg=white&initials=E'
    },
    {
      text: 'The captain\'s logbook mentioned coordinates that shouldn\'t exist in our galaxy...',
      author: '@frank',
      originalAuthor: '@bob',
      votes: 19,
      avatar: 'https://img.clerk.com/preview.png?size=100&seed=4&bg=yellow&fg=black&initials=F'
    }
  ];

  const renderTabs = () => (
    <div className="flex justify-center mb-5">
      <div className="bg-black/20 backdrop-blur-md border border-[#3f3379] rounded-full p-1 flex items-center space-x-2">
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 rounded-full font-display font-medium text-xs flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'stories' ? 'bg-[#c0b7d4] text-black' : 'text-white'
          }`}
        >
          <FontAwesomeIcon icon={faFire} />
          <span>Trending Stories</span>
        </button>
        <button
          onClick={() => setActiveTab('ripples')}
          className={`px-4 py-2 rounded-full font-display font-medium text-xs flex items-center justify-center space-x-2 transition-all ${
            activeTab === 'ripples' ? 'bg-[#c0b7d4] text-black' : 'text-white'
          }`}
        >
          <FontAwesomeIcon icon={faWater} />
          <span>Latest Ripples</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
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
      
      <div className="px-4 py-6 relative z-10 max-w-sm mx-auto overflow-y-auto scrollbar-hide">
        {renderTabs()}
        
        {activeTab === 'stories' && (
          <div className="space-y-4">
            {trendingStories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </div>
        )}

        {activeTab === 'ripples' && (
          <div className="space-y-3">
            {ripples.map((ripple, index) => (
              <RippleCard key={index} {...ripple} rippleId={index + 1} />
            ))}
          </div>
        )}

        <div className="h-4"></div>
      </div>
    </div>
  );
}