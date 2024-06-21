import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// import ms from "ms";

// import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// export function absoluteUrl(path: string) {
//  return `${env.NEXT_PUBLIC_APP_URL}${path}`
// }
export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT',
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'USD', notation = 'compact' } = options
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    notation, maximumFractionDigits: 2
  }).format(numericPrice)

}

export function formatToUpperCase(
  text: string
) {
  return text.toUpperCase()
}