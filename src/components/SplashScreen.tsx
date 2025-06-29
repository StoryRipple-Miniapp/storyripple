'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadApp = () => {
    setIsLoading(true);
    
    // Give enough time to load properly (2.5 seconds)
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#1f1334' }}>
      {/* Clean 2D Galaxy Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Regular twinkling stars */}
        <div className="star-2d absolute" style={{ left: '20%', top: '10%', width: '2px', height: '2px', opacity: 0.8 }} />
        <div className="star-2d absolute" style={{ left: '80%', top: '20%', width: '1px', height: '1px', opacity: 0.6 }} />
        <div className="star-2d absolute" style={{ left: '30%', top: '30%', width: '2px', height: '2px', opacity: 0.7 }} />
        <div className="star-2d absolute" style={{ left: '70%', top: '40%', width: '1px', height: '1px', opacity: 0.5 }} />
        <div className="star-2d absolute" style={{ left: '15%', top: '50%', width: '2px', height: '2px', opacity: 0.9 }} />
        <div className="star-2d absolute" style={{ left: '85%', top: '60%', width: '1px', height: '1px', opacity: 0.4 }} />
        <div className="star-2d absolute" style={{ left: '40%', top: '70%', width: '2px', height: '2px', opacity: 0.6 }} />
        <div className="star-2d absolute" style={{ left: '60%', top: '80%', width: '1px', height: '1px', opacity: 0.8 }} />
        <div className="star-2d absolute" style={{ left: '10%', top: '90%', width: '2px', height: '2px', opacity: 0.7 }} />
        <div className="star-2d absolute" style={{ left: '90%', top: '85%', width: '1px', height: '1px', opacity: 0.5 }} />
        
        {/* Shooting stars */}
        <div className="shooting-star absolute" style={{ left: '10%', top: '20%' }} />
        <div className="shooting-star absolute" style={{ left: '70%', top: '60%', animationDelay: '3s' }} />
        
        {/* Subtle background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/3 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/2 to-transparent pointer-events-none" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Simple Story Book Icon - Wallet Style */}
        <div className="flex flex-col items-center">
          <div className="nft-card w-20 h-20 flex items-center justify-center group">
            <FontAwesomeIcon icon={faBook} size="2x" className="text-white" />
          </div>
          <span className="text-sm text-gray-400 mt-3 font-medium">Story Ripple</span>
        </div>

        {/* App Title */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 font-display">
            Welcome to StoryRipple
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            Collaborative branching stories
          </p>
        </div>

        {/* Loading Button */}
        <div className="pt-4">
          {!isLoading ? (
            <button
              onClick={handleLoadApp}
              className="nft-card px-8 py-4 text-white font-medium hover:scale-105 transition-all duration-300"
            >
              Enter the Story Universe
            </button>
          ) : (
            <div className="nft-card px-8 py-4 text-white font-medium">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <span>Loading Stories...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 