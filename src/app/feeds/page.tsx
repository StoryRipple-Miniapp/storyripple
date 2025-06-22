'use client';

import { Header } from '@/components/Header';
import { StoryCard } from '@/components/StoryCard';
import { RippleCard } from '@/components/RippleCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFire, faWater, faStar, faChevronRight, faCrown } from '@fortawesome/free-solid-svg-icons';

export default function FeedsPage() {
  const featuredCreators = [
    { name: 'Alice', avatar: '/avatars/1.jpg', badge: '🔥', level: 'Elite' },
    { name: 'Bob', avatar: '/avatars/2.jpg', badge: '⭐', level: 'Pro' },
    { name: 'Carol', avatar: '/avatars/3.jpg', badge: '💎', level: 'Legend' },
    { name: 'Dave', avatar: '/avatars/4.jpg', badge: '🚀', level: 'Rising' },
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
      <Header />
      
      <div className="px-6 space-y-10 animate-fade-in">
        {/* Featured Creators */}
        <section className="animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="featured-card w-12 h-12 flex items-center justify-center">
                <FontAwesomeIcon icon={faCrown} size="sm" className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-primary">Featured Creators</h2>
                <p className="text-secondary text-sm">Top storytellers this week</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 text-accent hover:text-accent-secondary transition-colors btn-secondary py-2 px-4">
              <span className="text-sm font-medium font-display">See All</span>
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {featuredCreators.map((creator, index) => (
              <div key={index} className="flex-shrink-0 nft-card p-5 min-w-[100px] group cursor-pointer">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <div className="featured-card w-16 h-16 flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} className="text-primary text-xl" />
                    </div>
                    <div className="absolute -top-1 -right-1 text-lg animate-bounce-subtle">
                      {creator.badge}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-primary block">{creator.name}</span>
                    <span className="text-xs text-muted font-medium">{creator.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Stories */}
        <section className="animate-slide-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="featured-card w-12 h-12 flex items-center justify-center animate-glow">
                <FontAwesomeIcon icon={faFire} size="sm" className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-gradient">Trending Stories</h2>
                <p className="text-secondary text-sm">Hot stories gaining traction</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 text-accent hover:text-accent-secondary transition-colors btn-secondary py-2 px-4">
              <span className="text-sm font-medium font-display">View All</span>
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trendingStories.map((story, index) => (
              <StoryCard key={index} {...story} />
            ))}
          </div>
        </section>

        {/* Ripples */}
        <section className="animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="featured-card w-12 h-12 flex items-center justify-center">
                <FontAwesomeIcon icon={faWater} size="sm" className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-primary">Latest Ripples</h2>
                <p className="text-secondary text-sm">Fresh story continuations</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 achievement-badge">
              <FontAwesomeIcon icon={faStar} size="xs" className="text-warning" />
              <span className="text-warning text-sm font-semibold">Trending</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {ripples.map((ripple, index) => (
              <RippleCard key={index} {...ripple} />
            ))}
          </div>
        </section>

        {/* Bottom Spacer */}
        <div className="h-8"></div>
      </div>
    </div>
  );
} 