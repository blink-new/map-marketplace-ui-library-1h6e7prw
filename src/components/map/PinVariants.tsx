import React from 'react'
import { LocationPin } from './LocationPin'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Icon components for pins
const MapIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
)

const HomeIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const ShoppingIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
  </svg>
)

const CarIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 012 2v4a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
)

// Specialized pin components for different marketplace categories
export function RestaurantPin({ rating, cuisine, ...props }: { rating?: number; cuisine?: string } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="modern"
      color="orange"
      icon={<span className="text-xs">🍽️</span>}
      badge={rating?.toString()}
      label={cuisine}
      {...props}
    />
  )
}

export function PropertyPin({ price, type, ...props }: { price?: string; type?: string } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="square"
      color="success"
      icon={<HomeIcon />}
      label={price}
      {...props}
    />
  )
}

export function ShoppingPin({ category, deals, ...props }: { category?: string; deals?: number } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="hexagon"
      color="purple"
      icon={<ShoppingIcon />}
      badge={deals}
      label={category}
      {...props}
    />
  )
}

export function ParkingPin({ available, hourlyRate, ...props }: { available?: number; hourlyRate?: string } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="square"
      color="teal"
      icon={<span className="text-xs font-bold">P</span>}
      badge={available}
      label={hourlyRate}
      {...props}
    />
  )
}

export function EventPin({ eventType, date, ...props }: { eventType?: string; date?: string } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="diamond"
      color="pink"
      icon={<span className="text-xs">🎉</span>}
      pulse
      label={eventType}
      {...props}
    />
  )
}

export function HotelPin({ stars, price, ...props }: { stars?: number; price?: string } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="modern"
      color="indigo"
      icon={<span className="text-xs">🏨</span>}
      badge={stars}
      label={price}
      {...props}
    />
  )
}

export function TransportPin({ type, status, ...props }: { type?: string; status?: 'active' | 'delayed' | 'offline' } & React.ComponentProps<typeof LocationPin>) {
  const getColor = () => {
    switch (status) {
      case 'active': return 'success'
      case 'delayed': return 'accent'
      case 'offline': return 'secondary'
      default: return 'primary'
    }
  }
  
  return (
    <LocationPin
      variant="modern"
      color={getColor()}
      icon={<CarIcon />}
      pulse={status === 'active'}
      label={type}
      {...props}
    />
  )
}

export function UserLocationPin({ userName, ...props }: { userName?: string } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="beacon"
      color="primary"
      size="lg"
      pulse
      glow
      icon={<span className="text-xs">👤</span>}
      label={userName}
      {...props}
    />
  )
}

export function FavoritePin({ name, category, ...props }: { name?: string; category?: string } & React.ComponentProps<typeof LocationPin>) {
  return (
    <LocationPin
      variant="modern"
      color="destructive"
      icon={<HeartIcon />}
      label={name}
      {...props}
    />
  )
}

export function ClusterPin({ count, ...props }: { count: number } & React.ComponentProps<typeof LocationPin>) {
  const getClusterColor = (count: number) => {
    if (count < 10) return 'success'
    if (count < 50) return 'accent' 
    return 'destructive'
  }
  
  const getClusterSize = (count: number) => {
    if (count > 100) return 'xl'
    if (count > 50) return 'lg'
    if (count > 10) return 'md'
    return 'sm'
  }
  
  return (
    <LocationPin
      variant="elevated"
      color={getClusterColor(count)}
      size={getClusterSize(count)}
      icon={<span className="font-bold text-sm">{count > 99 ? '99+' : count}</span>}
      glow={count > 50}
      {...props}
    />
  )
}

// Showcase component for all pin variants
export function PinVariantsShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Location Pin Variants</h2>
        <p className="text-gray-600 mb-6">
          A comprehensive collection of location pins for different marketplace use cases.
        </p>
      </div>

      {/* Basic Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Pin Variants</CardTitle>
          <CardDescription>Different visual styles for various use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-8 items-end">
            <div className="text-center space-y-2">
              <LocationPin variant="classic" color="primary" label="Classic" />
              <Badge variant="outline">Classic</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin variant="modern" color="accent" label="Modern" />
              <Badge variant="outline">Modern</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin variant="square" color="success" label="Square" />
              <Badge variant="outline">Square</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin variant="diamond" color="destructive" label="Diamond" />
              <Badge variant="outline">Diamond</Badge>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-4 gap-8 items-end">
            <div className="text-center space-y-2">
              <LocationPin variant="hexagon" color="purple" label="Hexagon" />
              <Badge variant="outline">Hexagon</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin variant="dot" color="pink" label="Dot" />
              <Badge variant="outline">Dot</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin variant="beacon" color="teal" pulse label="Beacon" />
              <Badge variant="outline">Beacon</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin variant="elevated" color="indigo" glow label="Elevated" />
              <Badge variant="outline">Elevated</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Size Variants</CardTitle>
          <CardDescription>Different sizes for hierarchy and importance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-center gap-8">
            <div className="text-center space-y-2">
              <LocationPin size="xs" color="primary" label="XS" />
              <Badge variant="outline">XS</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin size="sm" color="primary" label="SM" />
              <Badge variant="outline">SM</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin size="md" color="primary" label="MD" />
              <Badge variant="outline">MD</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin size="lg" color="primary" label="LG" />
              <Badge variant="outline">LG</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin size="xl" color="primary" label="XL" />
              <Badge variant="outline">XL</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialized Pins */}
      <Card>
        <CardHeader>
          <CardTitle>Specialized Marketplace Pins</CardTitle>
          <CardDescription>Purpose-built pins for different business categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8 items-end">
            <div className="text-center space-y-2">
              <RestaurantPin rating={4.8} cuisine="Italian" />
              <Badge variant="outline">Restaurant</Badge>
            </div>
            <div className="text-center space-y-2">
              <PropertyPin price="$2,500/mo" type="Apartment" />
              <Badge variant="outline">Property</Badge>
            </div>
            <div className="text-center space-y-2">
              <ShoppingPin category="Electronics" deals={5} />
              <Badge variant="outline">Shopping</Badge>
            </div>
            <div className="text-center space-y-2">
              <ParkingPin available={12} hourlyRate="$5/hr" />
              <Badge variant="outline">Parking</Badge>
            </div>
            <div className="text-center space-y-2">
              <EventPin eventType="Concert" date="Tonight" />
              <Badge variant="outline">Event</Badge>
            </div>
            <div className="text-center space-y-2">
              <HotelPin stars={4} price="$120/night" />
              <Badge variant="outline">Hotel</Badge>
            </div>
            <div className="text-center space-y-2">
              <TransportPin type="Bus Stop" status="active" />
              <Badge variant="outline">Transport</Badge>
            </div>
            <div className="text-center space-y-2">
              <FavoritePin name="Coffee Shop" category="Favorites" />
              <Badge variant="outline">Favorite</Badge>
            </div>
            <div className="text-center space-y-2">
              <ClusterPin count={25} />
              <Badge variant="outline">Cluster</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive States</CardTitle>
          <CardDescription>Different states for user interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-8 items-end">
            <div className="text-center space-y-2">
              <LocationPin color="primary" label="Default" />
              <Badge variant="outline">Default</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin color="primary" active label="Active" />
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin color="primary" selected label="Selected" />
              <Badge variant="outline">Selected</Badge>
            </div>
            <div className="text-center space-y-2">
              <LocationPin color="primary" pulse glow label="Pulsing" />
              <Badge variant="outline">Pulsing</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}