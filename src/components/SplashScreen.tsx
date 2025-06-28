'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSparkles } from '@fortawesome/free-solid-svg-icons';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo animation
    const logoTimer = setTimeout(() => setShowLogo(true), 200);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Call onComplete after a short delay to show 100%
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#0d0d12' }}>
      {/* Enhanced galaxy background for splash */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-violet-900/30 animate-pulse" />
        
        {/* Dynamic stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-violet-400 opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo animation */}
        <div className={`transition-all duration-1000 ${showLogo ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative">
            {/* Main logo circle */}
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <FontAwesomeIcon icon={faSparkles} className="text-5xl text-white animate-pulse" />
            </div>
            
            {/* Orbiting elements */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-2 right-8 w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-pink-400"></div>
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
              <div className="absolute top-1/2 left-2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"></div>
            </div>
          </div>
        </div>

        {/* App name */}
        <div className={`transition-all duration-1000 delay-500 ${showLogo ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-4xl font-bold text-white mb-2 font-display">
            Story<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">Ripple</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            Collaborative branching stories
          </p>
        </div>

        {/* Progress bar */}
        <div className={`transition-all duration-1000 delay-1000 ${showLogo ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="w-64 mx-auto space-y-3">
            <div className="text-sm text-gray-400 font-medium">
              Loading... {progress}%
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-violet-600 rounded-full transition-all duration-300 ease-out shadow-lg shadow-purple-500/50"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Loading indicators */}
        <div className={`transition-all duration-1000 delay-1500 ${showLogo ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 