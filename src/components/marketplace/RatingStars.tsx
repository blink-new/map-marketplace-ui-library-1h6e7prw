import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const ratingStarsVariants = cva(
  "flex items-center gap-1",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base", 
        lg: "text-lg"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

interface RatingStarsProps extends VariantProps<typeof ratingStarsVariants> {
  rating: number
  maxRating?: number
  showValue?: boolean
  showCount?: boolean
  reviewCount?: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function RatingStars({
  rating,
  maxRating = 5,
  showValue = false,
  showCount = false,
  reviewCount,
  interactive = false,
  onRatingChange,
  size,
  className
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(rating)

  const currentRating = interactive ? (hoverRating || selectedRating) : rating

  const handleStarClick = (starRating: number) => {
    if (interactive) {
      setSelectedRating(starRating)
      onRatingChange?.(starRating)
    }
  }

  const handleStarHover = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0)
    }
  }

  const starSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }[size || "md"]

  return (
    <div className={cn(ratingStarsVariants({ size }), className)}>
      {/* Stars */}
      <div 
        className="flex items-center gap-0.5"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= currentRating
          const isPartiallyFilled = starValue - 0.5 <= currentRating && starValue > currentRating

          return (
            <button
              key={index}
              type="button"
              className={cn(
                "relative transition-colors",
                interactive && "hover:scale-110 cursor-pointer",
                !interactive && "cursor-default"
              )}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              disabled={!interactive}
            >
              <Star
                className={cn(
                  starSize,
                  "transition-colors",
                  isFilled 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "fill-transparent text-gray-300"
                )}
              />
              {/* Partial fill for half stars */}
              {isPartiallyFilled && (
                <Star
                  className={cn(
                    starSize,
                    "absolute inset-0 fill-yellow-400 text-yellow-400",
                    "clip-path-[polygon(0_0,50%_0,50%_100%,0_100%)]"
                  )}
                  style={{
                    clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                  }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Rating value */}
      {showValue && (
        <span className="font-medium text-foreground ml-1">
          {currentRating.toFixed(1)}
        </span>
      )}

      {/* Review count */}
      {showCount && reviewCount !== undefined && (
        <span className="text-muted-foreground ml-1">
          ({reviewCount.toLocaleString()} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  )
}