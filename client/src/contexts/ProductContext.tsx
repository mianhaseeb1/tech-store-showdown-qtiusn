import { useState, useEffect, createContext, useContext, ReactNode } from 'react'

import { getProductById, createNewProduct, getAllProducts } from '@/api'
import { NewProduct, Product } from '@/types'

type ProductContext = {
    products: Product[]
    product: Product | null
    loading: boolean
    getProduct: (id: string) => void
    getProducts: () => void
    createProduct: (product: NewProduct) => void
}

export const ProductContext = createContext<ProductContext>({
    products: [],
    product: null,
    loading: false,
    getProduct: () => {},
    getProducts: () => {},
    createProduct: () => {},
})

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {}, [product])

    const getProduct = async (id: string) => {
        setLoading(true)
        const product = await getProductById(id)
        setProduct(product)
        setLoading(false)
    }

    const getProducts = async () => {
        setLoading(true)
        const products = await getAllProducts()
        setProducts(products)
        setLoading(false)
    }

    const createProduct = async (product: NewProduct) => {
        const productResponse = await createNewProduct(product)
        return productResponse.data
    }

    return <ProductContext.Provider value={{ products, product, loading, getProducts, getProduct, createProduct }}>{children}</ProductContext.Provider>
}

export default function useProduct() {
    return useContext(ProductContext)
}
