import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const gridVariants = cva(
  "grid gap-4",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
        auto: "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8"
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch"
      }
    },
    defaultVariants: {
      cols: 3,
      gap: "md",
      align: "stretch"
    }
  }
)

interface GridProps extends VariantProps<typeof gridVariants> {
  children: React.ReactNode
  className?: string
}

export function Grid({ 
  children, 
  cols, 
  gap, 
  align, 
  className 
}: GridProps) {
  return (
    <div className={cn(gridVariants({ cols, gap, align }), className)}>
      {children}
    </div>
  )
}

// Grid Item component for more control
interface GridItemProps {
  children: React.ReactNode
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 'full'
  className?: string
}

export function GridItem({ children, span, className }: GridItemProps) {
  const spanClasses = {
    1: "col-span-1",
    2: "col-span-2", 
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    full: "col-span-full"
  }

  return (
    <div className={cn(span && spanClasses[span], className)}>
      {children}
    </div>
  )
}

// Masonry Grid for Pinterest-style layouts
interface MasonryGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4 | 5
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function MasonryGrid({ 
  children, 
  columns = 3, 
  gap = 'md',
  className 
}: MasonryGridProps) {
  const columnClasses = {
    2: "columns-1 md:columns-2",
    3: "columns-1 md:columns-2 lg:columns-3", 
    4: "columns-1 md:columns-2 lg:columns-3 xl:columns-4",
    5: "columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5"
  }

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4", 
    lg: "gap-6"
  }

  return (
    <div className={cn(
      columnClasses[columns],
      gapClasses[gap],
      "space-y-4",
      className
    )}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          {child}
        </div>
      ))}
    </div>
  )
}

// Responsive Container
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export function Container({ children, size = 'lg', className }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl", 
    xl: "max-w-7xl",
    full: "max-w-full"
  }

  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8",
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}

// Flex utilities
interface FlexProps {
  children: React.ReactNode
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Flex({ 
  children, 
  direction = 'row',
  align = 'center',
  justify = 'start',
  wrap = false,
  gap = 'md',
  className 
}: FlexProps) {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col"
  }

  const alignClasses = {
    start: "items-start",
    center: "items-center", 
    end: "items-end",
    stretch: "items-stretch"
  }

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end", 
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  }

  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6", 
    xl: "gap-8"
  }

  return (
    <div className={cn(
      "flex",
      directionClasses[direction],
      alignClasses[align],
      justifyClasses[justify],
      wrap && "flex-wrap",
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  )
}