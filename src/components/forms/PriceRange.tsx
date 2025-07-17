import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  RotateCcw,
  Check
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PriceRangeProps {
  min?: number
  max?: number
  value?: [number, number]
  step?: number
  currency?: string
  showPresets?: boolean
  showInputs?: boolean
  presets?: Array<{
    label: string
    value: [number, number]
  }>
  onValueChange?: (value: [number, number]) => void
  className?: string
}

const defaultPresets = [
  { label: 'Budget', value: [0, 50] as [number, number] },
  { label: 'Mid-range', value: [50, 150] as [number, number] },
  { label: 'Premium', value: [150, 300] as [number, number] },
  { label: 'Luxury', value: [300, 500] as [number, number] },
  { label: 'Ultra-luxury', value: [500, 1000] as [number, number] }
]

export function PriceRange({
  min = 0,
  max = 1000,
  value = [0, 500],
  step = 10,
  currency = '$',
  showPresets = true,
  showInputs = true,
  presets = defaultPresets,
  onValueChange,
  className
}: PriceRangeProps) {
  const [currentValue, setCurrentValue] = useState<[number, number]>(value)
  const [minInput, setMinInput] = useState(value[0].toString())
  const [maxInput, setMaxInput] = useState(value[1].toString())

  const handleSliderChange = (newValue: number[]) => {
    const range: [number, number] = [newValue[0], newValue[1]]
    setCurrentValue(range)
    setMinInput(range[0].toString())
    setMaxInput(range[1].toString())
    onValueChange?.(range)
  }

  const handleInputChange = (type: 'min' | 'max', inputValue: string) => {
    const numValue = parseInt(inputValue) || 0
    
    if (type === 'min') {
      setMinInput(inputValue)
      if (numValue >= min && numValue <= currentValue[1]) {
        const newRange: [number, number] = [numValue, currentValue[1]]
        setCurrentValue(newRange)
        onValueChange?.(newRange)
      }
    } else {
      setMaxInput(inputValue)
      if (numValue <= max && numValue >= currentValue[0]) {
        const newRange: [number, number] = [currentValue[0], numValue]
        setCurrentValue(newRange)
        onValueChange?.(newRange)
      }
    }
  }

  const handlePresetClick = (preset: [number, number]) => {
    setCurrentValue(preset)
    setMinInput(preset[0].toString())
    setMaxInput(preset[1].toString())
    onValueChange?.(preset)
  }

  const handleReset = () => {
    const resetValue: [number, number] = [min, max]
    setCurrentValue(resetValue)
    setMinInput(resetValue[0].toString())
    setMaxInput(resetValue[1].toString())
    onValueChange?.(resetValue)
  }

  const formatPrice = (price: number) => {
    return `${currency}${price.toLocaleString()}`
  }

  const getSelectedPreset = () => {
    return presets.find(preset => 
      preset.value[0] === currentValue[0] && preset.value[1] === currentValue[1]
    )
  }

  const selectedPreset = getSelectedPreset()

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5" />
          Price Range
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Range Display */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold">
            <span>{formatPrice(currentValue[0])}</span>
            <span className="text-muted-foreground">-</span>
            <span>{formatPrice(currentValue[1])}</span>
          </div>
          {selectedPreset && (
            <Badge variant="secondary" className="text-sm">
              {selectedPreset.label}
            </Badge>
          )}
        </div>

        {/* Slider */}
        <div className="space-y-4">
          <Slider
            value={currentValue}
            onValueChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            className="w-full"
          />
          
          {/* Min/Max Labels */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(min)}</span>
            <span>{formatPrice(max)}</span>
          </div>
        </div>

        {/* Manual Input */}
        {showInputs && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Custom Range</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                  Minimum
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {currency}
                  </span>
                  <Input
                    id="min-price"
                    type="number"
                    value={minInput}
                    onChange={(e) => handleInputChange('min', e.target.value)}
                    className="pl-8"
                    min={min}
                    max={currentValue[1]}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                  Maximum
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {currency}
                  </span>
                  <Input
                    id="max-price"
                    type="number"
                    value={maxInput}
                    onChange={(e) => handleInputChange('max', e.target.value)}
                    className="pl-8"
                    min={currentValue[0]}
                    max={max}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preset Buttons */}
        {showPresets && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Select</Label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset, index) => {
                const isSelected = selectedPreset?.label === preset.label
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePresetClick(preset.value)}
                    className="justify-between text-xs"
                  >
                    <span>{preset.label}</span>
                    {isSelected && <Check className="h-3 w-3" />}
                  </Button>
                )
              })}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <TrendingDown className="h-3 w-3" />
              <span className="text-xs font-medium">Min</span>
            </div>
            <p className="text-sm font-semibold">{formatPrice(currentValue[0])}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs font-medium">Range</span>
            </div>
            <p className="text-sm font-semibold">
              {formatPrice(currentValue[1] - currentValue[0])}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs font-medium">Max</span>
            </div>
            <p className="text-sm font-semibold">{formatPrice(currentValue[1])}</p>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  )
}