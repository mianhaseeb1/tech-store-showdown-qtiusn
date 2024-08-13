import { OrderPayload } from '@/types'
import axios from '../axiosConfig'

export const getAllOrders = async () => {
    try {
        const response = await axios.get('/order')
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const createOrder = async (orderPayload: OrderPayload) => {
    try {
        const response = await axios.post('/order', orderPayload)
        localStorage.removeItem('cart')
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}
