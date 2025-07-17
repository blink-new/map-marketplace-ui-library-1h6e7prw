import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Minus, RotateCcw, Maximize2, Navigation } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MapControlsProps {
  onZoomIn?: () => void
  onZoomOut?: () => void
  onReset?: () => void
  onFullscreen?: () => void
  onRecenter?: () => void
  showFullscreen?: boolean
  showRecenter?: boolean
  className?: string
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onFullscreen,
  onRecenter,
  showFullscreen = true,
  showRecenter = true,
  className
}: MapControlsProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {/* Zoom controls */}
      <div className="flex flex-col bg-white/90 backdrop-blur-sm border rounded-md shadow-sm overflow-hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomIn}
          className="h-8 w-8 p-0 rounded-none hover:bg-white border-b"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onZoomOut}
          className="h-8 w-8 p-0 rounded-none hover:bg-white"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      {/* Additional controls */}
      <div className="flex flex-col gap-1">
        {showRecenter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRecenter}
            className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm border rounded-md shadow-sm hover:bg-white"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm border rounded-md shadow-sm hover:bg-white"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {showFullscreen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFullscreen}
            className="h-8 w-8 p-0 bg-white/90 backdrop-blur-sm border rounded-md shadow-sm hover:bg-white"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}