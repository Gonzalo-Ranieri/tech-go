import { cache } from 'react'
import { getTiendanubeClient } from './config'
import type { TiendanubeProduct } from './types'
import { redis } from '@/lib/redis'

const CACHE_TTL = 60 * 5 // 5 minutes

export const getProducts = cache(async () => {
  const cacheKey = 'tiendanube:products'
  const cachedProducts = await redis.get(cacheKey)

  if (cachedProducts) {
    return JSON.parse(cachedProducts) as TiendanubeProduct[]
  }

  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/products`, {
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  const products = await response.json() as TiendanubeProduct[]
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(products))

  return products
})

export const getProduct = cache(async (productId: string) => {
  const cacheKey = `tiendanube:product:${productId}`
  const cachedProduct = await redis.get(cacheKey)

  if (cachedProduct) {
    return JSON.parse(cachedProduct) as TiendanubeProduct
  }

  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/products/${productId}`, {
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }

  const product = await response.json() as TiendanubeProduct
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(product))

  return product
})

export async function createProduct(product: Partial<TiendanubeProduct>) {
  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/products`, {
    method: 'POST',
    headers: client.headers,
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.statusText}`)
  }

  const newProduct = await response.json() as TiendanubeProduct
  await redis.del('tiendanube:products')

  return newProduct
}

export async function updateProduct(productId: string, updates: Partial<TiendanubeProduct>) {
  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/products/${productId}`, {
    method: 'PUT',
    headers: client.headers,
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`)
  }

  const updatedProduct = await response.json() as TiendanubeProduct
  await Promise.all([
    redis.del('tiendanube:products'),
    redis.del(`tiendanube:product:${productId}`),
  ])

  return updatedProduct
}

export async function deleteProduct(productId: string) {
  const client = await getTiendanubeClient()
  const response = await fetch(`${client.baseUrl}/products/${productId}`, {
    method: 'DELETE',
    headers: client.headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.statusText}`)
  }

  await Promise.all([
    redis.del('tiendanube:products'),
    redis.del(`tiendanube:product:${productId}`),
  ])

  return true
}

