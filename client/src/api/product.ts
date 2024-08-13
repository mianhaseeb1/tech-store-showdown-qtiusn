import { NewProduct } from '@/types'
import axios from '../axiosConfig'

export const createNewProduct = async (product: NewProduct) => {
    try {
        const response = await axios.post('/product', product)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getAllProducts = async () => {
    try {
        const response = await axios.get('/product')
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export const getProductById = async (id: string) => {
    try {
        const response = await axios.get(`/product/${id}`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}
