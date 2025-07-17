import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { 
  Filter, 
  MapPin, 
  Star, 
  DollarSign, 
  Clock,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface CategoryFilterProps {
  categories?: FilterOption[]
  amenities?: FilterOption[]
  priceRange?: [number, number]
  maxPrice?: number
  rating?: number
  distance?: number
  maxDistance?: number
  onCategoryChange?: (categories: string[]) => void
  onAmenityChange?: (amenities: string[]) => void
  onPriceChange?: (range: [number, number]) => void
  onRatingChange?: (rating: number) => void
  onDistanceChange?: (distance: number) => void
  onClearAll?: () => void
  className?: string
}

export function CategoryFilter({
  categories = [
    { id: 'restaurants', label: 'Restaurants', count: 245 },
    { id: 'hotels', label: 'Hotels', count: 89 },
    { id: 'coffee', label: 'Coffee Shops', count: 156 },
    { id: 'shopping', label: 'Shopping', count: 312 },
    { id: 'gas', label: 'Gas Stations', count: 67 },
    { id: 'entertainment', label: 'Entertainment', count: 134 }
  ],
  amenities = [
    { id: 'wifi', label: 'Free WiFi' },
    { id: 'parking', label: 'Parking' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'outdoor', label: 'Outdoor Seating' },
    { id: 'accessible', label: 'Wheelchair Accessible' },
    { id: 'pets', label: 'Pet Friendly' }
  ],
  priceRange = [0, 100],
  maxPrice = 200,
  rating = 0,
  distance = 5,
  maxDistance = 25,
  onCategoryChange,
  onAmenityChange,
  onPriceChange,
  onRatingChange,
  onDistanceChange,
  onClearAll,
  className
}: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange)
  const [currentRating, setCurrentRating] = useState(rating)
  const [currentDistance, setCurrentDistance] = useState(distance)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    amenities: true,
    price: true,
    rating: true,
    distance: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCategoryToggle = (categoryId: string) => {
    const newSelection = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId]
    
    setSelectedCategories(newSelection)
    onCategoryChange?.(newSelection)
  }

  const handleAmenityToggle = (amenityId: string) => {
    const newSelection = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId]
    
    setSelectedAmenities(newSelection)
    onAmenityChange?.(newSelection)
  }

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]]
    setCurrentPriceRange(newRange)
    onPriceChange?.(newRange)
  }

  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating)
    onRatingChange?.(newRating)
  }

  const handleDistanceChange = (value: number[]) => {
    setCurrentDistance(value[0])
    onDistanceChange?.(value[0])
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedAmenities([])
    setCurrentPriceRange([0, maxPrice])
    setCurrentRating(0)
    setCurrentDistance(maxDistance)
    onClearAll?.()
  }

  const hasActiveFilters = selectedCategories.length > 0 || 
                          selectedAmenities.length > 0 || 
                          currentPriceRange[0] > 0 || 
                          currentPriceRange[1] < maxPrice ||
                          currentRating > 0 ||
                          currentDistance < maxDistance

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium">Categories</h4>
            {expandedSections.categories ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.categories && (
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                    />
                    <Label
                      htmlFor={category.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category.label}
                    </Label>
                  </div>
                  {category.count && (
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Price Range */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <h4 className="font-medium">Price Range</h4>
            </div>
            {expandedSections.price ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.price && (
            <div className="space-y-4">
              <Slider
                value={currentPriceRange}
                onValueChange={handlePriceChange}
                max={maxPrice}
                step={5}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${currentPriceRange[0]}</span>
                <span>${currentPriceRange[1]}</span>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Rating */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <h4 className="font-medium">Minimum Rating</h4>
            </div>
            {expandedSections.rating ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.rating && (
            <div className="space-y-2">
              {[4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() => handleRatingChange(stars)}
                  className={cn(
                    "flex items-center gap-2 w-full p-2 rounded-md text-left transition-colors",
                    currentRating === stars
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < stars
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{stars}+ stars</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Distance */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('distance')}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <h4 className="font-medium">Distance</h4>
            </div>
            {expandedSections.distance ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.distance && (
            <div className="space-y-4">
              <Slider
                value={[currentDistance]}
                onValueChange={handleDistanceChange}
                max={maxDistance}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-center">
                Within {currentDistance} miles
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Amenities */}
        <div className="space-y-3">
          <button
            onClick={() => toggleSection('amenities')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium">Amenities</h4>
            {expandedSections.amenities ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.amenities && (
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={() => handleAmenityToggle(amenity.id)}
                  />
                  <Label
                    htmlFor={amenity.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}