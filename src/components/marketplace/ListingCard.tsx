import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RatingStars } from './RatingStars'
import { PriceTag } from './PriceTag'
import { MapPin, Heart, Share2, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ListingCardProps {
  id: string
  title: string
  description: string
  price: string
  location: string
  distance?: string
  rating?: number
  reviewCount?: number
  category?: string
  isNew?: boolean
  isFavorite?: boolean
  imageUrl?: string
  className?: string
  onFavorite?: (id: string) => void
  onShare?: (id: string) => void
  onClick?: (id: string) => void
}

export function ListingCard({
  id,
  title,
  description,
  price,
  location,
  distance,
  rating,
  reviewCount,
  category,
  isNew = false,
  isFavorite = false,
  imageUrl,
  className,
  onFavorite,
  onShare,
  onClick
}: ListingCardProps) {
  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden",
        className
      )}
      onClick={() => onClick?.(id)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Eye className="h-8 w-8 text-gray-400" />
          </div>
        )}
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              New
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="bg-white/90 text-gray-700">
              {category}
            </Badge>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation()
              onFavorite?.(id)
            }}
          >
            <Heart 
              className={cn(
                "h-4 w-4",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation()
              onShare?.(id)
            }}
          >
            <Share2 className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <CardContent className="p-4 space-y-3">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 flex-1">
            {title}
          </h3>
          <PriceTag price={price.replace(/[^0-9]/g, '')} size="sm" className="shrink-0" />
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        
        {/* Location and Distance */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
          {distance && (
            <>
              <span>•</span>
              <span>{distance}</span>
            </>
          )}
        </div>
        
        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center justify-between">
            <RatingStars 
              rating={rating} 
              size="sm" 
              showValue 
              showCount={!!reviewCount}
              reviewCount={reviewCount}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}