'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';

export default function CreatePage() {
  const [storyText, setStoryText] = useState('');
  const [maxRipples, setMaxRipples] = useState(30);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Fantasy', 'Sci-Fi', 'Mystery', 'Horror', 'Romance', 'Adventure'];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen">
      <Header title="Create" showWallet walletBalance="0" />
      
      <div className="px-6">
        {/* Daily Reward Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 mb-6 text-center">
          <div className="text-white font-semibold">Create Story Seed</div>
          <div className="text-yellow-300 text-sm">🎯 8.00% Daily ripple rewards</div>
        </div>

        {/* Story Input */}
        <div className="card-gradient rounded-2xl p-6 mb-6">
          <textarea
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            placeholder="Write your story seed..."
            className="w-full h-32 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none"
            maxLength={250}
          />
          <div className="text-right text-gray-400 text-sm mt-2">
            {storyText.length}/250
          </div>
        </div>

        {/* Upload Thumbnail */}
        <div className="card-gradient rounded-2xl p-6 mb-6">
          <div className="text-white font-semibold mb-4">Upload Thumbnail*</div>
          <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-purple-600/30 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-purple-400 text-2xl">📸</span>
            </div>
            <div className="text-gray-400 text-sm">Tap to upload image</div>
          </div>
        </div>

        {/* Story Categories */}
        <div className="card-gradient rounded-2xl p-6 mb-6">
          <div className="text-white font-semibold mb-4">Story Categories*</div>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  selectedCategories.includes(category)
                    ? 'bg-purple-600/30 border-purple-500 text-white'
                    : 'bg-slate-700/50 border-slate-600 text-gray-400'
                }`}
              >
                <span>{category}</span>
                <span className="text-lg">+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Set Max Ripples */}
        <div className="card-gradient rounded-2xl p-6 mb-8">
          <div className="text-white font-semibold mb-4">Set Max Ripples*</div>
          <div className="space-y-4">
            <input
              type="range"
              min="10"
              max="100"
              value={maxRipples}
              onChange={(e) => setMaxRipples(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center text-white text-xl font-bold">{maxRipples}</div>
          </div>
        </div>

        {/* Create Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition-colors mb-6">
          Start Story Seed
        </button>
      </div>
    </div>
  );
} 