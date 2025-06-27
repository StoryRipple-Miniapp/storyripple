'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { WalletConnection } from './WalletConnection';
import { IS_DEMO_MODE } from '@/lib/wagmi';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
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
        return 'Story Ripple';
    }
  };

  return (
    <div className={`fixed left-0 w-full z-50 header-modern safe-area-top ${IS_DEMO_MODE ? 'top-10' : 'top-0'}`}>
      <div className="flex items-center justify-between px-6 py-4 max-w-sm mx-auto md:max-w-none md:mx-0">
        {/* Rules icon */}
        <div className="flex-shrink-0">
          <button
            aria-label="Rules"
            onClick={() => router.push('/rules')}
            className="nft-card w-11 h-11 flex items-center justify-center group"
          >
            <FontAwesomeIcon icon={faBookOpenReader} size="lg" className="text-white" />
          </button>
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