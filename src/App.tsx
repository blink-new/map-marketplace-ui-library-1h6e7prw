import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

// Import our custom components
import { MapContainer } from '@/components/map/MapContainer'
import { LocationPin } from '@/components/map/LocationPin'
import { MapControls } from '@/components/map/MapControls'
import { ListingCard } from '@/components/marketplace/ListingCard'
import { SearchOverlay } from '@/components/marketplace/SearchOverlay'
import { PriceTag } from '@/components/marketplace/PriceTag'
import { RatingStars } from '@/components/marketplace/RatingStars'
import { CategoryFilter } from '@/components/marketplace/CategoryFilter'

// Import icons
import * as Icons from '@/components/icons'
import { Search, Copy, Check } from 'lucide-react'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, componentName: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(componentName)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Sample data
  const sampleListings = [
    {
      id: '1',
      title: 'Cozy Downtown Apartment',
      description: 'Beautiful 2-bedroom apartment in the heart of the city with modern amenities.',
      price: '$2,400/mo',
      location: 'Downtown, NYC',
      distance: '0.5 mi',
      rating: 4.8,
      reviewCount: 124,
      category: 'Apartment',
      isNew: true,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      title: 'Modern Office Space',
      description: 'Professional workspace perfect for startups and small businesses.',
      price: '$1,800/mo',
      location: 'Business District',
      distance: '1.2 mi',
      rating: 4.6,
      reviewCount: 89,
      category: 'Office',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    }
  ]

  const iconList = Object.entries(Icons).map(([name, Component]) => ({
    name,
    component: Component
  }))

  const filteredIcons = iconList.filter(icon =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Map Marketplace Component Library
              </h1>
              <p className="text-muted-foreground mt-2">
                A comprehensive collection of reusable components for modern map-based marketplace applications
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              v1.0.0
            </Badge>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="components" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <div className="grid gap-8">
              
              {/* Map Components */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Map Components</h2>
                <div className="grid gap-6">
                  
                  {/* MapContainer */}
                  <Card>
                    <CardHeader>
                      <CardTitle>MapContainer</CardTitle>
                      <CardDescription>
                        Interactive map container with customizable dimensions and controls
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <MapContainer height="300px" />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `<MapContainer height="300px" />`,
                          'MapContainer'
                        )}
                      >
                        {copiedCode === 'MapContainer' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>

                  {/* LocationPin */}
                  <Card>
                    <CardHeader>
                      <CardTitle>LocationPin</CardTitle>
                      <CardDescription>
                        Customizable location pins with different sizes, colors, and states
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-end gap-8 rounded-lg border p-8">
                        <LocationPin size="sm" color="primary" label="Small" />
                        <LocationPin size="md" color="accent" label="Medium" />
                        <LocationPin size="lg" color="destructive" label="Large" active />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `<LocationPin size="md" color="primary" label="Location" />`,
                          'LocationPin'
                        )}
                      >
                        {copiedCode === 'LocationPin' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Marketplace Components */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Marketplace Components</h2>
                <div className="grid gap-6">
                  
                  {/* SearchOverlay */}
                  <Card>
                    <CardHeader>
                      <CardTitle>SearchOverlay</CardTitle>
                      <CardDescription>
                        Advanced search interface with suggestions and filters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-6">
                        <SearchOverlay
                          suggestions={['Coffee shops', 'Restaurants near me', 'Hotels']}
                          recentSearches={['Pizza', 'Gas station']}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `<SearchOverlay suggestions={suggestions} recentSearches={recent} />`,
                          'SearchOverlay'
                        )}
                      >
                        {copiedCode === 'SearchOverlay' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>

                  {/* ListingCard */}
                  <Card>
                    <CardHeader>
                      <CardTitle>ListingCard</CardTitle>
                      <CardDescription>
                        Feature-rich listing cards for marketplace items
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sampleListings.map((listing) => (
                          <ListingCard key={listing.id} {...listing} />
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `<ListingCard title="Title" price="$100" location="Location" rating={4.5} />`,
                          'ListingCard'
                        )}
                      >
                        {copiedCode === 'ListingCard' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>

                  {/* PriceTag */}
                  <Card>
                    <CardHeader>
                      <CardTitle>PriceTag</CardTitle>
                      <CardDescription>
                        Flexible price display with discount support
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4 rounded-lg border p-4">
                        <PriceTag price="99" />
                        <PriceTag price="199" originalPrice="299" showDiscount />
                        <PriceTag price="49" period="month" variant="accent" />
                        <PriceTag price="1299" size="lg" variant="success" />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `<PriceTag price="99" originalPrice="149" showDiscount />`,
                          'PriceTag'
                        )}
                      >
                        {copiedCode === 'PriceTag' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>

                  {/* RatingStars */}
                  <Card>
                    <CardHeader>
                      <CardTitle>RatingStars</CardTitle>
                      <CardDescription>
                        Interactive rating component with customizable display
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3 rounded-lg border p-4">
                        <RatingStars rating={4.5} showValue showCount reviewCount={124} />
                        <RatingStars rating={3.8} size="lg" showValue />
                        <RatingStars rating={5} size="sm" />
                        <RatingStars rating={0} interactive onRatingChange={(rating) => console.log(rating)} />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `<RatingStars rating={4.5} showValue showCount reviewCount={124} />`,
                          'RatingStars'
                        )}
                      >
                        {copiedCode === 'RatingStars' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>

                  {/* CategoryFilter */}
                  <Card>
                    <CardHeader>
                      <CardTitle>CategoryFilter</CardTitle>
                      <CardDescription>
                        Multi-select category filter with icons and counts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <CategoryFilter
                          categories={[
                            { id: 'restaurant', name: 'Restaurants', icon: <Icons.RestaurantIcon className="h-4 w-4" />, count: 24 },
                            { id: 'hotel', name: 'Hotels', icon: <Icons.HotelIcon className="h-4 w-4" />, count: 12 },
                            { id: 'coffee', name: 'Coffee', icon: <Icons.CoffeeIcon className="h-4 w-4" />, count: 8 },
                            { id: 'gas', name: 'Gas Stations', icon: <Icons.GasStationIcon className="h-4 w-4" />, count: 6 },
                            { id: 'shopping', name: 'Shopping', icon: <Icons.ShoppingBagIcon className="h-4 w-4" />, count: 15 }
                          ]}
                          showCounts
                          onCategoryChange={(selected) => console.log('Selected:', selected)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(
                          `<CategoryFilter categories={categories} showCounts onCategoryChange={handleChange} />`,
                          'CategoryFilter'
                        )}
                      >
                        {copiedCode === 'CategoryFilter' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy Code
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Badge variant="outline">
                {filteredIcons.length} icons
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {filteredIcons.map(({ name, component: IconComponent }) => (
                <Card
                  key={name}
                  className="group cursor-pointer transition-all hover:shadow-md"
                  onClick={() => copyToClipboard(`<${name} />`, name)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <IconComponent className="h-6 w-6 mb-2 text-foreground" />
                    <span className="text-xs font-medium truncate w-full">
                      {name}
                    </span>
                    {copiedCode === name && (
                      <Check className="h-3 w-3 mt-1 text-green-600" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Marketplace Interface</CardTitle>
                <CardDescription>
                  A full example combining multiple components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Search */}
                  <SearchOverlay
                    suggestions={['Restaurants', 'Hotels', 'Coffee shops']}
                    recentSearches={['Pizza delivery', 'Gas stations']}
                  />
                  
                  <Separator />
                  
                  {/* Map with pins */}
                  <div className="relative">
                    <MapContainer height="400px">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <LocationPin size="lg" color="primary" active />
                          <div className="absolute -top-8 -left-12">
                            <LocationPin size="md" color="accent" label="Restaurant" />
                          </div>
                          <div className="absolute -bottom-6 left-8">
                            <LocationPin size="sm" color="destructive" label="Hotel" />
                          </div>
                        </div>
                      </div>
                    </MapContainer>
                  </div>
                  
                  <Separator />
                  
                  {/* Listings grid */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Nearby Listings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sampleListings.map((listing) => (
                        <ListingCard key={listing.id} {...listing} />
                      ))}
                      <ListingCard
                        title="Luxury Hotel Suite"
                        description="5-star accommodation with city views"
                        price="$450/night"
                        location="Midtown Manhattan"
                        distance="0.8 mi"
                        rating={4.9}
                        reviewCount={256}
                        category="Hotel"
                        imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App