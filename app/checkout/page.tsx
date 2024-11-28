import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderSummary } from "@/components/checkout/order-summary"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <CheckoutForm />
            <OrderSummary />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

