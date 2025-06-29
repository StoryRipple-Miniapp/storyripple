'use client';

import { Header } from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen font-rounded page-content" style={{ backgroundColor: '#1f1334' }}>
      <Header />
      
      <div className="px-4 py-6 space-y-6 relative z-10 max-w-sm mx-auto">
        
        {/* Empty State */}
        <div className="text-center py-16 space-y-6">
          {/* Icon */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
              <FontAwesomeIcon icon={faTrophy} className="text-4xl text-purple-400" />
            </div>
            {/* Floating mini icons */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 flex items-center justify-center backdrop-blur-sm">
              <FontAwesomeIcon icon={faUsers} className="text-xs text-blue-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-400/30 flex items-center justify-center backdrop-blur-sm">
              <FontAwesomeIcon icon={faChartLine} className="text-xs text-violet-400" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white">
            No Leaderboard Yet
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-center max-w-xs mx-auto leading-relaxed">
            The leaderboard is currently empty. Start creating and sharing stories to see creators ranked by their community impact!
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">0</div>
              <div className="text-xs text-gray-400 mt-1">Creators</div>
            </div>
            <div className="bg-black/30 backdrop-blur-md border border-blue-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">0</div>
              <div className="text-xs text-gray-400 mt-1">Stories</div>
            </div>
            <div className="bg-black/30 backdrop-blur-md border border-violet-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-violet-400">0</div>
              <div className="text-xs text-gray-400 mt-1">Ripples</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-4">
              Be the first to appear on the leaderboard
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105">
              Create Your First Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 