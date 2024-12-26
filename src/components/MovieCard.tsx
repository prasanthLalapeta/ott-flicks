import { motion } from 'framer-motion';
import { Star, Film, Tv, Users } from 'lucide-react';

interface MovieCardProps {
  title: string;
  type: string;
  platform: string;
  language: string;
  rating?: string;
  votes?: string;
  year?: string;
  poster?: string;
}

export const MovieCard = ({
  title,
  type,
  platform,
  language,
  rating,
  votes,
  year,
  poster,
}: MovieCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="movie-card hover:scale-[1.02] transition-transform"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            src={poster || '/placeholder.svg'}
            alt={`${title} poster`}
            className="w-24 h-36 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {type.toLowerCase() === 'movie' ? (
                <Film className="w-4 h-4 text-red-500" />
              ) : (
                <Tv className="w-4 h-4 text-red-500" />
              )}
              <span className="text-xs font-medium text-red-500 uppercase">
                {type}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-3">
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
              )}
              {votes && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {parseInt(votes).toLocaleString()}
                  </span>
                </div>
              )}
              {year && (
                <span className="text-sm text-gray-500">
                  ({year})
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                {platform}
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium">
                {language}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;