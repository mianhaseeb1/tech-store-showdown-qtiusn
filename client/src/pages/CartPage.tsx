import { Button } from '@/components/elements/Button'
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import useCart from '@/contexts/CartContext'
import { useEffect, useRef } from 'react'
import { useNavigate} from 'react-router-dom'


export default function CartPage() {

    const { cart, removeCart, fetchCart } = useCart()
    const hasFetched = useRef(false)
    const navigate = useNavigate()


    useEffect(() => {
        if (!hasFetched.current) {
            fetchCart()
            hasFetched.current = true
        }
    }, [fetchCart])

    console.log(cart)

    const removeCartHandler = (productId: string) => {
        removeCart(productId)
    }

    const handleCheckout = () => {
        navigate('/checkout')
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {cart.totalPrice && cart.items.map((item) => (
                                <li key={item.productId} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg" className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48" />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a className="font-medium text-gray-700 hover:text-gray-800">
                                                            {item.name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-gray-900">{item.price}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <label htmlFor={`quantity-${item.productId}`} className="sr-only">
                                                    Quantity, {item.name}
                                                </label>
                                                <select
                                                    id={`quantity-${item.productId}`}
                                                    name={`quantity-${item.productId}`}
                                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                    disabled={true}
                                                    value={item.quantity}
                                                >
                                                    <option value={item.quantity}>{item.quantity}</option>
                                                </select>
                                                <div className="absolute right-0 top-0">
                                                    <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500" onClick={() => removeCartHandler(item.productId)}>
                                                        <span className="sr-only">Remove</span>
                                                        <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">${cart.totalPrice}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon aria-hidden="true" className="h-5 w-5" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon aria-hidden="true" className="h-5 w-5" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">${cart.totalPrice}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Button 
                                className="w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </Button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
