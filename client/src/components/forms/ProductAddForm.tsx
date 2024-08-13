import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik'
import toast from 'react-hot-toast'

import { Divider } from '@/components/elements/Divider'
import { Subheading } from '@/components/elements/Heading'
import { Input } from '@/components/elements/Input'
import { Text } from '@/components/elements/Text'
import { Textarea } from '@/components/elements/Textarea'

import useProduct from '@/contexts/ProductContext'
import { createProductValidationSchema } from '@/utils/validationSchema'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/elements/Button'
import { NewProduct } from '@/types'

const ProductAddForm = () => {
    const navigate = useNavigate()

    const { createProduct } = useProduct()

    const initialValues: NewProduct = {
        name: '',
        price: 0,
        description: '',
        quantity: 0,
    }

    const productSubmitHandler = async (values: NewProduct, { setSubmitting }: { setSubmitting: any }) => {
        try {
            toast('Creating product...', { icon: '🛠️' })
            await createProduct(values)
            toast.success('Product created successfully')
            setSubmitting(false)
            navigate('/')
        } catch (error: any) {
            console.error(error)
            toast.error(error.response.data.message)
            setSubmitting(false)
        }
    }

    const resetFormHandler = (resetForm: any) => {
        resetForm()
    }

    return (
        <Formik initialValues={initialValues} validationSchema={createProductValidationSchema} onSubmit={productSubmitHandler}>
            {({ isSubmitting, resetForm }) => (
                <Form method="post" className="mx-auto max-w-4xl">
                    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="flex flex-col justify-center space-y-1">
                            <Subheading>Product Image</Subheading>
                            <Text>This image will be displayed on your product listing.</Text>
                        </div>
                        <div>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <FormikField id="dropzone-file" type="file" value={undefined} name="image_url" className="hidden" accept=".svg,.png,.jpg,.gif" />
                                </label>
                            </div>
                        </div>
                    </section>

                    <Divider className="my-10 mt-6" />
                    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Subheading>Product Name</Subheading>
                            <Text>This will be displayed on your product listing as Name.</Text>
                        </div>
                        <div>
                            <FormikField as={Input} aria-label="Product Name" name="name" autoComplete="true" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </section>

                    <div className="my-10"></div>
                    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Subheading>Product Description</Subheading>
                            <Text>This will be displayed on your public profile. Maximum 240 characters.</Text>
                        </div>
                        <div>
                            <FormikField as={Textarea} id="description" name="description" rows="3" />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </section>

                    <div className="my-10"></div>
                    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Subheading>Product Price</Subheading>
                            <Text>This will be displayed on your product listing as Price.</Text>
                        </div>
                        <div>
                            <FormikField as={Input} aria-label="Product Price" name="price" type="number" />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </section>

                    <div className="my-10"></div>
                    <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Subheading>Product Quantity</Subheading>
                            <Text>This will be displayed on your product listing as Quantity.</Text>
                        </div>
                        <div>
                            <FormikField as={Input} aria-label="Product Quantity" name="quantity" type="number" />
                            <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </section>

                    <Divider className="my-10" soft />
                    <div className="flex justify-end gap-4">
                        <Button
                            className="cursor-pointer"
                            onClick={() => {
                                resetFormHandler(resetForm)
                            }}
                            type="reset"
                            plain
                        >
                            Reset Changes
                        </Button>
                        <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
                            Add Product
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ProductAddForm
