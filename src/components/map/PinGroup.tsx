import React from 'react'
import { cn } from '@/lib/utils'
import { LocationPin } from './LocationPin'

interface PinGroupProps {
  pins: Array<{
    id: string
    x: number // percentage from left
    y: number // percentage from top
    variant?: 'classic' | 'modern' | 'square' | 'diamond' | 'hexagon' | 'dot' | 'beacon' | 'elevated'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    color?: 'primary' | 'accent' | 'destructive' | 'success' | 'secondary' | 'purple' | 'pink' | 'orange' | 'teal' | 'indigo'
    label?: string
    icon?: React.ReactNode
    badge?: string | number
    active?: boolean
    selected?: boolean
    onClick?: () => void
  }>
  className?: string
  containerWidth?: number
  containerHeight?: number
}

export function PinGroup({ 
  pins, 
  className,
  containerWidth = 400,
  containerHeight = 300
}: PinGroupProps) {
  return (
    <div 
      className={cn("relative bg-gray-100 rounded-lg overflow-hidden", className)}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {/* Background pattern to simulate map */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-gray-300">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Pins */}
      {pins.map((pin) => (
        <div
          key={pin.id}
          className="absolute transform -translate-x-1/2 -translate-y-full z-10"
          style={{
            left: `${pin.x}%`,
            top: `${pin.y}%`
          }}
        >
          <LocationPin
            variant={pin.variant}
            size={pin.size}
            color={pin.color}
            label={pin.label}
            icon={pin.icon}
            badge={pin.badge}
            active={pin.active}
            selected={pin.selected}
            onClick={pin.onClick}
          />
        </div>
      ))}
    </div>
  )
}

const samplePins = [
  {
    id: 'restaurant-1',
    x: 25,
    y: 30,
    variant: 'modern' as const,
    color: 'orange' as const,
    icon: <span className="text-xs">🍽️</span>,
    label: 'Italian Bistro',
    badge: '4.8'
  },
  {
    id: 'property-1', 
    x: 60,
    y: 45,
    variant: 'square' as const,
    color: 'success' as const,
    icon: <span className="text-xs font-bold">$</span>,
    label: '$2,500/mo'
  },
  {
    id: 'event-1',
    x: 40,
    y: 70,
    variant: 'diamond' as const,
    color: 'pink' as const,
    icon: <span className="text-xs">🎉</span>,
    label: 'Music Festival',
    active: true
  },
  {
    id: 'parking-1',
    x: 75,
    y: 25,
    variant: 'square' as const,
    color: 'teal' as const,
    icon: <span className="text-xs font-bold">P</span>,
    badge: '12'
  },
  {
    id: 'user-location',
    x: 50,
    y: 50,
    variant: 'beacon' as const,
    color: 'primary' as const,
    size: 'lg' as const,
    pulse: true,
    glow: true
  }
]

// Animated pin group for showcasing
export function AnimatedPinGroup({ className }: { className?: string }) {
  const [activePin, setActivePin] = React.useState<string | null>(null)
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActivePin(prev => {
        const pinIds = samplePins.map(p => p.id)
        const currentIndex = prev ? pinIds.indexOf(prev) : -1
        const nextIndex = (currentIndex + 1) % pinIds.length
        return pinIds[nextIndex]
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <PinGroup
      pins={samplePins.map(pin => ({
        ...pin,
        selected: pin.id === activePin,
        onClick: () => setActivePin(pin.id)
      }))}
      className={className}
      containerWidth={500}
      containerHeight={350}
    />
  )
}