'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
  type: 'normal' | 'constellation' | 'meteor';
  delay: number;
}

export function GalaxyBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      
      // Generate normal stars
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small',
          type: 'normal',
          delay: Math.random() * 5,
        });
      }

      // Generate constellation stars
      for (let i = 150; i < 165; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 'medium',
          type: 'constellation',
          delay: Math.random() * 15,
        });
      }

      // Generate meteors
      for (let i = 165; i < 170; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 'small',
          type: 'meteor',
          delay: Math.random() * 30 + 10, // Meteors appear less frequently
        });
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="galaxy-container">
      {stars.map((star) => {
        const className = `star-3d ${star.size === 'large' ? 'star-large' : star.size === 'medium' ? 'star-medium' : 'star-small'} ${
          star.type === 'constellation' ? 'constellation-star' : ''
        } ${star.type === 'meteor' ? 'meteor' : ''}`;

        return (
          <div
            key={star.id}
            className={className}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        );
      })}
      
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/3 to-transparent pointer-events-none" />
    </div>
  );
} 