import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Your One-Stop Tech Shop
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Discover the latest in electronics and accessories. From phones to speakers,
              we&apos;ve got everything you need.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Featured Products</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Check out our most popular items and latest arrivals
            </p>
          </div>

          <Carousel className="mx-auto max-w-5xl">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg"
                        alt={`Featured Product ${index + 1}`}
                        width={400}
                        height={400}
                        className="aspect-square object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">Featured Product {index + 1}</h3>
                      <p className="text-sm text-muted-foreground">$199.99</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Shop by Category</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Browse our wide selection of products by category
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {["Speakers", "Chargers", "iPhones", "Accessories"].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg border p-2 hover:border-primary"
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg"
                    alt={category}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{category}</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore our {category.toLowerCase()} collection
                  </p>
                  <ArrowRight className="mt-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

