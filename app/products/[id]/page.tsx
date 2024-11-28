import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ProductImageGallery } from "@/components/products/product-image-gallery"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { ProductTabs } from "@/components/products/product-tabs"
import { RelatedProducts } from "@/components/products/related-products"

// This would typically come from your database or API
const product = {
  id: "1",
  name: "Wireless Earbuds Pro",
  price: 199.99,
  rating: 4.5,
  description: "Experience crystal-clear sound with our latest wireless earbuds. Featuring active noise cancellation, transparency mode, and up to 24 hours of battery life.",
  specifications: {
    "Battery Life": "Up to 24 hours",
    "Connectivity": "Bluetooth 5.2",
    "Water Resistance": "IPX4",
    "Noise Cancellation": "Active Noise Cancellation",
    "Charging": "USB-C & Wireless",
    "Weight": "5.4g per earbud"
  },
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ]
}

export default function ProductPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <ProductImageGallery images={product.images} />

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          index < Math.floor(product.rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>
                  <div className="text-2xl font-bold">${product.price}</div>
                </div>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="space-y-4">
                <AddToCartButton product={product} />
                <Button variant="outline" className="w-full">
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>

          <ProductTabs product={product} />
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

