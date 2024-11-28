import Image from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react'
import { getProducts } from "@/lib/tiendanube/products"
import { Button } from "@/components/ui/button"

export async function ProductGrid() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const variant = product.variants[0] // Get first variant for price
        const image = product.images[0] // Get first image

        return (
          <div key={product.id} className="group relative overflow-hidden rounded-lg border">
            <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
              <span className="sr-only">View {product.name.es}</span>
            </Link>
            <div className="aspect-square overflow-hidden">
              <Image
                src={image?.src || "/placeholder.svg"}
                alt={image?.alt || product.name.es}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{product.name.es}</h3>
              <div className="mt-1 flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  (5.0)
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold">
                ${parseFloat(variant.price).toFixed(2)}
              </p>
              {variant.stock > 0 ? (
                <Button className="mt-4 w-full" size="sm">
                  Add to Cart
                </Button>
              ) : (
                <Button className="mt-4 w-full" size="sm" disabled>
                  Out of Stock
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

