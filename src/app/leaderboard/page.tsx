'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<'creators' | 'ripplers'>('creators');

  const leaders = [
    { name: 'Azumi', handle: '@azumi_nfts', earnings: '2,055.02', rank: 1, avatar: '👤' },
    { name: 'Pascal', handle: '@pascal_dev', earnings: '1,501.99', rank: 2, avatar: '👤' },
    { name: 'Sunday', handle: '@sunday_art', earnings: '800.56', rank: 3, avatar: '👤' },
    { name: 'LumaGekko', handle: '@lumagekko', earnings: '565.99', rank: 4, avatar: '👤' },
    { name: 'LadyIce', handle: '@ladyice_nft', earnings: '491.00', rank: 5, avatar: '👤' },
    { name: 'Colin Johnson', handle: '@colin_j', earnings: '55.02', rank: 6, avatar: '👤' },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Leader Board" showWallet walletBalance="0" />
      
      <div className="px-6">
        {/* Filter Tabs */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('creators')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                filter === 'creators' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-400'
              }`}
            >
              <span>🏆</span>
              <span>Trending Creators</span>
            </button>
            <button
              onClick={() => setFilter('ripplers')}
              className={`text-gray-400 ${filter === 'ripplers' ? 'text-purple-400' : ''}`}
            >
              Ripplers
            </button>
          </div>
          <button className="flex items-center space-x-2 text-gray-400">
            <span>⚙️</span>
            <span>Filter</span>
          </button>
        </div>

        {/* Leaders List */}
        <div className="space-y-3">
          {leaders.map((leader) => (
            <div key={leader.rank} className="card-gradient rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">{leader.avatar}</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold">#{leader.rank}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{leader.name}</div>
                    <div className="text-gray-400 text-sm">{leader.handle}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">${leader.earnings}</div>
                  <div className="text-gray-400 text-sm">Total Earned</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 