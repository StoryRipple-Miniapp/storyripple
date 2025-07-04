'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { GalaxyBackground } from './GalaxyBackground';

interface SplashScreenProps {
  onComplete: () => void;
  isLoading?: boolean;
}

export function SplashScreen({ onComplete, isLoading }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      let frame: number;
      const animate = () => {
        setProgress((prev) => {
          if (prev < 100) return prev + 2;
          return 100;
        });
        frame = requestAnimationFrame(animate);
      };
      animate();
      return () => cancelAnimationFrame(frame);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading && progress >= 100) {
      // Wait for parent to hide splash when feeds is ready
    }
  }, [isLoading, progress]);

  // Replace the icon with a moving butterfly SVG
  const ButterflyIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
      <ellipse cx="32" cy="32" rx="12" ry="24" fill="#a78bfa" opacity="0.7"/>
      <ellipse cx="32" cy="32" rx="24" ry="12" fill="#f472b6" opacity="0.7"/>
      <circle cx="32" cy="32" r="6" fill="#fff" />
      <ellipse cx="22" cy="22" rx="6" ry="12" fill="#a78bfa" opacity="0.5"/>
      <ellipse cx="42" cy="42" rx="6" ry="12" fill="#f472b6" opacity="0.5"/>
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#1f1334' }}>
      <GalaxyBackground />
      <div className="relative z-10 text-center">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 flex items-center justify-center mb-2">
            <FontAwesomeIcon icon={faBook} size="2x" className="text-purple-400" />
          </div>
          <span className="text-lg text-white font-semibold mb-4">Story Ripple</span>
        </div>
        <div className="pt-2">
          {!isLoading ? (
            <button
              onClick={onComplete}
              className="nft-card px-8 py-4 text-white font-medium hover:scale-105 transition-all duration-300"
            >
              Enter the Story Universe
            </button>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-white font-medium mb-2">Loading {progress}%</span>
              <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 