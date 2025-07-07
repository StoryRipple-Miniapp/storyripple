'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTrophy, 
  faStar, 
  faUsers, 
  faShareNodes, 
  faFire, 
  faCheckCircle, 
  faWandMagicSparkles, 
  faChartLine, 
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Achievement {
  id: number;
  name: string;
  description: string;
  unlocked: boolean;
  reward: number;
  icon: any;
  color: string;
  requirement: string;
  progress: number;
  maxProgress: number;
}

interface UserStats {
  storiesCreated: number;
  ripplesCreated: number;
  upvotesReceived: number;
  totalEarnings: number;
  weeklyStreak: number;
  referrals: number;
  rank: number;
  totalUsers: number;
}

interface RankingUser {
  id: number;
  username: string;
  avatar: string;
  rank: number;
  stories: number;
  ripples: number;
  earnings: number;
  isCurrentUser?: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProfilePage() {
  // State Management
  const [activeTab, setActiveTab] = useState<'rankings' | 'achievements'>('rankings');
  const [userStats, setUserStats] = useState({
    storiesCreated: 0,
    ripplesCreated: 0,
    upvotesReceived: 0,
    totalEarnings: 0.00,
    weeklyStreak: 0,
    referrals: 0,
    rank: 999, // Set to high number so rank-based achievements stay locked
    totalUsers: 1250
  });
  const [hasNewAchievements, setHasNewAchievements] = useState(false);
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);

  // ============================================================================
  // ACHIEVEMENT SYSTEM LOGIC
  // ============================================================================

  const achievements: Achievement[] = [
    {
      id: 1,
      name: 'First Story',
      description: 'Create your first story',
      unlocked: userStats.storiesCreated >= 1,
      reward: 0.25,
      icon: faStar,
      color: 'from-green-400 to-green-600',
      requirement: 'Create 1 story',
      progress: Math.min(userStats.storiesCreated, 1),
      maxProgress: 1
    },
    {
      id: 2,
      name: 'First Ripple',
      description: 'Create your first ripple',
      unlocked: userStats.ripplesCreated >= 1,
      reward: 0.25,
      icon: faUsers,
      color: 'from-blue-400 to-blue-600',
      requirement: 'Create 1 ripple',
      progress: Math.min(userStats.ripplesCreated, 1),
      maxProgress: 1
    },
    {
      id: 3,
      name: 'Popular Creator',
      description: 'Receive 25 upvotes',
      unlocked: userStats.upvotesReceived >= 25,
      reward: 0.50,
      icon: faCheckCircle,
      color: 'from-purple-400 to-purple-600',
      requirement: 'Get 25 upvotes',
      progress: Math.min(userStats.upvotesReceived, 25),
      maxProgress: 25
    },
    {
      id: 4,
      name: 'Content Creator',
      description: 'Create 5 stories',
      unlocked: userStats.storiesCreated >= 5,
      reward: 1.00,
      icon: faWandMagicSparkles,
      color: 'from-pink-400 to-pink-600',
      requirement: 'Create 5 stories',
      progress: Math.min(userStats.storiesCreated, 5),
      maxProgress: 5
    },
    {
      id: 5,
      name: 'Early Adopter',
      description: 'Earn 5.00 RIPPLES',
      unlocked: userStats.totalEarnings >= 5.0,
      reward: 2.00,
      icon: faChartLine,
      color: 'from-yellow-400 to-yellow-600',
      requirement: 'Earn 5.00 RIPPLES',
      progress: userStats.totalEarnings,
      maxProgress: 5.0
    },
    {
      id: 6,
      name: 'Weekly Warrior',
      description: 'Maintain 7-day streak',
      unlocked: userStats.weeklyStreak >= 7,
      reward: 1.50,
      icon: faFire,
      color: 'from-orange-400 to-orange-600',
      requirement: '7-day activity streak',
      progress: Math.min(userStats.weeklyStreak, 7),
      maxProgress: 7
    },
    {
      id: 7,
      name: 'Top Creator',
      description: 'Reach top 50 ranking',
      unlocked: userStats.rank <= 50,
      reward: 3.00,
      icon: faTrophy,
      color: 'from-red-400 to-red-600',
      requirement: 'Reach top 50 rank',
      progress: userStats.rank <= 50 ? 1 : 0,
      maxProgress: 1
    },
    {
      id: 8,
      name: 'Community Builder',
      description: 'Create 25 ripples',
      unlocked: userStats.ripplesCreated >= 25,
      reward: 2.50,
      icon: faUsers,
      color: 'from-indigo-400 to-indigo-600',
      requirement: 'Create 25 ripples',
      progress: Math.min(userStats.ripplesCreated, 25),
      maxProgress: 25
    },
    {
      id: 9,
      name: 'Leaderboard King',
      description: 'Reach top 10 ranking',
      unlocked: userStats.rank <= 10,
      reward: 5.00,
      icon: faStar,
      color: 'from-amber-400 to-amber-600',
      requirement: 'Reach top 10 rank',
      progress: userStats.rank <= 10 ? 1 : 0,
      maxProgress: 1
    },
    {
      id: 10,
      name: 'Space Explorer',
      description: 'Create 10 stories',
      unlocked: userStats.storiesCreated >= 10,
      reward: 1.00,
      icon: faWandMagicSparkles,
      color: 'from-cyan-400 to-cyan-600',
      requirement: 'Create 10 stories',
      progress: Math.min(userStats.storiesCreated, 10),
      maxProgress: 10
    },
    {
      id: 11,
      name: 'Ripple Millionaire',
      description: 'Earn 100 RIPPLES',
      unlocked: userStats.totalEarnings >= 100,
      reward: 10.00,
      icon: faChartLine,
      color: 'from-emerald-400 to-emerald-600',
      requirement: 'Earn 100 RIPPLES',
      progress: userStats.totalEarnings,
      maxProgress: 100
    },
    {
      id: 12,
      name: 'Refer a Friend',
      description: 'Refer 3 friends',
      unlocked: userStats.referrals >= 3,
      reward: 2.00,
      icon: faUserPlus,
      color: 'from-violet-400 to-violet-600',
      requirement: 'Refer 3 friends',
      progress: Math.min(userStats.referrals, 3),
      maxProgress: 3
    }
  ];

  // ============================================================================
  // RANKING DATA (Backend would provide this)
  // ============================================================================

  const topRankings: RankingUser[] = [
    {
      id: 1,
      username: '@alice.creator',
      avatar: 'https://picsum.photos/seed/alice/60/60',
      rank: 1,
      stories: 47,
      ripples: 234,
      earnings: 125.50
    },
    {
      id: 2,
      username: '@bob.writer',
      avatar: 'https://picsum.photos/seed/bob/60/60',
      rank: 2,
      stories: 38,
      ripples: 189,
      earnings: 98.25
    },
    {
      id: 3,
      username: '@charlie.story',
      avatar: 'https://picsum.photos/seed/charlie/60/60',
      rank: 3,
      stories: 35,
      ripples: 167,
      earnings: 87.75
    },
    {
      id: 4,
      username: '@diana.ripple',
      avatar: 'https://picsum.photos/seed/diana/60/60',
      rank: 4,
      stories: 29,
      ripples: 145,
      earnings: 76.50
    },
    {
      id: 5,
      username: '@you',
      avatar: 'https://picsum.photos/seed/you/60/60',
      rank: userStats.rank,
      stories: userStats.storiesCreated,
      ripples: userStats.ripplesCreated,
      earnings: userStats.totalEarnings,
      isCurrentUser: true
    }
  ];

  // ============================================================================
  // EFFECTS & LOGIC
  // ============================================================================

  // Check for new achievements when stats change
  useEffect(() => {
    const newlyUnlocked = achievements.filter(achievement => 
      achievement.unlocked && !localStorage.getItem(`achievement_${achievement.id}_seen`)
    );
    
    if (newlyUnlocked.length > 0) {
      setHasNewAchievements(true);
      // Mark achievements as seen after showing notification
      setTimeout(() => {
        newlyUnlocked.forEach(achievement => {
          localStorage.setItem(`achievement_${achievement.id}_seen`, 'true');
        });
        setHasNewAchievements(false);
      }, 5000);
    }
  }, [userStats]);

  useEffect(() => {
    const updateProfileStats = () => {
      // Load stories, ripples, and votes from localStorage
      const stories = JSON.parse(localStorage.getItem('userCreatedStories') || '[]');
      const ripples = Object.keys(localStorage)
        .filter(key => key.startsWith('userCreatedRipples_'))
        .reduce((acc, key) => acc + JSON.parse(localStorage.getItem(key) || '[]').length, 0);
      // For votes, you may need to track them in localStorage if not already
      // Example: const votes = JSON.parse(localStorage.getItem('userVotes') || '[]');
      setUserStats((prev: any) => ({
        ...prev,
        storiesCreated: stories.length,
        ripplesCreated: ripples,
        // upvotesReceived: votes.length, // Uncomment if you track votes
      }));
    };
    updateProfileStats();
    window.addEventListener('storage', updateProfileStats);
    return () => window.removeEventListener('storage', updateProfileStats);
  }, []);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleTabChange = (tab: 'rankings' | 'achievements') => {
    setActiveTab(tab);
  };

  const handleShareRankings = () => {
    // In real app, this would share to Farcaster
    const shareText = `I'm ranked #${userStats.rank} out of ${userStats.totalUsers} on Story Ripple! 🚀 Created ${userStats.storiesCreated} stories and ${userStats.ripplesCreated} ripples. Join me! #StoryRipple`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Story Ripple Rankings',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Rankings copied to clipboard!');
    }
  };

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderGalaxyBackground = () => (
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
  );

  const renderTabButtons = () => (
    <div className="flex justify-center mb-6">
      <div className="bg-black/20 backdrop-blur-md border border-[#3f3379] rounded-full p-1 flex items-center">
        <button
          onClick={() => handleTabChange('rankings')}
          className={`px-4 py-2 rounded-full font-display font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
            activeTab === 'rankings' ? 'bg-[#c0b7d4] text-black' : 'text-white hover:bg-white/10'
          }`}
        >
          <FontAwesomeIcon icon={faChartLine} />
          <span>Rankings</span>
        </button>
        
        <button
          onClick={() => handleTabChange('achievements')}
          className={`relative px-4 py-2 rounded-full font-display font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
            activeTab === 'achievements' ? 'bg-[#c0b7d4] text-black' : 'text-white hover:bg-white/10'
          }`}
        >
          <FontAwesomeIcon icon={faTrophy} />
          <span>Achievements</span>
          {/* New achievement notification badge */}
          {hasNewAchievements && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER SIMPLE RANKING STATS (Equal sized squares)
  // ============================================================================
  const renderRankingsContent = () => (
    <div className="space-y-6">
      {/* Stats Grid - Equal sized squares */}
      <div className="grid grid-cols-2 gap-4">
        {/* My Story Seeds */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 text-center aspect-square flex flex-col justify-center">
          <h3 className="text-white text-sm font-medium mb-4">My Story Seeds</h3>
          <div className="text-4xl font-bold text-gray-400">{userStats.storiesCreated}</div>
        </div>

        {/* My Story Ripples */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 text-center aspect-square flex flex-col justify-center">
          <h3 className="text-white text-sm font-medium mb-4">My Story Ripples</h3>
          <div className="text-4xl font-bold text-gray-400">{userStats.ripplesCreated}</div>
        </div>

        {/* My Earnings */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 text-center aspect-square flex flex-col justify-center">
          <h3 className="text-white text-sm font-medium mb-4">My Earnings</h3>
          <div className="text-4xl font-bold text-gray-400">{userStats.totalEarnings.toFixed(2)}</div>
        </div>

        {/* My Votes */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 text-center aspect-square flex flex-col justify-center">
          <h3 className="text-white text-sm font-medium mb-4">My Votes</h3>
          <div className="text-4xl font-bold text-gray-400">{userStats.upvotesReceived}</div>
        </div>
      </div>

      {/* Share Button */}
      <button 
        onClick={handleShareRankings}
        className="w-full bg-[#c0b7d4] hover:bg-[#d4cbe0] text-black px-6 py-3 rounded-full font-display font-medium text-sm transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
      >
        <FontAwesomeIcon icon={faShareNodes} />
        <span>SHARE YOUR STATS</span>
      </button>
    </div>
  );

  // ============================================================================
  // RENDER ACHIEVEMENT CARD (Clean design)
  // ============================================================================
  const renderAchievementCard = (achievement: Achievement) => {
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
    
    return (
      <div
        key={achievement.id}
        className={`relative group cursor-pointer transition-all duration-300 ${
          achievement.unlocked ? 'transform hover:scale-105' : 'opacity-50 hover:opacity-100'
        }`}
        onMouseEnter={() => setHoveredAchievement(achievement.id)}
        onMouseLeave={() => setHoveredAchievement(null)}
      >
        {/* Achievement card - Clean design */}
        <div className={`bg-black/30 backdrop-blur-md border rounded-xl p-4 text-center relative overflow-hidden transition-all duration-300 ${
          achievement.unlocked 
            ? 'border-[#7c3aed] shadow-[0_0_20px_rgba(124,58,237,0.3)]' 
            : 'border-gray-600 hover:border-purple-400'
        }`}>
          
          {/* Icon container - Clean design */}
          <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
            achievement.unlocked
              ? 'bg-[#7c3aed] shadow-lg'
              : 'bg-gray-700 group-hover:bg-purple-600'
          }`}>
            <FontAwesomeIcon 
              icon={achievement.icon} 
              className={`text-lg transition-all duration-300 ${
                achievement.unlocked 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-white'
              }`} 
            />
          </div>

          {/* Achievement name */}
          <h3 className={`font-medium text-sm mb-1 transition-colors duration-300 ${
            achievement.unlocked ? 'text-white' : 'text-gray-400 group-hover:text-white'
          }`}>
            {achievement.name}
          </h3>

          {/* Reward */}
          <p className={`text-xs transition-colors duration-300 ${
            achievement.unlocked ? 'text-purple-300' : 'text-gray-500 group-hover:text-purple-300'
          }`}>
            {achievement.reward.toFixed(2)} RIPPLES
          </p>

          {/* Progress bar for locked achievements */}
          {!achievement.unlocked && (
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-purple-500 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 group-hover:text-purple-400 transition-colors">
                {achievement.progress}/{achievement.maxProgress}
              </p>
            </div>
          )}

          {/* Unlocked indicator */}
          {achievement.unlocked && (
            <div className="absolute top-2 right-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 text-sm" />
            </div>
          )}
        </div>

        {/* Hover tooltip */}
        {hoveredAchievement === achievement.id && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 animate-fadeIn">
            <div className="bg-black/95 backdrop-blur-md border border-purple-400 rounded-lg p-3 min-w-48 text-center shadow-xl">
              <p className="text-white font-medium text-sm mb-1">{achievement.name}</p>
              <p className="text-gray-300 text-xs mb-2">{achievement.description}</p>
              <div className="border-t border-gray-600 pt-2">
                <p className="text-purple-400 text-xs font-medium mb-1">{achievement.requirement}</p>
                <p className="text-green-400 text-xs font-bold">
                  Earn {achievement.reward.toFixed(2)} RIPPLES
                </p>
                {!achievement.unlocked && (
                  <p className="text-yellow-400 text-xs mt-1">
                    Progress: {Math.round(progressPercentage)}%
                  </p>
                )}
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-purple-400" />
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen font-rounded page-content" style={{ backgroundColor: '#1f1334' }}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="px-4 py-6 space-y-6 relative z-10 max-w-sm mx-auto pt-24">
        
        {/* Tab Navigation */}
        {renderTabButtons()}

        {/* Content Area - No sliding animation */}
        {activeTab === 'rankings' && (
          renderRankingsContent()
        )}

        {activeTab === 'achievements' && (
          <div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {achievements.map(renderAchievementCard)}
            </div>

            {/* Achievement Summary */}
            <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 text-center">
              <h3 className="text-white font-display font-medium mb-2">Achievement Progress</h3>
              <p className="text-gray-300 text-sm">
                {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
              </p>
              <p className="text-purple-400 text-sm font-medium">
                Total Earned: {achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.reward, 0).toFixed(2)} RIPPLES
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
