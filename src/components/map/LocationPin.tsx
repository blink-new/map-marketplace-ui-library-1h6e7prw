import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const locationPinVariants = cva(
  "relative flex items-center justify-center transition-all duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        // Classic teardrop pin
        classic: "rounded-full rounded-bl-none border-2 border-white shadow-lg hover:scale-110 rotate-45",
        // Modern circular pin
        modern: "rounded-full border-2 border-white shadow-lg hover:scale-110",
        // Square pin for buildings/properties
        square: "rounded-lg border-2 border-white shadow-lg hover:scale-110",
        // Diamond pin for special locations
        diamond: "border-2 border-white shadow-lg hover:scale-110 rotate-45",
        // Hexagon pin for categories
        hexagon: "border-2 border-white shadow-lg hover:scale-110",
        // Minimal dot
        dot: "rounded-full shadow-md hover:scale-125",
        // Pulsing beacon
        beacon: "rounded-full border-2 border-white shadow-lg animate-pulse",
        // Elevated pin with shadow
        elevated: "rounded-full border-2 border-white shadow-xl hover:scale-110 hover:shadow-2xl"
      },
      size: {
        xs: "h-4 w-4",
        sm: "h-6 w-6",
        md: "h-8 w-8", 
        lg: "h-12 w-12",
        xl: "h-16 w-16"
      },
      color: {
        primary: "bg-blue-500 hover:bg-blue-600",
        accent: "bg-amber-500 hover:bg-amber-600",
        destructive: "bg-red-500 hover:bg-red-600",
        success: "bg-green-500 hover:bg-green-600",
        secondary: "bg-gray-500 hover:bg-gray-600",
        purple: "bg-purple-500 hover:bg-purple-600",
        pink: "bg-pink-500 hover:bg-pink-600",
        orange: "bg-orange-500 hover:bg-orange-600",
        teal: "bg-teal-500 hover:bg-teal-600",
        indigo: "bg-indigo-500 hover:bg-indigo-600"
      }
    },
    defaultVariants: {
      variant: "classic",
      size: "md",
      color: "primary"
    }
  }
)

interface LocationPinProps extends VariantProps<typeof locationPinVariants> {
  label?: string
  active?: boolean
  selected?: boolean
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  badge?: string | number
  pulse?: boolean
  glow?: boolean
}

export function LocationPin({ 
  variant,
  size, 
  color, 
  label, 
  active = false,
  selected = false,
  pulse = false,
  glow = false,
  onClick,
  className,
  icon,
  badge
}: LocationPinProps) {
  const isClassic = variant === 'classic'
  const isDiamond = variant === 'diamond'
  const isHexagon = variant === 'hexagon'
  
  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Pin Container */}
      <div className="relative">
        {/* Glow effect */}
        {glow && (
          <div className={cn(
            "absolute inset-0 rounded-full blur-md opacity-60",
            color === "primary" && "bg-blue-400",
            color === "accent" && "bg-amber-400",
            color === "destructive" && "bg-red-400",
            color === "success" && "bg-green-400",
            color === "secondary" && "bg-gray-400",
            color === "purple" && "bg-purple-400",
            color === "pink" && "bg-pink-400",
            color === "orange" && "bg-orange-400",
            color === "teal" && "bg-teal-400",
            color === "indigo" && "bg-indigo-400"
          )} />
        )}
        
        {/* Main Pin */}
        <div 
          className={cn(
            locationPinVariants({ variant, size, color }),
            active && "ring-4 ring-white/50",
            selected && "ring-4 ring-yellow-400/70",
            pulse && "animate-pulse",
            isHexagon && "clip-path-hexagon",
            className
          )}
          onClick={onClick}
          style={isHexagon ? {
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          } : undefined}
        >
          {/* Inner content */}
          <div className={cn(
            "flex items-center justify-center",
            isClassic && "-rotate-45",
            isDiamond && "-rotate-45"
          )}>
            {icon ? (
              <div className={cn(
                "text-white",
                size === "xs" && "text-xs",
                size === "sm" && "text-sm",
                size === "md" && "text-base",
                size === "lg" && "text-xl",
                size === "xl" && "text-2xl"
              )}>
                {icon}
              </div>
            ) : (
              <div className={cn(
                "rounded-full bg-white",
                size === "xs" && "h-1 w-1",
                size === "sm" && "h-2 w-2",
                size === "md" && "h-3 w-3",
                size === "lg" && "h-4 w-4",
                size === "xl" && "h-6 w-6"
              )} />
            )}
          </div>
          
          {/* Pulse animation for active state */}
          {active && (
            <div className={cn(
              "absolute inset-0 animate-ping",
              variant === "classic" && "rounded-full rounded-bl-none rotate-45",
              variant === "modern" && "rounded-full",
              variant === "square" && "rounded-lg",
              variant === "diamond" && "rotate-45",
              variant === "dot" && "rounded-full",
              variant === "beacon" && "rounded-full",
              variant === "elevated" && "rounded-full",
              color === "primary" && "bg-blue-400",
              color === "accent" && "bg-amber-400", 
              color === "destructive" && "bg-red-400",
              color === "success" && "bg-green-400",
              color === "secondary" && "bg-gray-400",
              color === "purple" && "bg-purple-400",
              color === "pink" && "bg-pink-400",
              color === "orange" && "bg-orange-400",
              color === "teal" && "bg-teal-400",
              color === "indigo" && "bg-indigo-400"
            )}
            style={isHexagon ? {
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            } : undefined}
          />
          )}
        </div>
        
        {/* Badge */}
        {badge && (
          <div className={cn(
            "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center font-medium shadow-lg",
            size === "xs" && "text-[10px] min-w-4 h-4",
            size === "xl" && "text-sm min-w-6 h-6"
          )}>
            {badge}
          </div>
        )}
      </div>
      
      {/* Pin stem for classic variant */}
      {isClassic && (
        <div className={cn(
          "w-0.5 bg-gray-400",
          size === "xs" && "h-1",
          size === "sm" && "h-2",
          size === "md" && "h-3", 
          size === "lg" && "h-4",
          size === "xl" && "h-6"
        )} />
      )}
      
      {/* Label */}
      {label && (
        <div className={cn(
          "absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-10",
          isClassic ? "-bottom-8" : "-bottom-6"
        )}>
          <div className="bg-black/90 text-white text-xs px-2 py-1 rounded shadow-lg backdrop-blur-sm">
            {label}
          </div>
          {/* Arrow pointing up */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-black/90" />
        </div>
      )}
    </div>
  )
}

// Specialized pin components for different use cases

export function PropertyPin({ price, ...props }: LocationPinProps & { price?: string }) {
  return (
    <LocationPin
      variant="square"
      color="success"
      icon={<span className="text-xs font-bold">$</span>}
      label={price}
      {...props}
    />
  )
}

export function RestaurantPin({ rating, ...props }: LocationPinProps & { rating?: number }) {
  return (
    <LocationPin
      variant="modern"
      color="orange"
      icon={<span className="text-xs">🍽️</span>}
      badge={rating ? rating.toString() : undefined}
      {...props}
    />
  )
}

export function ShoppingPin({ ...props }: LocationPinProps) {
  return (
    <LocationPin
      variant="hexagon"
      color="purple"
      icon={<span className="text-xs">🛍️</span>}
      {...props}
    />
  )
}

export function ParkingPin({ available, ...props }: LocationPinProps & { available?: number }) {
  return (
    <LocationPin
      variant="square"
      color="teal"
      icon={<span className="text-xs">P</span>}
      badge={available}
      {...props}
    />
  )
}

export function EventPin({ ...props }: LocationPinProps) {
  return (
    <LocationPin
      variant="diamond"
      color="pink"
      icon={<span className="text-xs">🎉</span>}
      pulse
      {...props}
    />
  )
}

export function UserLocationPin({ ...props }: LocationPinProps) {
  return (
    <LocationPin
      variant="beacon"
      color="primary"
      size="lg"
      pulse
      glow
      {...props}
    />
  )
}

export function ClusterPin({ count, ...props }: LocationPinProps & { count: number }) {
  const getClusterColor = (count: number) => {
    if (count < 10) return "success"
    if (count < 50) return "accent" 
    return "destructive"
  }
  
  return (
    <LocationPin
      variant="elevated"
      color={getClusterColor(count)}
      size={count > 50 ? "xl" : count > 10 ? "lg" : "md"}
      icon={<span className="font-bold text-sm">{count}</span>}
      {...props}
    />
  )
}