import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const locationPinVariants = cva(
  "relative flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        md: "h-8 w-8", 
        lg: "h-12 w-12"
      },
      color: {
        primary: "bg-blue-500 hover:bg-blue-600",
        accent: "bg-amber-500 hover:bg-amber-600",
        destructive: "bg-red-500 hover:bg-red-600",
        success: "bg-green-500 hover:bg-green-600",
        secondary: "bg-gray-500 hover:bg-gray-600"
      }
    },
    defaultVariants: {
      size: "md",
      color: "primary"
    }
  }
)

interface LocationPinProps extends VariantProps<typeof locationPinVariants> {
  label?: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function LocationPin({ 
  size, 
  color, 
  label, 
  active = false, 
  onClick,
  className 
}: LocationPinProps) {
  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Pin */}
      <div 
        className={cn(
          locationPinVariants({ size, color }),
          active && "ring-4 ring-white/50 animate-pulse",
          className
        )}
        onClick={onClick}
      >
        {/* Inner dot */}
        <div className={cn(
          "rounded-full bg-white",
          size === "sm" && "h-2 w-2",
          size === "md" && "h-3 w-3",
          size === "lg" && "h-4 w-4"
        )} />
        
        {/* Pulse animation for active state */}
        {active && (
          <div className={cn(
            "absolute inset-0 rounded-full animate-ping",
            color === "primary" && "bg-blue-400",
            color === "accent" && "bg-amber-400", 
            color === "destructive" && "bg-red-400",
            color === "success" && "bg-green-400",
            color === "secondary" && "bg-gray-400"
          )} />
        )}
      </div>
      
      {/* Pin stem */}
      <div className={cn(
        "w-0.5 bg-gray-400",
        size === "sm" && "h-2",
        size === "md" && "h-3", 
        size === "lg" && "h-4"
      )} />
      
      {/* Label */}
      {label && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded shadow-lg">
            {label}
          </div>
          {/* Arrow pointing up */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-black/80" />
        </div>
      )}
    </div>
  )
}