'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faBookOpenReader, faWebAwesome, faUser, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { 
      icon: (
        <FontAwesomeIcon icon={faHouseChimney} size="lg" style={{ color: '#FFFFFF' }} />
      ), 
      path: '/feeds' 
    },
    { 
      icon: (
        <FontAwesomeIcon icon={faWebAwesome} size="lg" style={{ color: '#FFFFFF' }} />
      ), 
      path: '/leaderboard' 
    },
    { 
      icon: (
        <FontAwesomeIcon icon={faSquarePlus} size="xl" style={{ color: '#FFFFFF' }} />
      ), 
      path: '/create',
      isCenter: true 
    },
    { 
      icon: (
        <FontAwesomeIcon icon={faBookOpenReader} size="lg" style={{ color: '#FFFFFF' }} />
      ), 
      path: '/rules' 
    },
    { 
      icon: (
        <FontAwesomeIcon icon={faUser} size="lg" style={{ color: '#FFFFFF' }} />
      ), 
      path: '/profile' 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] md:bottom-0 md:left-auto md:right-0 md:translate-x-0 md:w-[400px] md:rounded-l-3xl md:rounded-r-none md:top-0 md:h-screen md:flex md:items-end md:justify-end pointer-events-none">
      <div className="bg-gradient-to-b from-[#453c5c] to-[#2a1d3a] rounded-t-2xl rounded-b-none px-4 py-2 shadow-2xl w-full max-w-xs mx-auto flex items-center justify-between md:mx-0 md:my-8 md:w-[80px] md:flex-col md:rounded-3xl md:py-8 md:px-2 pointer-events-auto">
        {navItems.map(({ icon, path, isCenter }, index) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                isCenter 
                  ? 'w-16 h-16 bg-[#6b46c1] rounded-xl' 
                  : 'w-14 h-14 hover:scale-110'
              }`}
              style={{ touchAction: 'manipulation' }}
              tabIndex={0}
              aria-label={path.replace('/', '') || 'home'}
            >
              {icon}
            </button>
          );
        })}
      </div>
    </div>
  );
} 
