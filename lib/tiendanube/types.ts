export interface TiendanubeProduct {
  id: number
  name: {
    es: string
    [key: string]: string
  }
  description: {
    es: string
    [key: string]: string
  }
  handle: string
  variants: TiendanubeVariant[]
  images: TiendanubeImage[]
  categories: TiendanubeCategory[]
  published: boolean
  free_shipping: boolean
  created_at: string
  updated_at: string
}

export interface TiendanubeVariant {
  id: number
  product_id: number
  price: string
  compare_at_price: string | null
  sku: string | null
  stock: number
  weight: string
  width: string
  height: string
  depth: string
  created_at: string
  updated_at: string
}

export interface TiendanubeImage {
  id: number
  product_id: number
  src: string
  position: number
  alt: string | null
  created_at: string
  updated_at: string
}

export interface TiendanubeCategory {
  id: number
  name: {
    es: string
    [key: string]: string
  }
  handle: string
  parent: number | null
  subcategories: TiendanubeCategory[]
}

export interface TiendanubeOrder {
  id: number
  number: number
  status: string
  payment_status: string
  shipping_status: string
  created_at: string
  updated_at: string
  completed_at: string | null
  customer: TiendanubeCustomer
  products: TiendanubeOrderProduct[]
  shipping_address: TiendanubeAddress
  billing_address: TiendanubeAddress
  payment_details: TiendanubePaymentDetails
  shipping_option: TiendanubeShippingOption
  total: string
  subtotal: string
  total_discount: string
}

export interface TiendanubeCustomer {
  id: number
  name: string
  email: string
  phone: string
  identification: string
  note: string | null
  created_at: string
  updated_at: string
}

export interface TiendanubeOrderProduct {
  id: number
  product_id: number
  variant_id: number
  name: string
  price: string
  quantity: number
  weight: string
  width: string
  height: string
  depth: string
}

export interface TiendanubeAddress {
  name: string
  address: string
  number: string
  floor: string | null
  locality: string
  city: string
  province: string
  country: string
  zipcode: string
  phone: string
}

export interface TiendanubePaymentDetails {
  method: string
  credit_card_company: string | null
  installments: number
}

export interface TiendanubeShippingOption {
  name: string
  price: string
  estimated_days: number | null
}

