import Link from "next/link"
import { CheckCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container flex items-center justify-center py-32">
          <div className="text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="mt-6 text-3xl font-bold">Order Confirmed!</h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for your purchase. Your order has been received and will be
              processed shortly.
            </p>
            <div className="mt-8 space-x-4">
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/account/orders">View Orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

