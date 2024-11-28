import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 129.99,
    rating: 4.5,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 79.99,
    rating: 4.2,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Fast Charger",
    price: 29.99,
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Phone Case",
    price: 19.99,
    rating: 4.0,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Power Bank",
    price: 49.99,
    rating: 4.6,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "USB Cable",
    price: 9.99,
    rating: 4.3,
    image: "/placeholder.svg",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="group relative overflow-hidden rounded-lg border">
          <Link href={`/products/${product.id}`} className="absolute inset-0 z-10">
            <span className="sr-only">View {product.name}</span>
          </Link>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <div className="mt-1 flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
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
            <p className="mt-2 text-lg font-semibold">${product.price}</p>
            <Button className="mt-4 w-full" size="sm">
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

