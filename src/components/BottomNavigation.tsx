'use client';

import { usePathname, useRouter } from 'next/navigation';

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: '🏠', path: '/feeds', label: 'Home' },
    { icon: '👑', path: '/leaderboard', label: 'Leaders' },
    { icon: '➕', path: '/create', label: 'Create' },
    { icon: '📈', path: '/trending', label: 'Trending' },
    { icon: '👤', path: '/profile', label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-lg border-t border-purple-500/20">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ icon, path, label }) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-purple-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-xs mt-1">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 