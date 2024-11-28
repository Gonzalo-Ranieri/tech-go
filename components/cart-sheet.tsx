"use client"

import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/components/cart/cart-item"
import { useCart } from "@/lib/cart"

export function CartSheet() {
  // Prevent hydration errors
  const [isMounted, setIsMounted] = useState(false)
  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
          {cart.items.length > 0 && (
            <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {cart.items.length}
            </div>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cart ({cart.items.length})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-6">
          {cart.items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {cart.items.map((item) => (
                <div key={item.id}>
                  <CartItem
                    item={item}
                    onUpdateQuantity={cart.updateQuantity}
                    onRemove={cart.removeItem}
                  />
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {cart.items.length > 0 && (
          <div className="space-y-4 pr-6">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full" asChild>
              <a href="/checkout">Checkout</a>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

