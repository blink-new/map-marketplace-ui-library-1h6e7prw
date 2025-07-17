import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Navigation,
  Layers,
  MapPin,
  Maximize,
  Minimize,
  Settings,
  Map as MapIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MapControlsProps {
  zoom?: number
  maxZoom?: number
  minZoom?: number
  onZoomIn?: () => void
  onZoomOut?: () => void
  onResetView?: () => void
  onToggleFullscreen?: () => void
  onCenterOnUser?: () => void
  onToggleLayer?: (layer: string) => void
  isFullscreen?: boolean
  showLayerControls?: boolean
  showLocationButton?: boolean
  className?: string
}

const mapLayers = [
  { id: 'satellite', label: 'Satellite', icon: MapIcon },
  { id: 'traffic', label: 'Traffic', icon: Navigation },
  { id: 'transit', label: 'Transit', icon: MapPin }
]

export function MapControls({
  zoom = 10,
  maxZoom = 18,
  minZoom = 1,
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleFullscreen,
  onCenterOnUser,
  onToggleLayer,
  isFullscreen = false,
  showLayerControls = true,
  showLocationButton = true,
  className
}: MapControlsProps) {
  const [activeLayers, setActiveLayers] = useState<string[]>([])
  const [showLayers, setShowLayers] = useState(false)

  const handleLayerToggle = (layerId: string) => {
    const newLayers = activeLayers.includes(layerId)
      ? activeLayers.filter(id => id !== layerId)
      : [...activeLayers, layerId]
    
    setActiveLayers(newLayers)
    onToggleLayer?.(layerId)
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Main Controls */}
      <Card className="shadow-lg">
        <CardContent className="p-2">
          <div className="flex flex-col gap-1">
            {/* Zoom In */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomIn}
              disabled={zoom >= maxZoom}
              className="h-10 w-10 hover:bg-muted"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            {/* Zoom Level Indicator */}
            <div className="px-2 py-1 text-center">
              <Badge variant="outline" className="text-xs font-mono">
                {zoom}x
              </Badge>
            </div>
            
            {/* Zoom Out */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onZoomOut}
              disabled={zoom <= minZoom}
              className="h-10 w-10 hover:bg-muted"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Controls */}
      <Card className="shadow-lg">
        <CardContent className="p-2">
          <div className="flex flex-col gap-1">
            {/* Reset View */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onResetView}
              className="h-10 w-10 hover:bg-muted"
              title="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            {/* Center on User Location */}
            {showLocationButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCenterOnUser}
                className="h-10 w-10 hover:bg-muted"
                title="Center on my location"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            )}
            
            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFullscreen}
              className="h-10 w-10 hover:bg-muted"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Layer Controls */}
      {showLayerControls && (
        <Card className="shadow-lg">
          <CardContent className="p-2">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLayers(!showLayers)}
                className={cn(
                  "h-10 w-10 hover:bg-muted",
                  showLayers && "bg-muted"
                )}
                title="Toggle layers"
              >
                <Layers className="h-4 w-4" />
              </Button>
              
              {showLayers && (
                <>
                  <Separator className="my-1" />
                  {mapLayers.map((layer) => {
                    const IconComponent = layer.icon
                    const isActive = activeLayers.includes(layer.id)
                    
                    return (
                      <Button
                        key={layer.id}
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLayerToggle(layer.id)}
                        className={cn(
                          "h-10 w-10 hover:bg-muted relative",
                          isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                        title={`Toggle ${layer.label} layer`}
                      >
                        <IconComponent className="h-4 w-4" />
                        {isActive && (
                          <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full" />
                        )}
                      </Button>
                    )
                  })}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      <Card className="shadow-lg">
        <CardContent className="p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-muted"
            title="Map settings"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}