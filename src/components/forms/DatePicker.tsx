import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  Calendar as CalendarIcon, 
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, addDays, startOfWeek, endOfWeek, isToday, isTomorrow } from 'date-fns'

interface DateRange {
  from: Date
  to?: Date
}

interface DatePickerProps {
  mode?: 'single' | 'range'
  value?: Date | DateRange
  placeholder?: string
  showPresets?: boolean
  showTimeSlots?: boolean
  timeSlots?: string[]
  onDateChange?: (date: Date | DateRange | undefined) => void
  onTimeSlotChange?: (timeSlot: string) => void
  className?: string
}

const defaultTimeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
]

const datePresets = [
  {
    label: 'Today',
    getValue: () => new Date(),
    getRange: () => ({ from: new Date(), to: new Date() })
  },
  {
    label: 'Tomorrow',
    getValue: () => addDays(new Date(), 1),
    getRange: () => ({ from: addDays(new Date(), 1), to: addDays(new Date(), 1) })
  },
  {
    label: 'This Weekend',
    getValue: () => addDays(new Date(), 6 - new Date().getDay()),
    getRange: () => ({
      from: addDays(new Date(), 6 - new Date().getDay()),
      to: addDays(new Date(), 7 - new Date().getDay())
    })
  },
  {
    label: 'Next Week',
    getValue: () => addDays(startOfWeek(new Date()), 7),
    getRange: () => ({
      from: addDays(startOfWeek(new Date()), 7),
      to: addDays(endOfWeek(new Date()), 7)
    })
  }
]

export function DatePicker({
  mode = 'single',
  value,
  placeholder = 'Select date...',
  showPresets = true,
  showTimeSlots = false,
  timeSlots = defaultTimeSlots,
  onDateChange,
  onTimeSlotChange,
  className
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | DateRange | undefined>(value)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const handleDateSelect = (date: Date | DateRange | undefined) => {
    setSelectedDate(date)
    onDateChange?.(date)
    if (mode === 'single' && !showTimeSlots) {
      setIsOpen(false)
    }
  }

  const handlePresetClick = (preset: typeof datePresets[0]) => {
    const newValue = mode === 'range' ? preset.getRange() : preset.getValue()
    setSelectedDate(newValue)
    onDateChange?.(newValue)
    if (!showTimeSlots) {
      setIsOpen(false)
    }
  }

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
    onTimeSlotChange?.(timeSlot)
    setIsOpen(false)
  }

  const formatSelectedDate = () => {
    if (!selectedDate) return placeholder

    if (mode === 'single' && selectedDate instanceof Date) {
      if (isToday(selectedDate)) return 'Today'
      if (isTomorrow(selectedDate)) return 'Tomorrow'
      return format(selectedDate, 'MMM dd, yyyy')
    }

    if (mode === 'range' && typeof selectedDate === 'object' && 'from' in selectedDate) {
      const { from, to } = selectedDate
      if (!from) return placeholder
      if (!to) return format(from, 'MMM dd, yyyy')
      
      if (from.getTime() === to.getTime()) {
        if (isToday(from)) return 'Today'
        if (isTomorrow(from)) return 'Tomorrow'
        return format(from, 'MMM dd, yyyy')
      }
      
      return `${format(from, 'MMM dd')} - ${format(to, 'MMM dd, yyyy')}`
    }

    return placeholder
  }

  const getSelectedPreset = () => {
    if (!selectedDate) return null

    return datePresets.find(preset => {
      if (mode === 'single' && selectedDate instanceof Date) {
        const presetDate = preset.getValue()
        return presetDate.toDateString() === selectedDate.toDateString()
      }
      
      if (mode === 'range' && typeof selectedDate === 'object' && 'from' in selectedDate) {
        const presetRange = preset.getRange()
        return presetRange.from.toDateString() === selectedDate.from?.toDateString() &&
               presetRange.to?.toDateString() === selectedDate.to?.toDateString()
      }
      
      return false
    })
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="flex-1">{formatSelectedDate()}</span>
            {selectedTimeSlot && (
              <Badge variant="secondary" className="ml-2">
                <Clock className="h-3 w-3 mr-1" />
                {selectedTimeSlot}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              {/* Quick Presets */}
              {showPresets && (
                <div className="p-4 border-b">
                  <h4 className="text-sm font-medium mb-3">Quick Select</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {datePresets.map((preset) => {
                      const isSelected = getSelectedPreset()?.label === preset.label
                      return (
                        <Button
                          key={preset.label}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePresetClick(preset)}
                          className="text-xs"
                        >
                          {preset.label}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Calendar */}
              <div className="p-4">
                {mode === 'single' ? (
                  <Calendar
                    mode="single"
                    selected={selectedDate as Date}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                ) : (
                  <Calendar
                    mode="range"
                    selected={selectedDate as DateRange}
                    onSelect={handleDateSelect}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    numberOfMonths={2}
                    initialFocus
                  />
                )}
              </div>

              {/* Time Slots */}
              {showTimeSlots && selectedDate && (
                <div className="p-4 border-t">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Available Times
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((timeSlot) => (
                      <Button
                        key={timeSlot}
                        variant={selectedTimeSlot === timeSlot ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleTimeSlotSelect(timeSlot)}
                        className="text-xs"
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="p-4 border-t flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedDate(undefined)
                    setSelectedTimeSlot('')
                    onDateChange?.(undefined)
                  }}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  disabled={!selectedDate}
                >
                  Done
                </Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>

      {/* Selected Date Summary */}
      {selectedDate && (
        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{formatSelectedDate()}</span>
            </div>
            {selectedTimeSlot && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{selectedTimeSlot}</span>
              </div>
            )}
          </div>
          
          {mode === 'range' && typeof selectedDate === 'object' && 'from' in selectedDate && selectedDate.to && (
            <div className="mt-2 text-xs text-muted-foreground">
              Duration: {Math.ceil((selectedDate.to.getTime() - selectedDate.from.getTime()) / (1000 * 60 * 60 * 24))} days
            </div>
          )}
        </div>
      )}
    </div>
  )
}