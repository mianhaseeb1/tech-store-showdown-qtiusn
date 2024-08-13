import { Button } from '@/components/elements/Button'
import { Heading } from '@/components/elements/Heading'
import { Text, TextLink } from '@/components/elements/Text'

export default function NotFoundPage() {
    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-screen px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <Text className="text-base font-semibold text-indigo-600">404</Text>
                    <Heading className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</Heading>
                    <Text className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</Text>
                    <TextLink className="text-base leading-6 text-indigo-600" href="/">
                        <Button className="mt-6 cursor-pointer">Go back home</Button>
                    </TextLink>
                </div>
            </main>
        </>
    )
}
