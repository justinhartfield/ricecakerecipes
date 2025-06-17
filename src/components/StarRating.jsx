import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const StarRating = ({ 
  rating = 0, 
  maxRating = 5, 
  size = 20, 
  interactive = false, 
  onRatingChange = null,
  showValue = true,
  className = ""
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarClick = (starValue) => {
    if (interactive) {
      setCurrentRating(starValue);
      if (onRatingChange) {
        onRatingChange(starValue);
      }
    }
  };

  const handleStarHover = (starValue) => {
    if (interactive) {
      setHoverRating(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const displayRating = interactive ? (hoverRating || currentRating) : rating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center" onMouseLeave={handleMouseLeave}>
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;
          const isPartial = starValue - 0.5 <= displayRating && starValue > displayRating;

          return (
            <motion.button
              key={index}
              type="button"
              className={`relative ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              disabled={!interactive}
              whileHover={interactive ? { scale: 1.1 } : {}}
              whileTap={interactive ? { scale: 0.95 } : {}}
            >
              <Star
                size={size}
                className={`${
                  isFilled 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : isPartial 
                    ? 'fill-yellow-400/50 text-yellow-400' 
                    : 'fill-gray-200 text-gray-200'
                } transition-colors`}
              />
            </motion.button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground ml-2">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;

