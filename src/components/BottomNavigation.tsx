'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faBookOpenReader, faRankingStar, faUser, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: faHouseChimney, path: '/feeds', label: 'Home' },
    { icon: faRankingStar, path: '/leaderboard', label: 'Rank' },
    { icon: faSquarePlus, path: '/create', label: 'Create', isCenter: true },
    { icon: faBookOpenReader, path: '/rules', label: 'Rules' },
    { icon: faUser, path: '/profile', label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none">
      <div className="nav-modern mx-4 mb-4 flex items-center justify-around py-4 px-2 pointer-events-auto safe-area-bottom">
        {navItems.map(({ icon, path, label, isCenter }, index) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex flex-col items-center justify-center transition-all duration-300 focus:outline-none no-tap-highlight group ${
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
            </button>
          );
        })}
      </div>
    </div>
  );
} 
