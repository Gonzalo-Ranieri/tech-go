"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCart } from "@/lib/cart"

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const cart = useCart()
  const { toast } = useToast()

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const addToCart = () => {
    // Add item to cart
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product)
    }

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    })

    // Reset quantity
    setQuantity(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={decreaseQuantity}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Decrease quantity</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="flex h-10 w-10 items-center justify-center text-center">
            {quantity}
          </span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Increase quantity</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button className="flex-1" onClick={addToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        Total: ${(product.price * quantity).toFixed(2)}
      </div>
    </div>
  )
}

