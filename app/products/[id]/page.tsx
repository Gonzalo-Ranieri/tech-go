import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Star } from 'lucide-react'
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ProductImageGallery } from "@/components/products/product-image-gallery"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { ProductTabs } from "@/components/products/product-tabs"
import { RelatedProducts } from "@/components/products/related-products"
import { getProduct } from "@/lib/tiendanube/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id).catch(() => null)

  if (!product) {
    notFound()
  }

  const variant = product.variants[0] // Get first variant
  const formattedProduct = {
    id: product.id.toString(),
    name: product.name.es,
    price: parseFloat(variant.price),
    description: product.description.es,
    images: product.images.map(img => img.src),
    specifications: {
      "SKU": variant.sku || "N/A",
      "Weight": `${variant.weight}g`,
      "Dimensions": `${variant.width}x${variant.height}x${variant.depth}cm`,
      "Stock": variant.stock.toString(),
      "Free Shipping": product.free_shipping ? "Yes" : "No"
    }
  }

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
            <ProductImageGallery images={formattedProduct.images} />

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{formattedProduct.name}</h1>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      (5.0)
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    ${formattedProduct.price.toFixed(2)}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">{formattedProduct.description}</p>

              <div className="space-y-4">
                {variant.stock > 0 ? (
                  <AddToCartButton product={formattedProduct} />
                ) : (
                  <Button className="w-full" disabled>
                    Out of Stock
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>

          <ProductTabs product={formattedProduct} />
          <RelatedProducts currentProductId={formattedProduct.id} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

