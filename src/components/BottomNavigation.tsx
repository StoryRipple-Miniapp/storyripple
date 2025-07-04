'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faBookOpenReader, faRankingStar, faUser, faSquarePlus, faWallet } from '@fortawesome/free-solid-svg-icons';

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [hasNewAchievements, setHasNewAchievements] = useState(false);

  // Mock user stats - in real app this would come from context/API
  const userStats = {
    storiesCreated: 0,
    ripplesCreated: 0,
    upvotesReceived: 0,
    totalEarnings: 0.00,
    weeklyStreak: 0,
    referrals: 0,
    rank: 999, // Set to high number so rank-based achievements stay locked
    totalUsers: 1250
  };

  // Check for new achievements
  useEffect(() => {
    const achievements = [
      { id: 1, unlocked: userStats.storiesCreated >= 1 },
      { id: 2, unlocked: userStats.ripplesCreated >= 1 },
      { id: 3, unlocked: userStats.upvotesReceived >= 25 },
      { id: 4, unlocked: userStats.storiesCreated >= 5 },
      { id: 5, unlocked: userStats.totalEarnings >= 5.0 },
      { id: 6, unlocked: userStats.weeklyStreak >= 7 },
      { id: 7, unlocked: userStats.rank <= 50 },
      { id: 8, unlocked: userStats.ripplesCreated >= 25 },
      { id: 9, unlocked: userStats.rank <= 10 },
      { id: 10, unlocked: userStats.storiesCreated >= 10 },
      { id: 11, unlocked: userStats.totalEarnings >= 100 },
      { id: 12, unlocked: userStats.referrals >= 3 },
    ];

    const newlyUnlocked = achievements.filter(achievement => 
      achievement.unlocked && !localStorage.getItem(`achievement_${achievement.id}_seen`)
    );
    
    setHasNewAchievements(newlyUnlocked.length > 0);
  }, []);

  const navItems = [
    { icon: faHouseChimney, path: '/feeds', label: 'Home' },
    { icon: faWallet, path: '/wallet', label: 'Wallet' },
    { icon: faUser, path: '/profile', label: 'Profile', hasNotification: hasNewAchievements },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-[9999] pointer-events-none pb-safe">
      <div className="nav-modern mx-4 mb-4 flex items-center justify-around py-4 px-2 pointer-events-auto">
        {navItems.map(({ icon, path, label, isCenter, hasNotification }, index) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`relative flex flex-col items-center justify-center transition-all duration-300 focus:outline-none no-tap-highlight group ${
                isCenter 
                  ? 'featured-card w-14 h-14' 
                  : `w-12 h-12 rounded-xl hover:scale-110 active:scale-95 ${
                      isActive 
                        ? 'bg-surface border border-custom' 
                        : 'hover:bg-surface-hover'
                    }`
              }`}
              style={{ 
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
              tabIndex={0}
              aria-label={label}
            >
              <FontAwesomeIcon 
                icon={icon} 
                size={isCenter ? 'lg' : 'lg'} 
                className="text-white" 
              />
              
              {/* Notification badge for new achievements */}
              {hasNotification && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-ping opacity-75" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
} 
