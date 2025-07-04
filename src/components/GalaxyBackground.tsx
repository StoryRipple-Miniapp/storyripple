'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
}

export function GalaxyBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      
      // Generate many more stars for better visual effect
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.1,
          delay: Math.random() * 5,
        });
      }
      
      setStars(newStars);
    };

    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      
      // Generate more shooting stars for dynamic effect
      for (let i = 0; i < 5; i++) {
        const startX = Math.random() * 100;
        const startY = Math.random() * 50;
        newShootingStars.push({
          id: i,
          startX,
          startY,
          endX: startX + 20 + Math.random() * 30,
          endY: startY + 20 + Math.random() * 30,
          delay: Math.random() * 10 + 2,
        });
      }
      
      setShootingStars(newShootingStars);
    };

    generateStars();
    generateShootingStars();
  }, []);

  return (
    <div className="galaxy-container-2d">
      {/* Regular twinkling stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-2d"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      
      {/* Shooting stars */}
      {shootingStars.map((shootingStar) => (
        <div
          key={`shooting-${shootingStar.id}`}
          className="shooting-star"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
            '--end-x': `${shootingStar.endX - shootingStar.startX}%`,
            '--end-y': `${shootingStar.endY - shootingStar.startY}%`,
            animationDelay: `${shootingStar.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Subtle background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/3 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/2 to-transparent pointer-events-none" />
    </div>
  );
} 