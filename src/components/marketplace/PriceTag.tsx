import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const priceTagVariants = cva(
  "font-semibold inline-flex items-baseline gap-1",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        accent: "text-amber-600",
        success: "text-green-600",
        destructive: "text-red-600",
        muted: "text-muted-foreground"
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

interface PriceTagProps extends VariantProps<typeof priceTagVariants> {
  price: string
  originalPrice?: string
  currency?: string
  period?: string
  showDiscount?: boolean
  className?: string
}

export function PriceTag({
  price,
  originalPrice,
  currency = "$",
  period,
  showDiscount = false,
  variant,
  size,
  className
}: PriceTagProps) {
  const discountPercentage = originalPrice && showDiscount
    ? Math.round(((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100)
    : 0

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(priceTagVariants({ variant, size }))}>
        <span>{currency}</span>
        <span>{price}</span>
        {period && (
          <span className={cn(
            "text-muted-foreground font-normal",
            size === "sm" && "text-xs",
            size === "md" && "text-sm", 
            size === "lg" && "text-base"
          )}>
            /{period}
          </span>
        )}
      </div>
      
      {/* Original price (crossed out) */}
      {originalPrice && (
        <span className={cn(
          "line-through text-muted-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base"
        )}>
          {currency}{originalPrice}
        </span>
      )}
      
      {/* Discount badge */}
      {showDiscount && discountPercentage > 0 && (
        <Badge variant="destructive" className="text-xs">
          -{discountPercentage}%
        </Badge>
      )}
    </div>
  )
}