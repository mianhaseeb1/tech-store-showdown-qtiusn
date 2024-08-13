import { useState, createContext, useContext, ReactNode } from 'react'

import { getAllOrders, createOrder } from '@/api'
import { Address, Order } from '@/types'

type OrderContextType = {
    orders: Order[]
    loading: boolean
    getOrders: () => void
    placeOrder: (shippingAddress: Address) => void
}

export const OrderContext = createContext<OrderContextType>({
    orders: [],
    loading: false,
    getOrders: () => {},
    placeOrder: () => {},
})

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const getOrders = async () => {
        setLoading(true)
        const orders = await getAllOrders()
        setOrders(orders)
        setLoading(false)
    }

    const placeOrder = async (shippingAddress: Address) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "totalPrice": 0}')
        const products = cart.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
        }))
        const orderPayload = { products, shippingAddress }
        const order = await createOrder(orderPayload)
        return order

    }

    return <OrderContext.Provider value={{ loading, orders, getOrders, placeOrder }}>{children}</OrderContext.Provider>
}

export default function useOrder() {
    return useContext(OrderContext)
}
