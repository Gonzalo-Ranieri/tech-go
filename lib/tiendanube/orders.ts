import { cache } from 'react'
import { getTiendanubeClient } from './config'
import type { TiendanubeOrder } from './types'
import { redis } from '@/lib/redis'

const CACHE_TTL = 60 * 5 // 5 minutes

export const getOrders = cache(async () => {
  const cacheKey = 'tiendanube:orders'
  const cachedOrders = await redis.get(cacheKey)

  if (cachedOrders) {
    return JSON.parse(cachedOrders) as TiendanubeOrder[]
  }

  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/orders`, {
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`)
  }

  const orders = await response.json() as TiendanubeOrder[]
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(orders))

  return orders
})

export const getOrder = cache(async (orderId: string) => {
  const cacheKey = `tiendanube:order:${orderId}`
  const cachedOrder = await redis.get(cacheKey)

  if (cachedOrder) {
    return JSON.parse(cachedOrder) as TiendanubeOrder
  }

  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/orders/${orderId}`, {
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.statusText}`)
  }

  const order = await response.json() as TiendanubeOrder
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(order))

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
  await redis.del('tiendanube:orders')

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
  await Promise.all([
    redis.del('tiendanube:orders'),
    redis.del(`tiendanube:order:${orderId}`),
  ])

  return updatedOrder
}

