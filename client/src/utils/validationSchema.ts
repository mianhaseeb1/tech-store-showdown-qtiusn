import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
})

export const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
})

export const createProductValidationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Product description is required'),
    price: Yup.number().min(0, 'Price must be greater than 0').required('Product price is required'),
    quantity: Yup.number().min(0, 'Quantity must be greater than 0').required('Product quantity is required'),
})

export const checkoutValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    phone: Yup.string().required('Phone number is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    addressLine2: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
})
