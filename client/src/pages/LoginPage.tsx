import { Heading } from '@/components/elements/Heading'
import { TextLink, Strong, Text } from '@/components/elements/Text'
import LoginForm from '@/components/forms/LoginForm'

export default function LoginPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 sm:py-32 lg:px-8 dark:bg-zinc-900 dark:lg:bg-zinc-950">
                <div className="w-full max-w-sm space-y-10">
                    <div>
                        <Heading className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</Heading>
                    </div>
                    <LoginForm />
                    <Text>
                        Not a member?{' '}
                        <TextLink href="/signup" className="no-underline">
                            <Strong>Sign up now</Strong>
                        </TextLink>
                    </Text>
                </div>
            </div>
        </>
    )
}
