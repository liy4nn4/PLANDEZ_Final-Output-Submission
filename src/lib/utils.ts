import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"


/**
 * Combines multiple class values using tailwind-merge and clsx.
 * @param inputs - Class values to be merged.
 * @returns Merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats the given price with specified currency and notation options.
 * @param price - The price to be formatted.
 * @param options - Formatting options including currency and notation.
 * @returns Formatted price as a string.
 */
export function formatPrice(
  price: number | string,
  options: {
    currency?: "PHP" 
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const {currency = "PHP", notation = "standard"} = options

  const numericPrice = typeof price === "string" ? parseFloat(price) : price 

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

/**
 * Constructs metadata for a webpage,
 * @param options - Metadata options like title, description, image, icons, and noIndex.
 * @returns Metadata object.
 */
export function constructMetadata({
  title = 'SVELTE - the marketplace for high-quality bags.',
  description = 'SVELTE is an marketplace for high-quality bags.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title,
    //   description,
    //   images: [image],
    //   creator: '@gioleanne',
    // },
    icons,
    metadataBase: new URL('https://svelte-production.up.railway.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}