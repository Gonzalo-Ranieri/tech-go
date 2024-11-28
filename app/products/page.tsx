import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <ProductFilters />
            <ProductGrid />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

