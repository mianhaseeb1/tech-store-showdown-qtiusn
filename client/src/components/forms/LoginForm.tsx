import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik'
import { Field as HeadlessField } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Field as CustomField, Label } from '@/components/elements/Fieldset'
import { Input } from '@/components/elements/Input'
import { Button } from '@/components/elements/Button'
import { Switch } from '@/components/elements/Switch'

import useAuth from '../../contexts/AuthContext'
import { loginValidationSchema } from '@/utils/validationSchema'

export default function LoginForm() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const initialValues = { email: '', password: '' }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    await login(values.email, values.password)
                    toast.success('Login successful')
                    navigate('/')
                } catch (error: any) {
                    toast.error(error.response.data.message)
                } finally {
                    setSubmitting(false)
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-6">
                    <div>
                        <CustomField>
                            <Label htmlFor="email">Email Address</Label>
                            <FormikField as={Input} type="email" name="email" id="email" autoComplete="email" required />
                        </CustomField>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                        <CustomField>
                            <Label htmlFor="password">Password</Label>
                            <FormikField as={Input} type="password" name="password" id="password" autoComplete="current-password" required />
                        </CustomField>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <HeadlessField className="flex items-center gap-4">
                                <Switch name="allow_embedding" />
                                <Label>Remember Password</Label>
                            </HeadlessField>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                            Sign in
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
