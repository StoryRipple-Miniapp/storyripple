'use client';

import { Header } from '@/components/Header';
import { StoryCard } from '@/components/StoryCard';
import { RippleCard } from '@/components/RippleCard';

export default function FeedsPage() {
  const featuredCreators = [
    { name: 'Alice', avatar: '/avatars/1.jpg' },
    { name: 'Bob', avatar: '/avatars/2.jpg' },
    { name: 'Carol', avatar: '/avatars/3.jpg' },
    { name: 'Dave', avatar: '/avatars/4.jpg' },
  ];

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
    }
  ];

  const ripples = [
    {
      text: 'Why were twenty wolves standing in the garden, their eyes reflecting the moonlight like mirrors?',
      author: '@charlie',
      originalAuthor: '@alice',
      votes: 45,
      avatar: '/avatars/5.jpg'
    },
    {
      text: 'The old woman whispered something in a language I didn\'t recognize, but somehow I understood every word...',
      author: '@diana',
      originalAuthor: '@alice',
      votes: 32,
      avatar: '/avatars/6.jpg'
    },
    {
      text: 'Behind the garden gate, I could see lights dancing between the trees - but there was no wind.',
      author: '@eve',
      originalAuthor: '@alice',
      votes: 28,
      avatar: '/avatars/7.jpg'
    },
    {
      text: 'The captain\'s logbook mentioned coordinates that shouldn\'t exist in our galaxy...',
      author: '@frank',
      originalAuthor: '@bob',
      votes: 19,
      avatar: '/avatars/8.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header title="Feeds" showWallet walletBalance="0" />
      
      <div className="px-6">
        {/* Featured Creators */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Featured Creators</h2>
          <div className="flex space-x-4">
            {featuredCreators.map((creator, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-white text-xl">👤</span>
                </div>
                <span className="text-xs text-gray-400">{creator.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Stories */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">TRENDING STORIES</h2>
          <div className="grid grid-cols-2 gap-3">
            {trendingStories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </div>
        </section>

        {/* Ripples */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">RIPPLES</h2>
            <div className="flex items-center space-x-2">
              <span className="text-purple-400 text-sm">Trending</span>
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⚡</span>
              </div>
            </div>
          </div>
          <div>
            {ripples.map((ripple, index) => (
              <RippleCard key={index} {...ripple} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 