import Image from "next/image"
import Link from "next/link"
import { Star } from 'lucide-react'

interface RelatedProductsProps {
  currentProductId: string
}

// This would typically come from your database or API
const relatedProducts = [
  {
    id: "2",
    name: "Bluetooth Speaker",
    price: 79.99,
    rating: 4.2,
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Fast Charger",
    price: 29.99,
    rating: 4.8,
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Phone Case",
    price: 19.99,
    rating: 4.0,
    image: "/placeholder.svg"
  }
]

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const filteredProducts = relatedProducts.filter(
    (product) => product.id !== currentProductId
  )

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group relative overflow-hidden rounded-lg border"
          >
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

