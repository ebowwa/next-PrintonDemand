/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HR9GLDvEUcB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Component() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <CloudLightningIcon className="w-6 h-6 text-yellow-400" />
          <span className="text-lg font-semibold">ShipFast</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="#" className="hover:text-gray-400" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="hover:text-gray-400" prefetch={false}>
            Demo
          </Link>
          <Link href="#" className="hover:text-gray-400" prefetch={false}>
            Wall of love
          </Link>
          <Link href="#" className="hover:text-gray-400" prefetch={false}>
            Leaderboard
          </Link>
        </nav>
        <Button variant="outline" className="text-white border-white">
          Press <span className="ml-1 font-bold">A</span> to see Apps made with ShipFast
        </Button>
      </header>
      <main className="flex flex-col items-center justify-center p-8 md:flex-row md:justify-between md:px-16">
        <div className="max-w-lg space-y-6">
          <div className="flex items-center space-x-2">
            <AwardIcon className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Product of the day</span>
            <span className="text-2xl font-bold">2nd</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Ship your startup in days, <span className="text-yellow-400">not weeks</span>
          </h1>
          <p className="text-gray-400">
            The NextJS boilerplate with all you need to build your SaaS, AI tool, or any other web app and make your
            first $ online fast.
          </p>
          <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <Button className="bg-yellow-400 text-black">Get ShipFast</Button>
            <span className="flex items-center text-green-400">
              <GiftIcon className="w-6 h-6" />
              <span className="ml-2">$100 off for the first 3850 customers (10 left)</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U4</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U5</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center space-x-2">
              <StarIcon className="w-6 h-6 text-yellow-400" />
              <span className="font-bold">3840</span>
              <span className="text-gray-400">makers ship faster</span>
            </div>
          </div>
        </div>
        <div className="relative mt-8 md:mt-0 md:ml-16">
          <div className="absolute top-0 left-0 w-full h-full border border-gray-700 rounded-full" />
          <div className="relative p-8 space-y-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-4">
              <CodepenIcon className="w-12 h-12" />
              <span className="text-lg font-bold">Next.js</span>
            </div>
            <div className="flex items-center space-x-4">
              <MailIcon className="w-12 h-12" />
              <div>
                <span className="font-bold">Mailgun</span>
                <p className="text-sm text-gray-400">DNS records, avoid spam</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LogInIcon className="w-12 h-12" />
              <div>
                <span className="font-bold">NextAuth</span>
                <p className="text-sm text-gray-400">Google login, Magic link</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <WindIcon className="w-12 h-12" />
              <div>
                <span className="font-bold">Tailwind</span>
                <p className="text-sm text-gray-400">Components, animations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SquareStackIcon className="w-12 h-12" />
              <div>
                <span className="font-bold">Stripe</span>
                <p className="text-sm text-gray-400">Webhook, checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <DatabaseIcon className="w-12 h-12" />
              <div>
                <span className="font-bold">MongoDB</span>
                <p className="text-sm text-gray-400">Database</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SuperscriptIcon className="w-12 h-12" />
              <div>
                <span className="font-bold">Supabase</span>
                <p className="text-sm text-gray-400">Database</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">+ all the boring stuff (SEO tags, API calls, customer support)</p>
            <div className="flex items-center space-x-2">
              <GitGraphIcon className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400">git clone ship-fast</span>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center p-4 space-x-4 border-t border-gray-700">
        <span className="text-gray-400">Featured on</span>
        <CombineIcon className="w-6 h-6" />
        <GithubIcon className="w-6 h-6" />
        <DribbbleIcon className="w-6 h-6" />
        <RssIcon className="w-6 h-6" />
      </footer>
    </div>
  );
}

function AwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  );
}

function CloudLightningIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function CodepenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
      <line x1="12" x2="12" y1="22" y2="15.5" />
      <polyline points="22 8.5 12 15.5 2 8.5" />
      <polyline points="2 15.5 12 8.5 22 15.5" />
      <line x1="12" x2="12" y1="2" y2="8.5" />
    </svg>
  );
}

function CombineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="8" x="2" y="2" rx="2" />
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
      <polyline points="7 21 10 18 7 15" />
      <rect width="8" height="8" x="14" y="14" rx="2" />
    </svg>
  );
}

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function DribbbleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2
      H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

function GitGraphIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="5" cy="6" r="3" />
        <path d="M5 9v6" />
        <circle cx="5" cy="18" r="3" />
        <path d="M12 3v18" />
        <circle cx="19" cy="6" r="3" />
        <path d="M16 15.7A9 9 0 0 0 19 9" />
      </svg>
    );
  }
  
  function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }
  
  function LogInIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
      </svg>
    );
  }
  
  function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }
  
  function RssIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    );
  }
  
  function SquareStackIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
        <path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
        <rect width="8" height="8" x="14" y="14" rx="2" />
      </svg>
    );
  }
  
  function StarIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }
  
  function SuperscriptIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m4 19 8-8" />
        <path d="m12 19-8-8" />
        <path d="M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06" />
      </svg>
    );
  }
  
  function WindIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </svg>
    );
  }