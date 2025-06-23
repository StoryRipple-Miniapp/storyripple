import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbsUp, faWater, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

interface StoryCardProps {
  title: string;
  author: string;
  image: string;
  votes: number;
  ripples: number;
  liquidity: string;
}

export function StoryCard({ title, author, image, votes, ripples, liquidity }: StoryCardProps) {
  return (
    <div className="bg-black/30 backdrop-blur-md border border-[#5646a6] rounded-xl shadow-lg overflow-hidden group">
      <div className="relative h-32">
        <Image 
          src={`https://picsum.photos/seed/${title.replace(/\s/g, '-')}/400/200`}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <h3 className="absolute bottom-3 left-4 right-4 font-display font-semibold text-white text-lg line-clamp-2">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm mb-3">
        <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} size="xs" className="text-purple-300" />
            </div>
            <span className="text-gray-300 font-medium">{author}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon icon={faThumbsUp} className="text-gray-500" />
            <span>{votes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FontAwesomeIcon icon={faWater} className="text-gray-500" />
            <span>{ripples} Ripples</span>
          </div>
          <div className="flex items-center space-x-1 font-medium text-green-400">
            <FontAwesomeIcon icon={faDollarSign} />
            <span>{liquidity}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 