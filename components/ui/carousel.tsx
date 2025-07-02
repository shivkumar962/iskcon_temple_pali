"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext<{
  currentIndex: number
  setCurrentIndex: (index: number) => void
  itemsLength: number
} | null>(null)

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    autoPlay?: boolean
    autoPlayInterval?: number
  }
>(({ className, children, autoPlay = false, autoPlayInterval = 5000, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [itemsLength, setItemsLength] = React.useState(0)

  React.useEffect(() => {
    if (autoPlay && itemsLength > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % itemsLength)
      }, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, itemsLength])

  return (
    <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, itemsLength }}>
      <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === CarouselContent) {
            setItemsLength(React.Children.count(child.props.children))
          }
          return child
        })}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("CarouselContent must be used within Carousel")

    return (
      <div
        ref={ref}
        className={cn("flex transition-transform duration-500 ease-in-out", className)}
        style={{ transform: `translateX(-${context.currentIndex * 100}%)` }}
        {...props}
      >
        {children}
      </div>
    )
  },
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("min-w-full", className)} {...props} />,
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("CarouselPrevious must be used within Carousel")

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90",
          className,
        )}
        onClick={() => {
          const newIndex = context.currentIndex === 0 ? context.itemsLength - 1 : context.currentIndex - 1
          context.setCurrentIndex(newIndex)
        }}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("CarouselNext must be used within Carousel")

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90",
          className,
        )}
        onClick={() => {
          const newIndex = (context.currentIndex + 1) % context.itemsLength
          context.setCurrentIndex(newIndex)
        }}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

const CarouselIndicators = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(CarouselContext)
    if (!context) throw new Error("CarouselIndicators must be used within Carousel")

    return (
      <div
        ref={ref}
        className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10", className)}
        {...props}
      >
        {Array.from({ length: context.itemsLength }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === context.currentIndex ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70",
            )}
            onClick={() => context.setCurrentIndex(index)}
          />
        ))}
      </div>
    )
  },
)
CarouselIndicators.displayName = "CarouselIndicators"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselIndicators }
