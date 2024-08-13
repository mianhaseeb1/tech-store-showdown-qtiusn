import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

import { addToCart, removeFromCart, getCart } from '@/api/index'
import { CurrentProductType } from '@/pages/HomePage'
import { CartType } from '@/types/cart'

type CartContext = {
    cart: CartType
    loading: boolean
    addCart: (currentProduct: CurrentProductType) => void
    removeCart: (productId: string) => void
    fetchCart: () => void
}

export const CartContext = createContext<CartContext>({
    cart: { items: [], totalPrice: 0 },
    loading: false,
    addCart: () => {},
    removeCart: () => {},
    fetchCart: () => {},
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartType>({ items: [], totalPrice: 0 })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
    }, [cart])

    const addCart = async (currentProduct: CurrentProductType) => {
        const cart = await addToCart(currentProduct.id, currentProduct.selectedQuantity, currentProduct)
        setCart(cart)
    }

    const removeCart = async (productId: string) => {
        const cart = await removeFromCart(productId)
        setCart(cart)
    }

    const fetchCart = async () => {
        setLoading(true)
        const cart = await getCart()
        setCart(cart)
        setLoading(false)
    }

    return <CartContext.Provider value={{ cart, loading, fetchCart, addCart, removeCart }}>{children}</CartContext.Provider>
}

export default function useCart() {
    return useContext(CartContext)
}
