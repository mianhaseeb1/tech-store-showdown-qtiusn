import { Address } from './address'

export type OrderItem = {
    id: string
    quantity: number
    unitPrice: number
    productId: string
    orderId: string
    product: {
        name: string
    }
}

export type Order = {
    id: string
    totalPrice: number
    createdAt: string
    updatedAt: string
    addressId: string
    userId: string
    orderItems: OrderItem[]
    address: Address
}

export type OrderPayload = {
    products: {
        productId: string
        quantity: number
    }[]
    shippingAddress: Address
}



