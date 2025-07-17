import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Search, MapPin, Clock, X, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchOverlayProps {
  suggestions?: string[]
  recentSearches?: string[]
  placeholder?: string
  onSearch?: (query: string) => void
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

export function SearchOverlay({
  suggestions = [],
  recentSearches = [],
  placeholder = "Search for places, restaurants, hotels...",
  onSearch,
  onSuggestionClick,
  className
}: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query)
      setIsExpanded(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSuggestionClick?.(suggestion)
    setIsExpanded(false)
  }

  const clearQuery = () => {
    setQuery('')
    setIsExpanded(false)
  }

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      {/* Main search input */}
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 p-4">
            <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={placeholder}
              className="border-0 shadow-none text-base focus-visible:ring-0 flex-1"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearQuery}
                className="h-8 w-8 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expanded suggestions and recent searches */}
      {isExpanded && (suggestions.length > 0 || recentSearches.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-xl z-50">
          <CardContent className="p-0">
            {/* Quick suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  Popular searches
                </h4>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-3 w-full p-2 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Separator */}
            {suggestions.length > 0 && recentSearches.length > 0 && (
              <Separator />
            )}

            {/* Recent searches */}
            {recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Recent searches
                  </h4>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Clear all
                  </Button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="flex items-center gap-3 w-full p-2 text-left hover:bg-muted rounded-md transition-colors"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick filters */}
            <div className="p-4 border-t">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Quick filters
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Restaurants', 'Hotels', 'Gas Stations', 'Coffee', 'Shopping'].map((filter) => (
                  <Badge
                    key={filter}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSuggestionClick(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Backdrop to close overlay */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}