'use client';

import { Header } from '@/components/Header';

export default function RulesPage() {
  return (
    <div className="min-h-screen">
      <Header title="Ripple Rules" showWallet walletBalance="0" />
      
      <div className="px-6">
        <div className="card-gradient rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-3">⚡</span>
            How the Minigap Works
          </h2>
          
          <div className="space-y-6 text-gray-200">
            <section>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">📚 Story Creation</h3>
              <ul className="space-y-2 text-sm">
                <li>• Create original story seeds (max 250 characters)</li>
                <li>• Upload thumbnail images for your stories</li>
                <li>• Set maximum ripple limits (10-100)</li>
                <li>• Choose story categories for better discovery</li>
                <li>• Cost: 1.00 Ripple per story creation</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">🌊 Ripple System</h3>
              <ul className="space-y-2 text-sm">
                <li>• Ripples continue existing stories (max 100 characters)</li>
                <li>• Cost: 0.50 Ripples to create a ripple</li>
                <li>• Upvoting costs 0.25 Ripples</li>
                <li>• Stories close when ripple limit is reached</li>
                <li>• All ripples show original creator attribution</li>
              </ul>
            </section>

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

        <div className="text-center text-gray-400 text-sm">
          <p>Start creating and rippling to earn rewards! 🚀</p>
        </div>
      </div>
    </div>
  );
} 