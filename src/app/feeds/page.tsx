'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp,
  faComment,
  faShare,
  faEllipsisH,
  faBookmark,
  faChevronDown,
  faCheckCircle,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FeedsPage() {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<{[key: number]: boolean}>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<{[key: number]: boolean}>({});
  const [expandedRipples, setExpandedRipples] = useState<{[key: number]: boolean}>({});
  const [showInsufficientFunds, setShowInsufficientFunds] = useState<{[key: number]: boolean}>({});
  
  // Mock wallet balance - in real app this would come from wallet context
  const walletBalance = 0; // Empty wallet for demo

  // Generate avatar function
  const generateAvatar = (name: string, color: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return {
      initials,
      color,
      bgColor: `bg-${color}-500`
    };
  };

  // Diverse LinkedIn-style feed posts with different genres
  const feedPosts = [
    {
      id: 1,
      author: {
        name: 'Katniss Everdeen',
        title: 'District 12 Tribute | Mockingjay',
        avatar: generateAvatar('Katniss Everdeen', 'green'),
        verified: true
      },
      content: 'The arena changes everything you think you know about survival. I\'ve been working on an interactive story where YOU choose the tribute\'s path. Do they ally with the Careers? Hide in the forest? Or attempt to destroy the arena itself? Each choice leads to different districts being inspired to rebel. The Capitol won\'t like this one... 🏹',
      timeAgo: '1h',
      likes: 234,
      ripples: 89,
      poolValue: 156.80,
      type: 'dystopian',
      genre: 'Hunger Games'
    },
    {
      id: 2,
      author: {
        name: 'Senator Williams',
        title: 'Political Strategist | Campaign Manager',
        avatar: generateAvatar('Senator Williams', 'blue'),
        verified: true
      },
      content: 'Behind every election, there are a thousand untold stories of compromise and corruption. I\'m crafting an interactive political thriller where readers navigate the moral complexities of power. Do you expose the truth and lose everything, or play the game to change it from within? Democracy hangs in the balance with every choice. 🗳️',
      timeAgo: '3h',
      likes: 178,
      ripples: 67,
      poolValue: 203.50,
      type: 'political',
      genre: 'Politics'
    },
    {
      id: 3,
      author: {
        name: 'Comedy Central Mike',
        title: 'Stand-up Comedian | Comedy Writer',
        avatar: generateAvatar('Comedy Central Mike', 'yellow'),
        verified: false
      },
      content: 'They say comedy is tragedy plus time... but what if readers could choose the punchline? I\'m building a choose-your-own-adventure comedy where every decision leads to either a standing ovation or getting booed off stage. The best part? Real comedians are contributing alternate endings based on their worst bombing experiences! 😂',
      timeAgo: '5h',
      likes: 298,
      ripples: 124,
      poolValue: 89.25,
      type: 'comedy',
      genre: 'Humor'
    },
    {
      id: 4,
      author: {
        name: 'Isabella Rose',
        title: 'Romance Novelist | Hopeless Romantic',
        avatar: generateAvatar('Isabella Rose', 'pink'),
        verified: true
      },
      content: 'Love isn\'t just about the destination—it\'s about the choices that lead you there. My latest interactive romance lets readers shape not just the relationship, but the very definition of love itself. Will they choose passion over stability? Adventure over security? Each path reveals a different truth about the human heart. Some endings will make you cry happy tears. 💕',
      timeAgo: '7h',
      likes: 445,
      ripples: 203,
      poolValue: 278.75,
      type: 'romance',
      genre: 'Romance'
    },
    {
      id: 5,
      author: {
        name: 'Dr. Sarah Chen',
        title: 'AI Researcher | Sci-Fi Author',
        avatar: generateAvatar('Dr. Sarah Chen', 'purple'),
        verified: true
      },
      content: 'What happens when AI becomes indistinguishable from human consciousness? My interactive sci-fi story poses this question through the eyes of an android who doesn\'t know they\'re artificial. Readers must choose whether to reveal the truth or let them live in blissful ignorance. The philosophical implications are staggering—and the emotional impact is devastating. 🤖',
      timeAgo: '9h',
      likes: 321,
      ripples: 156,
      poolValue: 345.30,
      type: 'scifi',
      genre: 'Science Fiction'
    },
    {
      id: 6,
      author: {
        name: 'Detective Morgan',
        title: 'Retired Homicide Detective | Crime Writer',
        avatar: generateAvatar('Detective Morgan', 'indigo'),
        verified: false
      },
      content: 'Twenty years on the force taught me that every case has multiple truths depending on your perspective. I\'m creating an interactive murder mystery where readers can investigate as the detective, the suspect, or even the victim\'s ghost. Each viewpoint reveals different clues and leads to different conclusions. Justice isn\'t always black and white. 🔍',
      timeAgo: '11h',
      likes: 267,
      ripples: 98,
      poolValue: 145.60,
      type: 'mystery',
      genre: 'Mystery'
    }
  ];

  const handleUpvote = (postId: number) => {
    if (walletBalance < 0.25) {
      setShowInsufficientFunds(prev => ({ ...prev, [postId]: true }));
      setTimeout(() => {
        setShowInsufficientFunds(prev => ({ ...prev, [postId]: false }));
      }, 3000);
      return;
    }
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleRippleClick = (postId: number) => {
    router.push(`/ripple/${postId}`);
  };

  const toggleRipples = (postId: number) => {
    setExpandedRipples(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCreateStory = () => {
    router.push('/create');
  };

  // Mock ripples data for expanded view
  const mockRipples = [
    { id: 1, author: 'Alice', content: 'Great story! Love the interactive elements.', timeAgo: '2h' },
    { id: 2, author: 'Bob', content: 'This reminds me of my favorite book series.', timeAgo: '1h' },
    { id: 3, author: 'Carol', content: 'Can\'t wait to see where this goes next!', timeAgo: '30m' }
  ];

  return (
    <div className="min-h-screen font-rounded page-content" style={{ backgroundColor: '#1f1334' }}>
      <Header />
      
      <div className="px-4 py-6 relative z-10 max-w-lg mx-auto">
        
        {/* Create Button Section */}
        <div className="mb-6">
          <button
            onClick={handleCreateStory}
            className="w-full btn-primary flex items-center justify-center space-x-3 py-4 rounded-xl hover:scale-105 transition-all duration-200"
          >
            <FontAwesomeIcon icon={faPlus} className="text-lg" />
            <span className="text-lg font-semibold">Create Your Story</span>
          </button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <article key={post.id} className="bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-400 transition-all">
              
              {/* Post Header */}
              <div className="p-4 border-b border-gray-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Generated Avatar */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${post.author.avatar.color}-400 to-${post.author.avatar.color}-600 flex items-center justify-center text-white font-bold text-sm`}>
                      {post.author.avatar.initials}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{post.author.name}</h3>
                        {post.author.verified && (
                          <FontAwesomeIcon icon={faCheckCircle} className="text-blue-400 text-sm" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{post.author.title}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">{post.timeAgo} ago</p>
                        <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                          {post.genre}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors p-2">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-white leading-relaxed mb-4">{post.content}</p>
              </div>

              {/* Engagement Stats */}
              <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span>{post.likes + (likedPosts[post.id] ? 1 : 0)} upvotes</span>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => toggleRipples(post.id)}
                      className="hover:text-blue-400 transition-colors flex items-center space-x-1"
                    >
                      <span>{post.ripples} ripples</span>
                      <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${expandedRipples[post.id] ? 'rotate-180' : ''}`} />
                    </button>
                    <span className="text-green-400 font-medium">${post.poolValue}</span>
                  </div>
                </div>
              </div>

              {/* Expanded Ripples */}
              {expandedRipples[post.id] && (
                <div className="px-4 py-3 bg-black/20 border-b border-gray-700/50">
                  <div className="space-y-3">
                    {mockRipples.slice(0, 3).map((ripple) => (
                      <div key={ripple.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {ripple.author[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-white">{ripple.author}</span>
                            <span className="text-xs text-gray-500">{ripple.timeAgo}</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{ripple.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="p-4">
                <div className="flex items-center justify-between relative">
                  <div className="relative">
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        likedPosts[post.id] 
                          ? 'text-green-400 bg-green-400/10' 
                          : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                      }`}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                      <span className="text-sm font-medium">Upvote</span>
                    </button>
                    
                    {/* Insufficient Funds Tooltip */}
                    {showInsufficientFunds[post.id] && (
                      <div className="absolute bottom-full left-0 mb-2 bg-red-600 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                        Insufficient funds to vote - $0.25 required
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => handleRippleClick(post.id)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                  >
                    <FontAwesomeIcon icon={faComment} />
                    <span className="text-sm font-medium">Ripple</span>
                  </button>

                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all">
                    <FontAwesomeIcon icon={faShare} />
                    <span className="text-sm font-medium">Share</span>
                  </button>

                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`p-2 rounded-lg transition-all ${
                      bookmarkedPosts[post.id] 
                        ? 'text-yellow-400 bg-yellow-400/10' 
                        : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="nft-card px-8 py-3 text-white font-medium hover:scale-105 transition-all duration-300">
            Load More Stories
          </button>
        </div>
      </div>
    </div>
  );
} 