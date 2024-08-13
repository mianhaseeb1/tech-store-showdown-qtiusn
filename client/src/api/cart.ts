import { CurrentProductType } from "@/pages/HomePage"

export const addToCart = async (productId: string, quantity: number, currentProduct: CurrentProductType) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "totalPrice": 0}')

    const existingProduct = cart.items.find((item: any) => item.productId === productId)

    if (existingProduct) {
        existingProduct.quantity += quantity
    } else {
        cart.items.push({ productId, quantity, name: currentProduct.name, price: currentProduct.price})
    }

    cart.totalPrice = cart.items.reduce((total: number, item: any) => {
        return total + (item.price * item.quantity)
    }, 0)

    localStorage.setItem('cart', JSON.stringify(cart))
    return cart
}

export const removeFromCart = async (productId: string) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{"items": [], "totalPrice": 0}')

    const updatedCart = {
        items: cart.items.filter((item: any) => item.productId !== productId),
        totalPrice: cart.totalPrice
    }

    updatedCart.totalPrice = updatedCart.items.reduce((total: number, item: any) => {
        return total + (item.price * item.quantity)
    }, 0)

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    return updatedCart
}

export const getCart = async () => {
    return JSON.parse(localStorage.getItem('cart') || '{"items": [], "totalPrice": 0}')
}
