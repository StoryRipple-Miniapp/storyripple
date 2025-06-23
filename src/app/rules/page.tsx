'use client';

import { Header } from '@/components/Header';

export default function RulesPage() {
  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
      {/* Improved galaxy/starfield background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large twinkling stars */}
        {[...Array(15)].map((_, i) => (
          <span
            key={`large-${i}`}
            className="absolute block bg-white rounded-full"
            style={{
              width: '2px',
              height: '2px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Medium floating stars */}
        {[...Array(25)].map((_, i) => (
          <span
            key={`medium-${i}`}
            className="absolute block bg-white rounded-full"
            style={{
              width: '1.5px',
              height: '1.5px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `galaxyFloat ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
        
        {/* Small pulsing stars */}
        {[...Array(40)].map((_, i) => (
          <span
            key={`small-${i}`}
            className="absolute block bg-white rounded-full"
            style={{
              width: '1px',
              height: '1px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `starPulse ${Math.random() * 5 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
        
        {/* Tiny distant stars */}
        {[...Array(60)].map((_, i) => (
          <span
            key={`tiny-${i}`}
            className="absolute block bg-white rounded-full opacity-30"
            style={{
              width: '0.5px',
              height: '0.5px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <Header />
      
      <div className="px-4 py-6 space-y-5 relative z-10 max-w-sm mx-auto overflow-y-auto scrollbar-hide pt-28">
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-lg p-6 relative group shadow-lg mb-6">
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(86,70,166,0.3)] opacity-60"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="mr-3">⚡</span>
              How the Minigap Works
            </h2>
            
            <div className="space-y-6 text-gray-200">
              <section>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">💰 Rewards & Liquidity</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Earn from story participation and upvotes</li>
                  <li>• Liquidity pools from creator and participant fees</li>
                  <li>• Achievement rewards: 0.10 Ripples each</li>
                  <li>• Rankings based on stories, ripples, and earnings</li>
                  <li>• 8.00% daily ripple rewards for active creators</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">🏆 Community Features</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Trending stories based on community votes</li>
                  <li>• Featured creators with highest rankings</li>
                  <li>• Leaderboards for creators and ripplers</li>
                  <li>• Share achievements on Farcaster</li>
                  <li>• Automatic wallet creation for new users</li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Start creating and rippling to earn rewards! 🚀</p>
        </div>
      </div>
    </div>
  );
} 