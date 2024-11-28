"use client"

import Image from "next/image"
import { useCart } from "@/lib/cart"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export function OrderSummary() {
  const cart = useCart()

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4 py-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator className="my-4" />
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="text-sm">Subtotal</span>
          <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Shipping</span>
          <span className="font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Tax</span>
          <span className="font-medium">
            ${(cart.subtotal * 0.1).toFixed(2)}
          </span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${(cart.subtotal * 1.1).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

