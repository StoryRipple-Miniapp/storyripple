'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouseChimney, faRankingStar, faSquarePlus, faUser, faBookOpenReader, faWallet } from '@fortawesome/free-solid-svg-icons';
import { WalletConnection } from './WalletConnection';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  
  const getPageName = (path: string | null) => {
    if (!path) return 'Story Ripple';
    switch (path) {
      case '/':
      case '/feeds':
        return 'Story Ripple';
      case '/create':
        return 'Create Story';
      case '/leaderboard':
        return 'Leaderboard';
      case '/rules':
        return 'Rules';
      case '/profile':
        return 'Profile';
      case '/trending':
        return 'Trending';
      case '/wallet':
        return 'Ripple Wallet';
      default:
        if (path.startsWith('/ripple/')) return 'Story Ripples';
        return 'Story Ripple';
    }
  };

  const menuItems = [
    { icon: faHouseChimney, path: '/feeds', label: 'Feeds' },
    { icon: faSquarePlus, path: '/create', label: 'Create' },
    { icon: faUser, path: '/profile', label: 'Profile' },
    { icon: faWallet, path: '/wallet', label: 'Wallet' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[100] header-modern">
      <div className="flex items-center justify-between px-6 py-4 max-w-sm mx-auto md:max-w-none md:mx-0">
        {/* Hamburger Menu with Motion */}
        <div className="flex-shrink-0 relative">
          <div className="flex flex-col items-center">
            <button
              aria-label="Menu"
              onClick={() => setShowMenu(!showMenu)}
              className="nft-card w-11 h-11 flex items-center justify-center group hover:scale-110 transition-transform duration-200"
              style={{
                animation: 'menuPulse 2s infinite ease-in-out'
              }}
            >
              <FontAwesomeIcon icon={faBars} size="lg" className="text-white" />
            </button>
            <span className="text-xs text-gray-400 mt-1 font-medium">menu</span>
          </div>
          
          {/* Menu Dropdown */}
          {showMenu && (
            <div className="absolute top-16 left-0 bg-black/90 backdrop-blur-md border border-[#5646a6] rounded-xl shadow-lg p-4 min-w-48 z-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-sm font-medium">Navigation</h3>
                <button
                  onClick={() => setShowMenu(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      router.push(item.path);
                      setShowMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-3 ${
                      pathname === item.path ? 'text-white bg-white/10' : 'text-gray-300'
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Page Name */}
        <div className="flex-1 text-center px-4">
          <h1 className="text-primary text-lg font-display font-semibold tracking-tight truncate">
            {getPageName(pathname)}
          </h1>
        </div>
        
        {/* Wallet Connection */}
        <div className="flex-shrink-0 relative">
          <WalletConnection />
        </div>
      </div>
    </div>
  );
} 