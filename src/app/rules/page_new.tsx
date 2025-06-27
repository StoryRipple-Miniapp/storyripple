'use client';

import { Header } from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouseChimney, 
  faWallet, 
  faRankingStar, 
  faUser, 
  faSquarePlus,
  faChevronLeft,
  faChevronRight,
  faBookOpenReader
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function RulesPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      icon: faHouseChimney,
      title: "Feeds Page",
      color: "from-blue-400 to-blue-600",
      description: "Your home for discovering stories",
      features: [
        "Check trending stories from other creators",
        "See the latest ripples (story additions)",
        "Vote on stories you like with the heart button",
        "Tap on any story to read the full thread",
        "Switch between 'Trending Stories' and 'Latest Ripples' tabs"
      ]
    },
    {
      icon: faRankingStar,
      title: "Leaderboard Page",
      color: "from-purple-400 to-purple-600",
      description: "See who's winning in the community",
      features: [
        "Check the top creators and their earnings",
        "See how many stories each person created",
        "View ripples (story additions) counts",
        "Check votes earned by each creator",
        "Use filters to find different types of creators"
      ]
    },
    {
      icon: faSquarePlus,
      title: "Create Page",
      color: "from-green-400 to-green-600",
      description: "Start your own story",
      features: [
        "Write your original story (up to 500 characters)",
        "Choose a catchy title for your story",
        "Add tags to help others find your story",
        "Pay a small gas fee to publish",
        "Your story goes live for others to read and ripple"
      ]
    },
    {
      icon: faUser,
      title: "Profile Page",
      color: "from-orange-400 to-orange-600",
      description: "Your personal dashboard",
      features: [
        "Check your rankings - stories created, ripples, earnings, votes",
        "View your achievements and unlock new ones",
        "See your progress toward earning more RIPPLES",
        "Share your achievements on social media",
        "Track your position on the leaderboard"
      ]
    },
    {
      icon: faWallet,
      title: "Wallet Page",
      color: "from-yellow-400 to-yellow-600",
      description: "Manage your RIPPLES earnings",
      features: [
        "Check your current RIPPLE balance",
        "See your transaction history",
        "Withdraw your earnings to external wallet",
        "View pending transactions and gas fees",
        "Monitor your daily earning bonuses"
      ]
    },
    {
      icon: faBookOpenReader,
      title: "Ripple Pages",
      color: "from-pink-400 to-pink-600",
      description: "Join story conversations",
      features: [
        "Read full story threads with all ripples",
        "Add your own ripple to continue the story",
        "Vote on individual ripples you like",
        "See who created each part of the story",
        "Create branching storylines from any ripple"
      ]
    }
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const currentData = sections[currentSection];

  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
      {/* Galaxy Background */}
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
      
      <div className="px-4 py-6 space-y-6 relative z-10 max-w-sm mx-auto pt-28 pb-32">
        
        {/* Header Section */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-6 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 text-center">
            <div className="text-4xl mb-4">📱</div>
            <h1 className="text-2xl font-bold text-white mb-3 font-display">How to Use Story Ripple</h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Learn how each page works and what you can do there
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSection ? 'bg-[#c0b7d4]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Current Section */}
        <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl overflow-hidden relative group hover:border-[#7c3aed] transition-all duration-300 min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 p-6">
            {/* Section Header */}
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentData.color} flex items-center justify-center mr-4`}>
                <FontAwesomeIcon icon={currentData.icon} className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-display">{currentData.title}</h2>
                <p className="text-gray-400 text-sm">{currentData.description}</p>
              </div>
            </div>
            
            {/* Features List */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold font-display mb-3">What you can do here:</h3>
              <ul className="space-y-3">
                {currentData.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 text-sm flex items-start leading-relaxed">
                    <span className="text-[#c0b7d4] mr-3 mt-1 text-xs">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevSection}
            className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-full px-6 py-3 text-white font-display font-medium text-sm flex items-center space-x-2 hover:border-[#7c3aed] transition-all"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-xs">
              {currentSection + 1} of {sections.length}
            </p>
          </div>

          <button
            onClick={nextSection}
            className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-full px-6 py-3 text-white font-display font-medium text-sm flex items-center space-x-2 hover:border-[#7c3aed] transition-all"
          >
            <span>Next</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* Bottom Message */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-6 text-2xl">
            <span>🚀</span>
            <span>✨</span>
            <span>📖</span>
          </div>
          <p className="text-[#c0b7d4] font-medium font-display">
            Now you know how to use Story Ripple!
          </p>
          <p className="text-gray-400 text-sm">
            Start exploring and creating amazing stories!
          </p>
        </div>
      </div>
    </div>
  );
} 