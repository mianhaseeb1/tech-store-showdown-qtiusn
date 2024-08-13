import { Heading } from '@/components/elements/Heading'
import { Strong, Text, TextLink } from '@/components/elements/Text'

function PrivacyPolicyPage() {
    return (
        <section className="p-6">
            <Heading className="text-2xl font-semibold mb-4">Introduction</Heading>
            <Text>
                Welcome to our website. This privacy policy explains how we collect, use, and protect your personal information when you use our website and services. By using our website, you agree
                to the terms outlined in this policy.
            </Text>

            <Heading className="text-2xl font-semibold mt-6 mb-4">Information We Collect</Heading>
            <ul className="list-disc pl-5 dark:text-gray-300">
                <li>
                    <Text>
                        <Strong>Personal Information:</Strong> Name, email address, contact details, and any other information you provide when registering or using our services.
                    </Text>
                </li>
                <li>
                    <Text>
                        <Strong>Usage Data:</Strong> Information about how you interact with our website, such as IP addresses, browser types, operating systems, referring URLs, and pages visited.
                    </Text>
                </li>
                <li>
                    <Text>
                        <Strong>Cookies and Tracking Technologies:</Strong> We use cookies and similar tracking technologies to monitor user activity and enhance your experience.
                    </Text>
                </li>
            </ul>

            <Heading className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</Heading>
            <Text>We use the collected information for the following purposes:</Text>
            <ul className="list-disc pl-5 dark:text-gray-300">
                <li>
                    <Text>
                        <Strong>Service Delivery:</Strong> To provide, operate, and maintain our website and services.
                    </Text>
                </li>
                <li>
                    <Text>
                        <Strong>Improvement and Personalization:</Strong> To improve our services, personalize your experience, and understand how users interact with our platform.
                    </Text>
                </li>
                <li>
                    <Text>
                        <Strong>Communication:</Strong> To communicate with you, including sending updates, security alerts, and support messages.
                    </Text>
                </li>
                <li>
                    <Text>
                        <Strong>Compliance and Security:</Strong> To comply with legal obligations and protect the rights and safety of our users and the public.
                    </Text>
                </li>
            </ul>

            <Heading className="text-2xl font-semibold mt-6 mb-4">Sharing Your Information</Heading>
            <Text>We do not sell or trade your personal information. However, we may share your data in the following circumstances:</Text>
            <ul className="list-disc pl-5 dark:text-gray-300">
                <li>
                    <Text>
                        <Strong>With Your Consent:</Strong> When you provide consent for us to share your information.
                    </Text>
                </li>
                <li>
                    <Text>
                        <Strong>Service Providers:</Strong> With third-party vendors and service providers who perform services on our behalf, such as payment processing and hosting.
                    </Text>
                </li>
                <li>
                    <Text>
                        <Strong>Legal Requirements:</Strong> When required by law or in response to valid requests by public authorities.
                    </Text>
                </li>
            </ul>

            <Heading className="text-2xl font-semibold mt-6 mb-4">Data Security</Heading>
            <Text>
                We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure. However, no internet-based service can be
                completely secure, and we cannot guarantee the absolute security of your data.
            </Text>

            <Heading className="text-2xl font-semibold mt-6 mb-4">Your Rights</Heading>
            <Text>
                You have the right to access, correct, or delete your personal information. You can also object to or restrict the processing of your data. To exercise these rights, please contact us
                at the provided contact details.
            </Text>

            <Heading className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</Heading>
            <Text>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website. Your continued use of our services after the changes
                take effect constitutes your acceptance of the updated policy.
            </Text>

            <Heading className="text-2xl font-semibold mt-6 mb-4">Contact Us</Heading>
            <Text>If you have any questions or concerns about this privacy policy or our data practices, please contact us at:</Text>
            <address className="not-italic">
                <Text>
                    <Strong>Email:</Strong> <TextLink href="mailto:your-email@example.com">your-email@example.com</TextLink>
                </Text>
                <Text>
                    <Strong>Address:</Strong> Your Company Address
                </Text>
            </address>
        </section>
    )
}

export default PrivacyPolicyPage
