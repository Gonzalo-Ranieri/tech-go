import Image from "next/image"
import { Minus, Plus, Trash } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CartItem as CartItemType } from "@/lib/cart"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-16 w-16 overflow-hidden rounded">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">
          {item.quantity} × ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center rounded-lg border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Decrease quantity</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="w-8 text-center">{item.quantity}</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Increase quantity</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
                onClick={() => onRemove(item.id)}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove from cart</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

