import { headers } from 'next/headers'

export const TIENDANUBE_API_URL = 'https://api.tiendanube.com/v1'

export async function getTiendanubeClient() {
  const headersList = headers()
  const storeId = headersList.get('x-store-id')
  const accessToken = process.env.TIENDANUBE_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error('Tiendanube access token not configured')
  }

  if (!storeId) {
    throw new Error('Store ID not found in request headers')
  }

  return {
    baseUrl: `${TIENDANUBE_API_URL}/${storeId}`,
    headers: {
      'Authentication': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'TechGo/1.0'
    }
  }
}

