import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/elements/Button'
import { Input } from '@/components/elements/Input'
import { DialogForm } from '@/components/forms/DialogForm'
import useProduct from '@/contexts/ProductContext'
import { Product } from '@/types'
import { ShoppingCartIcon } from '@heroicons/react/16/solid'

import useCart from '@/contexts/CartContext'

export type CurrentProductType = Product & { selectedQuantity: number }

export default function HomePage() {
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<CurrentProductType | null>(null)
    
    const { products, getProducts } = useProduct()
    const { addCart } = useCart()
    
    const hasFetched = useRef(false)

    const handleAddToCartClick = (product: Product) => {
        setCurrentProduct({ ...product, selectedQuantity: 1 })
        setDialogOpen(true)
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuantity = parseInt(e.target.value)
        setCurrentProduct((prev) => ({ ...prev!, selectedQuantity: updatedQuantity }))
    }

    const handleConfirmAddToCart = async () => {
        setIsAdding(true)
        try {
            if (currentProduct) {
                addCart(currentProduct)
                setDialogOpen(false)
                toast.success(`${currentProduct.name} added to cart`);
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            setIsAdding(false)
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            getProducts()
            hasFetched.current = true
        }
    }, [getProducts])

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
                                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                    <img src="https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg" className="h-full w-full object-cover object-center sm:h-full sm:w-full" />
                                </div>
                                <div className="flex flex-1 flex-col space-y-2 p-4">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        <a>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="text-sm text-gray-500">{product.description}</p>
                                    <div className="flex flex-1 flex-col justify-end">
                                        <p className="text-base font-medium text-gray-900">${product.price}</p>
                                    </div>
                                    
                                    <Button onClick={() => handleAddToCartClick(product)} className="w-full cursor-pointer">
                                        <ShoppingCartIcon className="w-4 h-4" /> Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {currentProduct && (
                <DialogForm
                    isOpen={isDialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title={`Add ${currentProduct.name} to Cart`}
                    description={`Enter quantity for ${currentProduct.name} (Available: ${currentProduct.quantity})`}
                    onConfirm={handleConfirmAddToCart}
                    confirmText="Add to Cart"
                    confirmDisabled={currentProduct.quantity < 1}
                    isAdding={isAdding}
                    cancelText={isAdding ? 'Cancel' : 'Close'}
                >
                    <Input type="number" value={currentProduct.selectedQuantity} onChange={handleQuantityChange} min="1" max={currentProduct.quantity} required />
                </DialogForm>
            )}
        </>
    )
}
