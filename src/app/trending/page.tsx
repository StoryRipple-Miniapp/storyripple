'use client';

import { Header } from '@/components/Header';
import { StoryCard } from '@/components/StoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faUser, faHeart, faWater, faDollarSign, faTrophy } from '@fortawesome/free-solid-svg-icons';

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
      <Header />
      
      <div className="px-6 space-y-8 animate-fade-in">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-8 animate-slide-up">
          <div className="featured-card w-14 h-14 flex items-center justify-center animate-float">
            <FontAwesomeIcon icon={faFire} size="lg" className="text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-gradient">
              Trending Stories
            </h2>
            <p className="text-secondary text-sm font-medium">
              Stories gaining momentum right now
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="space-y-6">
          {trendingStories.map((story, index) => (
            <div key={index} className="nft-card p-6 group cursor-pointer animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-start space-x-5">
                {/* Story Rank */}
                <div className="flex-shrink-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg font-display shadow-lg ${
                    index === 0 
                      ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' 
                      : index === 1 
                      ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
                      : index === 2
                      ? 'bg-gradient-to-br from-amber-600 to-yellow-700 text-white'
                      : 'bg-surface border border-custom text-muted'
                  }`}>
                    {index < 3 ? (
                      <FontAwesomeIcon icon={faTrophy} className="text-lg" />
                    ) : (
                      `#${index + 1}`
                    )}
                  </div>
                </div>

                {/* Story Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-primary text-xl mb-3 group-hover:text-gradient transition-all duration-300">
                    {story.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <FontAwesomeIcon icon={faUser} size="xs" className="text-muted" />
                    <span className="text-secondary text-sm font-medium">{story.author}</span>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="stats-card flex items-center space-x-2 p-2">
                      <FontAwesomeIcon icon={faHeart} size="xs" className="text-red-400" />
                      <span className="text-primary font-semibold">{story.votes}</span>
                    </div>
                    
                    <div className="stats-card flex items-center space-x-2 p-2">
                      <FontAwesomeIcon icon={faWater} size="xs" className="text-blue-400" />
                      <span className="text-primary font-semibold">{story.ripples}</span>
                    </div>
                    
                    <div className="stats-card flex items-center space-x-2 p-2">
                      <FontAwesomeIcon icon={faDollarSign} size="xs" className="text-green-400" />
                      <span className="text-gradient-gold font-semibold">{story.liquidity}</span>
                    </div>
                  </div>
                </div>

                {/* Trending Indicator */}
                <div className="flex-shrink-0">
                  <div className="w-1 h-12 bg-gradient-to-t from-orange-500 to-red-500 rounded-full animate-glow"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="nft-card p-8 text-center mt-12 animate-slide-up">
          <div className="featured-card w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-float">
            <FontAwesomeIcon icon={faFire} size="2x" className="text-primary" />
          </div>
          <h3 className="font-display font-bold text-primary text-xl mb-3">
            Stay on Top of Trends
          </h3>
          <p className="text-secondary text-sm leading-relaxed max-w-md mx-auto">
            Discover the hottest stories gaining momentum in the last 24 hours. 
            Join the conversation and earn rewards! 🚀
          </p>
          <button className="btn-primary mt-6 font-display">
            Explore More Stories
          </button>
        </div>
      </div>
    </div>
  );
} 