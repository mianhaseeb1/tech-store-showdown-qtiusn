import { useEffect, useRef } from 'react'
import useOrder from '@/contexts/OrderContext'

function OrdersPage() {
    const { orders, getOrders } = useOrder()

    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current) {
            getOrders()
            hasFetched.current = true
        }
    }, [getOrders])

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:pb-24">
                <div className="max-w-xl">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                    <p className="mt-2 text-sm text-gray-500">Check the status of recent orders, manage returns, and download invoices.</p>
                </div>

                <div className="mt-16">
                    <h2 className="sr-only">Recent orders</h2>

                    <div className="space-y-20">
                        {orders.map((order) => (
                            <div key={order.id}>
                                <h3 className="sr-only">
                                    Order placed on <time dateTime={order.createdAt}>{order.createdAt}</time>
                                </h3>

                                <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                    <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0">
                                        <div className="flex justify-between sm:block">
                                            <dt className="font-medium text-gray-900">Date placed</dt>
                                            <dd className="sm:mt-1">
                                                <time dateTime={order.createdAt}>{order.createdAt}</time>
                                            </dd>
                                        </div>
                                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                            <dt className="font-medium text-gray-900">Order ID</dt>
                                            <dd className="sm:mt-1">{order.id}</dd>
                                        </div>
                                        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                            <dt>Total amount</dt>
                                            <dd className="sm:mt-1">${order.totalPrice}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                    <caption className="sr-only">Products</caption>
                                    <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                        <tr>
                                            <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                                Product
                                            </th>
                                            <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                                Price
                                            </th>
                                            <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                Status
                                            </th>
                                            <th scope="col" className="w-0 py-3 text-right font-normal">
                                                Cost
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                        {order.orderItems.map((orderItem) => (
                                            <tr key={orderItem.id}>
                                                <td className="py-6 pr-8">
                                                    <div className="flex items-center">
                                                        <img
                                                            src="https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg"
                                                            className="mr-6 h-16 w-16 rounded object-cover object-center"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{orderItem.product.name}</div>
                                                            <div className="mt-1 sm:hidden">{orderItem.unitPrice}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">${orderItem.unitPrice}</td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">{orderItem.quantity}</td>
                                                <td className="whitespace-nowrap py-6 text-right font-medium">${orderItem.quantity * orderItem.unitPrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage
