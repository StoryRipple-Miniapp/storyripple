import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbsUp, faWater } from '@fortawesome/free-solid-svg-icons';

interface RippleCardProps {
  text: string;
  author: string;
  originalAuthor: string;
  votes: number;
  avatar: string;
}

export function RippleCard({ text, author, originalAuthor, votes, avatar }: RippleCardProps) {
  return (
    <div className="card-gradient rounded-2xl p-4 mb-3">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} size="sm" className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-white">{author}</span>
            <span className="text-gray-400 text-sm">rippled</span>
            <span className="text-purple-400 text-sm">{originalAuthor}</span>
          </div>
          <p className="text-gray-200 text-sm mb-3 leading-relaxed">{text}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-400">
                <FontAwesomeIcon icon={faThumbsUp} />
                <span className="text-sm">{votes}</span>
              </button>
              <button className="text-gray-400 hover:text-blue-400">
                <FontAwesomeIcon icon={faWater} />
              </button>
            </div>
            <button className="text-purple-400 text-sm hover:text-purple-300">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 