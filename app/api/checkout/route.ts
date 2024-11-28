import { NextResponse } from "next/server"
import { createCheckoutOrder } from "@/lib/tiendanube/checkout"
import { getProducts } from "@/lib/tiendanube/products"
import { redis } from "@/lib/redis"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate cart items against current product data
    const products = await getProducts()
    const cartItemsValid = await validateCartItems(body.items, products)
    
    if (!cartItemsValid) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid cart items" }),
        { status: 400 }
      )
    }

    // Create order in Tiendanube
    const order = await createCheckoutOrder({
      customer: {
        name: `${body.firstName} ${body.lastName}`,
        email: body.email,
        phone: body.phone,
      },
      shipping_address: {
        name: `${body.firstName} ${body.lastName}`,
        address: body.address,
        city: body.city,
        province: body.state,
        country: body.country,
        zipcode: body.postalCode,
        phone: body.phone,
      },
      products: body.items.map((item: any) => ({
        variant_id: parseInt(item.variantId),
        quantity: item.quantity,
      })),
    })

    // Clear cart from Redis
    await redis.del(`cart:${body.cartId}`)

    return new NextResponse(JSON.stringify({ orderId: order.id }), {
      status: 200,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return new NextResponse(
      JSON.stringify({ error: "Failed to process checkout" }),
      { status: 500 }
    )
  }
}

async function validateCartItems(cartItems: any[], products: any[]) {
  try {
    for (const item of cartItems) {
      const product = products.find(p => 
        p.variants.some(v => v.id === parseInt(item.variantId))
      )
      
      if (!product) {
        return false
      }

      const variant = product.variants.find(v => v.id === parseInt(item.variantId))
      
      if (!variant || variant.stock < item.quantity) {
        return false
      }
    }
    
    return true
  } catch (error) {
    console.error('Cart validation error:', error)
    return false
  }
}

