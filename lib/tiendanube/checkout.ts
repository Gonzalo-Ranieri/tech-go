import { getTiendanubeClient } from './config'
import type { TiendanubeOrder } from './types'

export interface CreateOrderInput {
  customer: {
    name: string
    email: string
    phone: string
  }
  shipping_address: {
    name: string
    address: string
    city: string
    province: string
    country: string
    zipcode: string
    phone: string
  }
  products: Array<{
    variant_id: number
    quantity: number
  }>
}

export async function createCheckoutOrder(input: CreateOrderInput) {
  const client = await getTiendanubeClient()
  
  // Format the order data according to Tiendanube's API requirements
  const orderData = {
    customer: {
      name: input.customer.name,
      email: input.customer.email,
      phone: input.customer.phone
    },
    shipping_address: {
      ...input.shipping_address,
      floor: null,
      number: "",
      locality: input.shipping_address.city
    },
    products: input.products,
    payment_method_id: "custom", // You would typically get this from your payment integration
    shipping_option_id: "custom", // You would typically get this from available shipping options
  }

  const response = await fetch(`${client.baseUrl}/orders`, {
    method: 'POST',
    headers: client.headers,
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to create order: ${error.message}`)
  }

  const order = await response.json() as TiendanubeOrder
  return order
}

export async function getShippingOptions(address: {
  zipcode: string
  country: string
}) {
  const client = await getTiendanubeClient()
  
  const response = await fetch(
    `${client.baseUrl}/shipping_options?zipcode=${address.zipcode}&country=${address.country}`,
    {
      headers: client.headers,
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch shipping options: ${response.statusText}`)
  }

  return response.json()
}

export async function getPaymentMethods() {
  const client = await getTiendanubeClient()
  
  const response = await fetch(`${client.baseUrl}/payment_methods`, {
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch payment methods: ${response.statusText}`)
  }

  return response.json()
}

