'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface RippleCardProps {
  text: string;
  author: string;
  originalAuthor: string;
  votes: number;
  avatar: string;
  rippleId?: number;
}

export function RippleCard({ text, author, originalAuthor, votes, avatar, rippleId = 1 }: RippleCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/ripple?id=${rippleId}`);
  };

  const handleContinueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/ripple?id=${rippleId}`);
  };

  return (
    <div 
      className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl p-4 shadow-lg group cursor-pointer hover:border-[#7c3aed] transition-all duration-300"
      onClick={handleCardClick}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#5646a6]/10 via-[#7c3aed]/20 to-[#5646a6]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start space-x-3">
          <Image 
            src={avatar}
            alt={author}
            width={36}
            height={36}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-1.5 mb-2 text-sm">
              <span className="font-medium text-white">{author}</span>
              <span className="text-gray-400">rippled on</span>
              <span className="font-medium text-purple-400">{originalAuthor}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{text}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <FontAwesomeIcon icon={faThumbsUp} className="text-gray-500" />
            <span>{votes} Upvotes</span>
          </div>
          <button 
            onClick={handleContinueClick}
            className="flex items-center space-x-1.5 text-xs text-purple-400 font-display font-medium group-hover:text-white transition-colors"
          >
            <span>Continue Story</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
} 