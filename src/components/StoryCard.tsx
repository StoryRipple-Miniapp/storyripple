import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbsUp, faWater, faBookOpen } from '@fortawesome/free-solid-svg-icons';

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
    <div className="card-gradient rounded-2xl p-4 mb-4">
      <div className="relative h-40 mb-3 rounded-xl overflow-hidden bg-slate-700 flex items-center justify-center">
        <FontAwesomeIcon icon={faBookOpen} size="2x" className="text-white/80" />
      </div>
      <h3 className="font-semibold text-white mb-2 line-clamp-2">{title}</h3>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} size="sm" className="text-white" />
          </div>
          <span className="text-gray-300">{author}</span>
        </div>
        <div className="flex items-center space-x-4 text-gray-400">
          <span><FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> {votes}</span>
          <span><FontAwesomeIcon icon={faWater} className="mr-1" /> {ripples}</span>
          <span className="text-green-400">{liquidity}</span>
        </div>
      </div>
    </div>
  );
} 