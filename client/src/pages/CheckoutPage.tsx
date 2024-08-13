import { useNavigate } from 'react-router-dom'
import useOrder from '@/contexts/OrderContext'

import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react'

import { Input } from '@/components/elements/Input'
import { Button } from '@/components/elements/Button'
import useCart from '@/contexts/CartContext'
import { useEffect, useRef } from 'react'
import { checkoutValidationSchema } from '@/utils/validationSchema'
import toast from 'react-hot-toast'
import { Address } from '@/types'


export default function CheckoutPage() {

    const initialValues = { 
        email: '',
        name: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '' 
    }

    const navigate = useNavigate()
    const { cart, fetchCart } = useCart()
    const { placeOrder } = useOrder()
    const hasFetched = useRef(false)

    useEffect(() => {
        if (!hasFetched.current) {
            fetchCart()
            hasFetched.current = true
        }
    }, [fetchCart])

    return (
        <div className="bg-white">
            <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                <h1 className="sr-only">Order information</h1>

                <section aria-labelledby="summary-heading" className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16">
                    <div className="mx-auto max-w-lg lg:max-w-none">
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Subtotal</dt>
                                <dd>${cart.totalPrice}</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Shipping</dt>
                                <dd>$0.00</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt className="text-gray-600">Taxes</dt>
                                <dd>$0.00</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">${cart.totalPrice}</dd>
                            </div>
                        </dl>

                        <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                            <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                                <div className="mx-auto max-w-lg">
                                    <PopoverButton className="flex w-full items-center py-6 font-medium">
                                        <span className="mr-auto text-base">Total</span>
                                        <span className="mr-2 text-base">{cart.totalPrice}</span>
                                        <ChevronUpIcon aria-hidden="true" className="h-5 w-5 text-gray-500" />
                                    </PopoverButton>
                                </div>
                            </div>

                            <PopoverBackdrop transition className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

                            <PopoverPanel transition className="relative transform bg-white px-4 py-6 transition duration-300 ease-in-out data-[closed]:translate-y-full sm:px-6">
                                <dl className="mx-auto max-w-lg space-y-6">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd>${cart.totalPrice}</dd>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">Shipping</dt>
                                        <dd>$0.00</dd>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <dt className="text-gray-600">Taxes</dt>
                                        <dd>$0.00</dd>
                                    </div>
                                </dl>
                            </PopoverPanel>
                        </Popover>
                    </div>
                </section>

                <Formik
                    initialValues={initialValues}
                    validationSchema={checkoutValidationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const address: Address = {
                                addressLine1: values.addressLine1,
                                addressLine2: values.addressLine2,
                                city: values.city,
                                state: values.state,
                                postalCode: values.postalCode,
                                country: values.country
                            }
                            await placeOrder(address)
                            toast.success('Order placed successfully.')
                            navigate('/orders')
                        } catch (error: any) {
                            toast.error(error.response.data.message)
                        } finally {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({ isSubmitting }) => (

                        <Form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                        <div className="mx-auto max-w-lg lg:max-w-none">
                            <section aria-labelledby="contact-info-heading">
                                <h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                    Contact information
                                </h2>

                                <div className="mt-6">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <FormikField as={Input} id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"/>
                                    </div>
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <FormikField as={Input} id="name" name="name" type="name" autoComplete="name" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                    </div>
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <div className="mt-1">
                                        <FormikField as={Input} id="phone" name="phone" type="text" autoComplete="phone" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                    </div>
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </section>

                            <section aria-labelledby="shipping-heading" className="mt-10">
                                <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
                                    Shipping address
                                </h2>

                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <div className="mt-1">
                                            <FormikField as={Input} id="addressLine1" name="addressLine1" type="text" autoComplete="street-address" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                        </div>
                                        <ErrorMessage name="addressLine1" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                                            Apartment, suite, etc.
                                        </label>
                                        <div className="mt-1">
                                            <FormikField as={Input} id="addressLine2" name="addressLine2" type="text" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                        </div>
                                        <ErrorMessage name="addressLine2" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <div className="mt-1">
                                            <FormikField as={Input} id="city" name="city" type="text" autoComplete="address-level2" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                        </div>
                                        <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State / Province
                                        </label>
                                        <div className="mt-1">
                                            <FormikField as={Input} id="state" name="state" type="text" autoComplete="address-level1" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                        </div>
                                        <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                            Postal code
                                        </label>
                                        <div className="mt-1">
                                            <FormikField as={Input} id="postalCode" name="postalCode" type="text" autoComplete="postalCode" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                        </div>
                                        <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country
                                        </label>
                                        <div className="mt-1">
                                            <FormikField as={Input} id="country" name="country" type="text" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                                        </div>
                                        <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>
                            </section>

                            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                                <Button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
                                    disabled={isSubmitting}
                                >
                                    Place Order
                                </Button>
                                <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">Happy shopping from IT Store</p>
                            </div>
                        </div>
                        </Form>
                    )}
                </Formik>
            </main>
        </div>
    )
}
