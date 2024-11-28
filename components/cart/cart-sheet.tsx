"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"

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

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open cart</span>
          <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground">
            2
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cart (2)</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-6">
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded">
                <Image
                  src="/placeholder.svg"
                  alt="Product 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">Wireless Earbuds</h3>
                <p className="text-sm text-muted-foreground">1 × $129.99</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  -
                </Button>
                <span className="w-4 text-center">1</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  +
                </Button>
              </div>
            </div>
            <Separator />
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded">
                <Image
                  src="/placeholder.svg"
                  alt="Product 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">Fast Charger</h3>
                <p className="text-sm text-muted-foreground">1 × $29.99</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  -
                </Button>
                <span className="w-4 text-center">1</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  +
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="space-y-4 pr-6">
          <Separator />
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>$159.98</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span>$159.98</span>
            </div>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
