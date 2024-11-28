import { cache } from 'react'
import { getTiendanubeClient } from './config'
import type { TiendanubeOrder } from './types'
import { redis } from '@/lib/redis'

const CACHE_TTL = 60 * 5 // 5 minutes

export const getOrders = cache(async () => {
  try {
    const cacheKey = 'tiendanube:orders'
    const cachedOrders = await redis.get(cacheKey)

    if (cachedOrders) {
      return JSON.parse(cachedOrders) as TiendanubeOrder[]
    }
  } catch (error) {
    console.error('Redis error:', error)
    // Continue without cache if Redis is unavailable
  }

  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/orders`, {
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`)
  }

  const orders = await response.json() as TiendanubeOrder[]

  try {
    await redis.setex('tiendanube:orders', CACHE_TTL, JSON.stringify(orders))
  } catch (error) {
    console.error('Redis error:', error)
    // Continue without cache if Redis is unavailable
  }

  return orders
})

export const getOrder = cache(async (orderId: string) => {
  try {
    const cacheKey = `tiendanube:order:${orderId}`
    const cachedOrder = await redis.get(cacheKey)

    if (cachedOrder) {
      return JSON.parse(cachedOrder) as TiendanubeOrder
    }
  } catch (error) {
    console.error('Redis error:', error)
    // Continue without cache if Redis is unavailable
  }

  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/orders/${orderId}`, {
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.statusText}`)
  }

  const order = await response.json() as TiendanubeOrder

  try {
    await redis.setex(`tiendanube:order:${orderId}`, CACHE_TTL, JSON.stringify(order))
  } catch (error) {
    console.error('Redis error:', error)
    // Continue without cache if Redis is unavailable
  }

  return order
})

export async function createOrder(order: Partial<TiendanubeOrder>) {
  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/orders`, {
    method: 'POST',
    headers: client.headers,
    body: JSON.stringify(order),
  })

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`)
  }

  const newOrder = await response.json() as TiendanubeOrder

  try {
    await redis.del('tiendanube:orders')
  } catch (error) {
    console.error('Redis error:', error)
    // Continue if Redis is unavailable
  }

  return newOrder
}

export async function updateOrder(orderId: string, updates: Partial<TiendanubeOrder>) {
  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/orders/${orderId}`, {
    method: 'PUT',
    headers: client.headers,
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error(`Failed to update order: ${response.statusText}`)
  }

  const updatedOrder = await response.json() as TiendanubeOrder

  try {
    await Promise.all([
      redis.del('tiendanube:orders'),
      redis.del(`tiendanube:order:${orderId}`),
    ])
  } catch (error) {
    console.error('Redis error:', error)
    // Continue if Redis is unavailable
  }

  return updatedOrder
}

