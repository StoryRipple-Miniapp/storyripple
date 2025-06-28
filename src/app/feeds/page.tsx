'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faComment,
  faShare,
  faEllipsisH,
  faBookmark,
  faVerified
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function FeedsPage() {
  const [likedPosts, setLikedPosts] = useState<{[key: number]: boolean}>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<{[key: number]: boolean}>({});

  // LinkedIn-style feed posts
  const feedPosts = [
    {
      id: 1,
      author: {
        name: 'Sarah Martinez',
        title: 'Creative Writer & Storyteller',
        avatar: 'https://picsum.photos/seed/sarah/60/60',
        verified: true
      },
      content: 'Just finished my latest interactive story about finding hope in unexpected places. The collaborative nature of storytelling on this platform continues to amaze me. Every ripple adds a new layer of depth! ✨',
      image: 'https://picsum.photos/seed/story1/500/300',
      timeAgo: '2h',
      likes: 42,
      comments: 8,
      shares: 3,
      type: 'story'
    },
    {
      id: 2,
      author: {
        name: 'Alex Chen',
        title: 'Blockchain Developer | Story Enthusiast',
        avatar: 'https://picsum.photos/seed/alex/60/60',
        verified: false
      },
      content: 'The intersection of technology and storytelling is fascinating. Building decentralized narratives where every contributor has ownership is the future of creative expression. What do you think?',
      timeAgo: '4h',
      likes: 28,
      comments: 12,
      shares: 5,
      type: 'text'
    },
    {
      id: 3,
      author: {
        name: 'Emma Rodriguez',
        title: 'Community Manager | Book Lover',
        avatar: 'https://picsum.photos/seed/emma/60/60',
        verified: true
      },
      content: 'Community spotlight: Our writers have created over 500 collaborative stories this month! 🎉 The creativity and engagement levels are through the roof. Keep the stories coming!',
      image: 'https://picsum.photos/seed/community/500/300',
      timeAgo: '6h',
      likes: 89,
      comments: 15,
      shares: 12,
      type: 'announcement'
    },
    {
      id: 4,
      author: {
        name: 'Marcus Thompson',
        title: 'Interactive Fiction Writer',
        avatar: 'https://picsum.photos/seed/marcus/60/60',
        verified: false
      },
      content: 'Working on a mystery series where readers can vote on plot directions. The collaborative element makes every story unique and unpredictable. Anyone interested in contributing?',
      timeAgo: '8h',
      likes: 35,
      comments: 6,
      shares: 2,
      type: 'collaboration'
    },
    {
      id: 5,
      author: {
        name: 'Luna Park',
        title: 'Digital Artist & Writer',
        avatar: 'https://picsum.photos/seed/luna/60/60',
        verified: true
      },
      content: 'Created visual accompaniments for three collaborative stories this week. The synergy between visual art and narrative is incredible. Here\'s a sneak peek of my latest work!',
      image: 'https://picsum.photos/seed/art/500/300',
      timeAgo: '12h',
      likes: 67,
      comments: 9,
      shares: 7,
      type: 'artwork'
    }
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="min-h-screen font-rounded" style={{ backgroundColor: '#1f1334' }}>
      <Header />
      
      <div className="px-4 py-6 relative z-10 max-w-lg mx-auto pt-28 pb-32">
        
        {/* Create Post Prompt */}
        <div className="bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">You</span>
            </div>
            <button className="flex-1 bg-black/50 border border-gray-600 rounded-full px-4 py-3 text-left text-gray-400 hover:border-purple-400 transition-all">
              What's your story today?
            </button>
          </div>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <article key={post.id} className="bg-black/30 backdrop-blur-md border border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-400 transition-all">
              
              {/* Post Header */}
              <div className="p-4 border-b border-gray-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-white">{post.author.name}</h3>
                        {post.author.verified && (
                          <FontAwesomeIcon icon={faVerified} className="text-blue-400 text-sm" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{post.author.title}</p>
                      <p className="text-xs text-gray-500">{post.timeAgo} ago</p>
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
                
                {post.image && (
                  <div className="rounded-lg overflow-hidden mb-4">
                    <Image
                      src={post.image}
                      alt="Post content"
                      width={500}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Engagement Stats */}
              <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <span>{post.likes + (likedPosts[post.id] ? 1 : 0)} likes</span>
                  <div className="flex space-x-4">
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      likedPosts[post.id] 
                        ? 'text-red-400 bg-red-400/10' 
                        : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="text-sm font-medium">Like</span>
                  </button>

                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                    <FontAwesomeIcon icon={faComment} />
                    <span className="text-sm font-medium">Comment</span>
                  </button>

                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-green-400 hover:bg-green-400/10 transition-all">
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
          <button className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-3 rounded-full font-medium hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105">
            Load More Stories
          </button>
        </div>
      </div>
    </div>
  );
} 