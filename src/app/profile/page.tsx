'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'rankings' | 'achievements'>('achievements');

  const achievements = [
    { id: 1, name: 'First Story', unlocked: true, reward: 0.10, icon: '📚' },
    { id: 2, name: 'First Ripple', unlocked: true, reward: 0.10, icon: '🌊' },
    { id: 3, name: 'Vote Master', unlocked: false, reward: 0.10, icon: '👍' },
    { id: 4, name: 'Story King', unlocked: false, reward: 0.10, icon: '👑' },
    { id: 5, name: 'Ripple Expert', unlocked: true, reward: 0.10, icon: '⚡' },
    { id: 6, name: 'Community Hero', unlocked: false, reward: 0.10, icon: '🏆' },
    { id: 7, name: 'Trending Creator', unlocked: false, reward: 0.10, icon: '🔥' },
    { id: 8, name: 'Big Earner', unlocked: false, reward: 0.10, icon: '💰' },
  ];

  if (activeTab === 'rankings') {
    return (
      <div className="min-h-screen">
        <Header title="Profile" showWallet walletBalance="0" />
        
        <div className="px-6">
          {/* Tab Navigation */}
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab('rankings')}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              <span>📊</span>
              <span>Rankings</span>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-400 ml-4"
            >
              <span>🏆</span>
              <span>Achievements</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="card-gradient rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold text-white mb-2">0</div>
              <div className="text-sm text-gray-300">My Story Seeds</div>
            </div>
            <div className="card-gradient rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold text-white mb-2">0</div>
              <div className="text-sm text-gray-300">My Story Ripples</div>
            </div>
            <div className="card-gradient rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold text-white mb-2">0</div>
              <div className="text-sm text-gray-300">My Earnings</div>
            </div>
            <div className="card-gradient rounded-2xl p-6 text-center">
              <div className="text-2xl font-bold text-white mb-2">0</div>
              <div className="text-sm text-gray-300">My Votes</div>
            </div>
          </div>

          {/* Share Button */}
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition-colors">
            SHARE YOUR STATUS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header title="Profile" showWallet walletBalance="0" />
      
      <div className="px-6">
        {/* Tab Navigation */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab('rankings')}
            className="flex items-center space-x-2 px-4 py-2 text-gray-400"
          >
            <span>📊</span>
            <span>Rankings</span>
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg ml-4"
          >
            <span>🏆</span>
            <span>Achievements</span>
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative rounded-2xl p-6 text-center ${
                achievement.unlocked ? 'achievement-unlocked' : 'achievement-locked'
              }`}
            >
              {achievement.unlocked && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
              )}
              <div className="text-3xl mb-3">{achievement.icon}</div>
              <div className="text-sm text-white font-medium">{achievement.name}</div>
              {achievement.unlocked && (
                <div className="text-xs text-green-400 mt-1">+{achievement.reward} RIPPLES</div>
              )}
            </div>
          ))}
        </div>

        {/* Claim Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition-colors">
          CLAIM YOUR REWARDS
        </button>
      </div>
    </div>
  );
} 