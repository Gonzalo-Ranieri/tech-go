"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductTabsProps {
  product: {
    description: string
    specifications: Record<string, string>
  }
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="mt-12">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none dark:prose-invert">
          <p>{product.description}</p>
        </div>
      </TabsContent>
      <TabsContent value="specifications" className="mt-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div
              key={key}
              className="rounded-lg border p-4"
            >
              <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <div className="text-center text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </div>
      </TabsContent>
    </Tabs>
  )
}

