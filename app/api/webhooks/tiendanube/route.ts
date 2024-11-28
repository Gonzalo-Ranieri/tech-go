import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { redis } from '@/lib/redis'
import { createHmac } from 'crypto'

export async function POST(req: Request) {
  try {
    const headersList = headers()
    const signature = headersList.get('x-tiendanube-signature')
    const event = headersList.get('x-tiendanube-event')

    if (!signature || !event) {
      return new NextResponse('Missing required headers', { status: 400 })
    }

    // Verify webhook signature
    const rawBody = await req.text()
    const expectedSignature = createHmac('sha256', process.env.TIENDANUBE_CLIENT_SECRET!)
      .update(rawBody)
      .digest('hex')

    if (signature !== expectedSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    const body = JSON.parse(rawBody)

    // Handle different webhook events
    switch (event) {
      case 'product/created':
      case 'product/updated':
      case 'product/deleted':
        await handleProductWebhook(event, body)
        break
      case 'order/created':
      case 'order/updated':
      case 'order/paid':
      case 'order/fulfilled':
      case 'order/cancelled':
        await handleOrderWebhook(event, body)
        break
      default:
        console.log(`Unhandled webhook event: ${event}`)
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

async function handleProductWebhook(event: string, body: any) {
  try {
    // Clear product caches
    await Promise.all([
      redis.del('tiendanube:products'),
      redis.del(`tiendanube:product:${body.id}`),
    ])
  } catch (error) {
    console.error('Redis error:', error)
    // Continue if Redis is unavailable
  }

  // Additional processing based on event type
  switch (event) {
    case 'product/created':
      // Handle product creation
      break
    case 'product/updated':
      // Handle product update
      break
    case 'product/deleted':
      // Handle product deletion
      break
  }
}

async function handleOrderWebhook(event: string, body: any) {
  try {
    // Clear order caches
    await Promise.all([
      redis.del('tiendanube:orders'),
      redis.del(`tiendanube:order:${body.id}`),
    ])
  } catch (error) {
    console.error('Redis error:', error)
    // Continue if Redis is unavailable
  }

  // Additional processing based on event type
  switch (event) {
    case 'order/created':
      // Handle order creation
      break
    case 'order/updated':
      // Handle order update
      break
    case 'order/paid':
      // Handle order payment
      break
    case 'order/fulfilled':
      // Handle order fulfillment
      break
    case 'order/cancelled':
      // Handle order cancellation
      break
  }
}

