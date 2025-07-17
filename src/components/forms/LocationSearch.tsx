import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  X,
  Crosshair,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface LocationResult {
  id: string
  name: string
  address: string
  distance?: string
  type: 'address' | 'business' | 'landmark'
  rating?: number
  category?: string
}

interface LocationSearchProps {
  placeholder?: string
  value?: string
  onLocationSelect?: (location: LocationResult) => void
  onCurrentLocation?: () => void
  showCurrentLocation?: boolean
  recentLocations?: LocationResult[]
  className?: string
}

// Mock search results - in real app, this would call a geocoding API
const mockResults: LocationResult[] = [
  {
    id: '1',
    name: 'Central Park',
    address: 'New York, NY 10024, USA',
    distance: '0.5 mi',
    type: 'landmark',
    rating: 4.6
  },
  {
    id: '2', 
    name: 'Times Square',
    address: 'Manhattan, NY 10036, USA',
    distance: '1.2 mi',
    type: 'landmark',
    rating: 4.3
  },
  {
    id: '3',
    name: 'Starbucks Coffee',
    address: '1585 Broadway, New York, NY 10036',
    distance: '0.8 mi',
    type: 'business',
    category: 'Coffee Shop',
    rating: 4.1
  },
  {
    id: '4',
    name: '123 Main Street',
    address: 'New York, NY 10001, USA',
    distance: '2.1 mi',
    type: 'address'
  }
]

export function LocationSearch({
  placeholder = "Search for a location...",
  value = "",
  onLocationSelect,
  onCurrentLocation,
  showCurrentLocation = true,
  recentLocations = [],
  className
}: LocationSearchProps) {
  const [query, setQuery] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<LocationResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      // Simulate API call
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(result =>
          result.name.toLowerCase().includes(query.toLowerCase()) ||
          result.address.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const handleLocationSelect = (location: LocationResult) => {
    setQuery(location.name)
    setIsOpen(false)
    onLocationSelect?.(location)
  }

  const handleCurrentLocation = () => {
    setIsLoading(true)
    // Simulate getting current location
    setTimeout(() => {
      setQuery("Current Location")
      setIsLoading(false)
      setIsOpen(false)
      onCurrentLocation?.()
    }, 1000)
  }

  const clearQuery = () => {
    setQuery('')
    setResults([])
    inputRef.current?.focus()
  }

  const getLocationIcon = (type: LocationResult['type']) => {
    switch (type) {
      case 'business':
        return <MapPin className="h-4 w-4 text-blue-500" />
      case 'landmark':
        return <Star className="h-4 w-4 text-amber-500" />
      default:
        return <MapPin className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      {/* Search Input */}
      <Card className="shadow-md">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 p-3">
            <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={placeholder}
              className="border-0 shadow-none focus-visible:ring-0 flex-1"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearQuery}
                className="h-6 w-6 flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            {showCurrentLocation && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCurrentLocation}
                disabled={isLoading}
                className="h-6 w-6 flex-shrink-0"
                title="Use current location"
              >
                <Crosshair className={cn(
                  "h-3 w-3",
                  isLoading && "animate-spin"
                )} />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-xl z-50 max-h-80 overflow-hidden">
          <CardContent className="p-0">
            {/* Loading state */}
            {isLoading && (
              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Search className="h-4 w-4 animate-pulse" />
                  <span className="text-sm">Searching...</span>
                </div>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && results.length > 0 && (
              <div className="max-h-60 overflow-y-auto">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleLocationSelect(result)}
                    className="w-full p-3 text-left hover:bg-muted transition-colors border-b last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      {getLocationIcon(result.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {result.name}
                          </h4>
                          {result.category && (
                            <Badge variant="outline" className="text-xs">
                              {result.category}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {result.address}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          {result.distance && (
                            <span className="text-xs text-muted-foreground">
                              {result.distance}
                            </span>
                          )}
                          {result.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">
                                {result.rating}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Locations */}
            {!isLoading && query.length <= 2 && recentLocations.length > 0 && (
              <div className="p-3">
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Recent locations
                </h4>
                <div className="space-y-1">
                  {recentLocations.slice(0, 3).map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full p-2 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {getLocationIcon(location.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {location.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {location.address}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {!isLoading && query.length > 2 && results.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  No locations found for "{query}"
                </p>
              </div>
            )}

            {/* Current Location Option */}
            {showCurrentLocation && query.length <= 2 && (
              <>
                {recentLocations.length > 0 && <Separator />}
                <button
                  onClick={handleCurrentLocation}
                  disabled={isLoading}
                  className="w-full p-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
                >
                  <Navigation className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Use current location</p>
                    <p className="text-xs text-muted-foreground">
                      Get directions from where you are
                    </p>
                  </div>
                </button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}