import Link from "next/link"
import { Search, ShoppingCart, Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart/cart-sheet"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>
              <Link href="/products" className="text-lg">
                Products
              </Link>
              <Link href="/categories" className="text-lg">
                Categories
              </Link>
              <Link href="/about" className="text-lg">
                About
              </Link>
              <Link href="/contact" className="text-lg">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">TechGo</span>
        </Link>
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="/products" className="text-sm font-medium">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium">
            Categories
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium">
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden w-full max-w-xs md:flex">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full"
            />
            <Button variant="ghost" className="ml-2">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <CartSheet />
        </div>
      </div>
    </header>
  )
}

