import { Heading } from '@/components/elements/Heading'
import { Strong, Text, TextLink } from '@/components/elements/Text'
import SignupForm from '@/components/forms/SignupForm'

export default function SignupPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 sm:py-32 lg:px-8 dark:bg-zinc-900 dark:lg:bg-zinc-950">
                <div className="w-full max-w-sm space-y-10">
                    <div>
                        <Heading className="mt-6 text-center text-3xl font-extrabold text-gray-900">Get Started with your account</Heading>
                    </div>
                    <SignupForm />

                    <Text>
                        Not a member?{' '}
                        <TextLink href="/login" className="no-underline">
                            <Strong>Login now</Strong>
                        </TextLink>
                    </Text>
                </div>
            </div>
        </>
    )
}
