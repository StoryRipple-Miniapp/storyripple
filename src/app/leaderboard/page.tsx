'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faChevronDown, faFilter, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState('creators');

  const leaders = [
    { 
      id: 1,
      name: 'Azumi', 
      avatar: 'https://picsum.photos/seed/azumi/60/60',
      earnings: '2,055.02', 
      rank: 1,
      storiesCreated: 14,
      storiesRippled: 71,
      votesEarned: 59
    },
    { 
      id: 2,
      name: 'Pascal', 
      avatar: 'https://picsum.photos/seed/pascal/60/60',
      earnings: '1,001.99', 
      rank: 2,
      storiesCreated: 12,
      storiesRippled: 45,
      votesEarned: 38
    },
    { 
      id: 3,
      name: 'Sundry', 
      avatar: 'https://picsum.photos/seed/sundry/60/60',
      earnings: '880.58', 
      rank: 3,
      storiesCreated: 8,
      storiesRippled: 32,
      votesEarned: 29
    },
    { 
      id: 4,
      name: 'LumeGekko', 
      avatar: 'https://picsum.photos/seed/lumegekko/60/60',
      earnings: '566.99', 
      rank: 4,
      storiesCreated: 6,
      storiesRippled: 28,
      votesEarned: 22
    },
    { 
      id: 5,
      name: 'LadyIce', 
      avatar: 'https://picsum.photos/seed/ladyice/60/60',
      earnings: '491.00', 
      rank: 5,
      storiesCreated: 5,
      storiesRippled: 24,
      votesEarned: 18
    },
    { 
      id: 6,
      name: 'Colin Johnson', 
      avatar: 'https://picsum.photos/seed/colin/60/60',
      earnings: '55.02', 
      rank: 6,
      storiesCreated: 2,
      storiesRippled: 8,
      votesEarned: 5
    },
  ];

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
      
      <div className="px-4 py-6 space-y-6 relative z-10 max-w-sm mx-auto pt-28 pb-32">
        
        {/* Filter Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-full px-4 py-3 text-white font-display font-medium text-sm flex items-center justify-center space-x-2 hover:border-[#7c3aed] transition-all">
            <FontAwesomeIcon icon={faTrophy} />
            <span>Trending Creators</span>
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </button>
          
          <button className="flex-1 bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-full px-4 py-3 text-white font-display font-medium text-sm flex items-center justify-center space-x-2 hover:border-[#7c3aed] transition-all">
            <FontAwesomeIcon icon={faFilter} />
            <span>Filter</span>
            <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
          </button>
        </div>

        {/* Leaders List */}
        <div className="space-y-4">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl overflow-hidden relative group hover:border-[#7c3aed] transition-all duration-300">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 p-4">
                {/* Top section with rank, avatar, name and earnings */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-white font-bold text-lg">#{leader.rank}</div>
                    <Image
                      src={leader.avatar}
                      alt={leader.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="text-white font-medium">{leader.name}</p>
                      <p className="text-gray-400 text-sm">view info</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-white font-bold text-lg">{leader.earnings}</div>
                    <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
                  </div>
                </div>

                {/* Stats section */}
                <div className="bg-black/40 rounded-lg p-3 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white font-bold text-lg">{leader.storiesCreated}</p>
                    <p className="text-gray-400 text-xs">STORIES CREATED</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{leader.storiesRippled}</p>
                    <p className="text-gray-400 text-xs">STORIES RIPPLED</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{leader.votesEarned}</p>
                    <p className="text-gray-400 text-xs">VOTES EARNED</p>
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