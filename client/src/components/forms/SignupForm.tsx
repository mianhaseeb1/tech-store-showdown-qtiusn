import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik'
import { Field as HeadlessField } from '@headlessui/react'
import toast from 'react-hot-toast'

import { Field as CustomField, Label } from '@/components/elements/Fieldset'
import { Input } from '@/components/elements/Input'
import { Button } from '@/components/elements/Button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/elements/Dialog'
import { Checkbox } from '@/components/elements/Checkbox'
import { Strong } from '@/components/elements/Text'
import { signupValidationSchema } from '@/utils/validationSchema'
import useAuth from '@/contexts/AuthContext'

function SignupForm() {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const initialValues = {
        name: '',
        email: '',
        password: '',
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={signupValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        const { name, email, password } = values
                        await signup(name, email, password)
                        toast.success('Signup successful')
                        navigate('/login')
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
                                <Label>Name</Label>
                                <FormikField as={Input} type="text" name="name" id="name" autoComplete="name" required />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </CustomField>
                        </div>

                        <div>
                            <CustomField>
                                <Label>Email Address</Label>
                                <FormikField as={Input} type="email" name="email" id="email" autoComplete="email" required />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </CustomField>
                        </div>

                        <div>
                            <CustomField>
                                <Label>Password</Label>
                                <FormikField as={Input} type="password" name="password" id="password" autoComplete="password" required />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </CustomField>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <HeadlessField className="flex items-center gap-4">
                                    <Checkbox name="terms_and_conditions" onClick={() => setIsOpen(true)} />
                                    <Label htmlFor="terms_and_conditions">I agree to the terms and conditions</Label>
                                </HeadlessField>
                                <Dialog open={isOpen} onClose={setIsOpen} size="xl">
                                    <DialogTitle>Terms and Conditions</DialogTitle>
                                    <DialogDescription>Please read and agree to the following terms and conditions to continue.</DialogDescription>
                                    <DialogBody className="text-sm/6 text-zinc-900 dark:text-white">
                                        <div className="">
                                            <p className="">By accessing and using our application, you are agreeing to these terms and conditions.</p>
                                            <h3 className="mt-6 font-bold">User Accounts</h3>
                                            <p className="mt-4">
                                                Users are required to create an account to use our services. All information provided during registration must be accurate and up-to-date. Users are
                                                responsible for maintaining the confidentiality of their account information.
                                            </p>
                                            <h3 className="mt-6 font-bold">User Conduct</h3>
                                            <p className="mt-4">
                                                Users agree to use our application in a lawful and respectful manner. Prohibited behaviors include, but are not limited to, harassment, abuse, and the
                                                distribution of illegal or inappropriate content.
                                            </p>
                                            <h3 className="mt-6 font-bold">Intellectual Property</h3>
                                            <p className="mt-4">
                                                All content on our application, including text, graphics, and software, is the property of our company or its licensors and is protected by intellectual
                                                property laws. Users may not use, reproduce, or distribute any content without prior written permission.
                                            </p>
                                            <h3 className="mt-6 font-bold">Limitation of Liability</h3>
                                            <p className="mt-4">
                                                Our company is not liable for any damages resulting from the use or inability to use the service. This includes, but is not limited to, damages for loss
                                                of profits, goodwill, or data.
                                            </p>
                                            <h3 className="mt-6 font-bold">Termination of Services</h3>
                                            <p className="mt-4">
                                                Our company reserves the right to terminate or suspend access to its services at any time, without notice or liability, for any reason, including a
                                                breach of these terms and conditions.
                                            </p>
                                            <h3 className="mt-6 font-bold">Changes to Terms</h3>
                                            <p className="mt-4">
                                                Our company may modify these terms and conditions at any time. Continued use of the service after any such changes constitutes acceptance of the new
                                                terms and conditions. Users are encouraged to review the terms periodically.
                                            </p>
                                            <h3 className="mt-6 font-bold">Governing Law</h3>
                                            <p className="mt-4">
                                                These terms and conditions are governed by the laws of the jurisdiction in which our company operates, without regard to its conflict of law principles.
                                            </p>
                                            <h3 className="mt-6 font-bold">Contact Information</h3>
                                            <p className="mt-4">
                                                For any questions or concerns regarding these terms and conditions, users can contact our support at <Strong>support@ourcompany.com</Strong>.
                                            </p>
                                        </div>
                                    </DialogBody>
                                    <DialogActions>
                                        <Button plain onClick={() => setIsOpen(false)}>
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                                Get Started
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SignupForm
