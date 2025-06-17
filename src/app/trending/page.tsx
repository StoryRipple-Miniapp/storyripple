'use client';

import { Header } from '@/components/Header';
import { StoryCard } from '@/components/StoryCard';

export default function TrendingPage() {
  const trendingStories = [
    {
      title: 'The Time Traveler\'s Last Warning',
      author: '@timekeeper',
      image: '/stories/1.jpg',
      votes: 456,
      ripples: 89,
      liquidity: '$1,234.56'
    },
    {
      title: 'Echoes in the Digital Void',
      author: '@cypher',
      image: '/stories/2.jpg',
      votes: 389,
      ripples: 67,
      liquidity: '$987.43'
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

  return (
    <div className="min-h-screen">
      <Header title="Trending" showWallet walletBalance="0" />
      
      <div className="px-6">
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-2xl">🔥</span>
          <h2 className="text-xl font-bold text-white">Hot Stories</h2>
        </div>

        <div className="space-y-4">
          {trendingStories.map((story, index) => (
            <div key={index} className="card-gradient rounded-2xl p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl">📖</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{story.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{story.author}</span>
                    <span>👍 {story.votes}</span>
                    <span>🌊 {story.ripples}</span>
                    <span className="text-green-400">{story.liquidity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>Stories gaining momentum in the last 24 hours 📈</p>
        </div>
      </div>
    </div>
  );
} 