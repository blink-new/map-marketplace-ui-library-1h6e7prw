import React from 'react'
import { cn } from '@/lib/utils'

interface MapContainerProps {
  height?: string
  width?: string
  className?: string
  children?: React.ReactNode
}

export function MapContainer({ 
  height = '400px', 
  width = '100%', 
  className,
  children 
}: MapContainerProps) {
  return (
    <div 
      className={cn(
        "relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border overflow-hidden",
        "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),rgba(34,197,94,0.1))]",
        className
      )}
      style={{ height, width }}
    >
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Map content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
      
      {/* Map controls overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button className="bg-white/90 backdrop-blur-sm border rounded-md p-2 hover:bg-white transition-colors shadow-sm">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="bg-white/90 backdrop-blur-sm border rounded-md p-2 hover:bg-white transition-colors shadow-sm">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
      
      {/* Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
        Map Preview
      </div>
    </div>
  )
}