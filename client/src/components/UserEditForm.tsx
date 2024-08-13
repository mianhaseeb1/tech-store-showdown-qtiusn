import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik'

import { Button } from '@/components/elements/Button'
import { Divider } from '@/components/elements/Divider'
import { Subheading } from '@/components/elements/Heading'
import { Input } from '@/components/elements/Input'
import { Strong, Text } from '@/components/elements/Text'

import { User } from '@/types'

const UserEditForm = ({ user }: { user: User }) => {
    const initialValues = {
        name: user.name,
    }

    const userSubmitHandler = async () => {
        // TODO: Submit handler implementation
    }

    return (
        user && (
            <Formik initialValues={initialValues} onSubmit={userSubmitHandler}>
                {() => (
                    <Form method="post" className="mx-auto max-w-4xl">
                        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-1">
                                <Subheading>User Image</Subheading>
                                <Text>This image will be displayed on your profile.</Text>
                                <Text className="text-xs/6 text-zinc-500">
                                    <Strong>Existing Image: </Strong>
                                </Text>
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

                        <div className="my-10"></div>
                        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="space-y-1">
                                <Subheading>Email</Subheading>
                                <Text>This is your current email (Cannot be Modified).</Text>
                            </div>
                            <div>
                                <FormikField as={Input} value={user.email} disabled />
                            </div>
                        </section>

                        <div className="my-10"></div>
                        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="space-y-1">
                                <Subheading>Name</Subheading>
                                <Text>This will be displayed on your profile as Name.</Text>
                            </div>
                            <div>
                                <FormikField as={Input} aria-label="Name" name="name" autoComplete="true" disabled />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </section>

                        <Divider className="my-10" soft />
                        <div className="flex justify-end gap-4">
                            <Button className="cursor-pointer" type="reset" plain disabled>
                                Reset Changes
                            </Button>
                            <Button className="cursor-pointer" type="submit" disabled>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    )
}

export default UserEditForm
