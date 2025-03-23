'use client'

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI Mental Health Chatbot',
    description:
      'Engage with our empathetic AI chatbot for immediate mental health support and guidance, anytime you need it.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Weekly Mood Assessment',
    description:
      'Track your mood with our weekly assessment test. Understand your emotional patterns and monitor progress over time.',
    icon: LockClosedIcon,
  },
  {
    name: 'Personalized Tips',
    description:
      'Receive tailored recommendations and practical tips based on your mood trends to help manage stress and boost well-being.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Secure & Confidential',
    description:
      'Your data is protected with state-of-the-art security measures, ensuring a safe and confidential experience.',
    icon: FingerPrintIcon,
  },
]

export default function FeaturesPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-indigo-600">Your Mental Wellness Toolkit</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Empower Your Mind and Body
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Our platform combines an AI mental health chatbot with a comprehensive weekly mood assessment to track your progress and provide personalized tips for a balanced life.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
