// components/Header.tsx
import Link from "next/link"
import { FlagIcon } from "@/components/ui/icons/system"

type HeaderContent = {
  title: string
  description: string
  homepageUrl: string
}

const content: HeaderContent = {
  title: "Affiliate Program",
  description: "Earn money by referring customers to Vercel. We provide the platform, you provide the referrals.",
  homepageUrl: "#",
}

export function Header() {
  return (
    <header className="w-full py-6">
      <div className="container flex flex-col items-center gap-2 px-4 md:px-6">
        <div className="flex items-center space-x-3">
          <Link className="flex items-center" href={content.homepageUrl}>
            <FlagIcon className="w-6 h-6 text-gray-500" />
            <span className="sr-only">Go to Homepage</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl">{content.title}</h1>
        </div>
        <p className="max-w-3xl text-center text-gray-500 md:text-base/relaxed dark:text-gray-400">
          {content.description}
        </p>
      </div>
    </header>
  )
}