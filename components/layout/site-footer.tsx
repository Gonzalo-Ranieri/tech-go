import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container grid gap-8 px-4 py-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold">About Us</h3>
          <p className="text-sm text-muted-foreground">
            TechGo is your one-stop shop for all electronics and accessories.
            We offer the latest technology at competitive prices.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products">All Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shipping">Shipping Information</Link>
            </li>
            <li>
              <Link href="/returns">Returns Policy</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Connect With Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and exclusive offers!
            </p>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 TechGo. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

