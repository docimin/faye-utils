import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { format, formatDistanceToNow, intervalToDuration } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import type { FormatStyleType, LocaleType } from '../types'

/**
 * Merge class names
 * @example
 * ```ts
 * import { cn } from "@docimin/utils"
 *
 * const className = cn("text-red-500", "bg-blue-500")
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if a number is even
 * @example
 * ```ts
 * import { isEven } from "@docimin/utils"
 *
 * const isEven = isEven(4)
 * ```
 */
export const isEven = (num: number) => num % 2 === 0

/**
 * Convert rem to px
 * @example
 * ```ts
 * import { remToPx } from "@docimin/utils"
 *
 * const px = remToPx(16)
 * ```
 */
export function remToPx(rem: number): number {
  // Get the root font size (default is 16px if not set otherwise)
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rem * rootFontSize
}

/**
 * Get the brand name of a credit card
 * @example
 * ```ts
 * import { getCreditCardBrandName } from "@docimin/utils"
 *
 * const brandName = getCreditCardBrandName("4111111111111111")
 * ```
 */
export function getCreditCardBrandName(number: string) {
  const re = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  }

  for (const [type, regex] of Object.entries(re)) {
    if (regex.test(number)) return type
  }
  return 'unknown'
}

/**
 * Check if a string is a URL
 * @example
 * ```ts
 * import { isUrl } from "@docimin/utils"
 *
 * const isUrl = isUrl("https://www.google.com")
 * ```
 */
export function isUrl(text: string): boolean {
  return z.url().safeParse(text).success
}

/**
 * Check if a pathname is active
 * @example
 * ```ts
 * import { isActivePathname } from "@docimin/utils"
 *
 * const isActive = isActivePathname("/dashboard", "/dashboard/stats")
 * ```
 */
export function isActivePathname(
  basePathname: string,
  currentPathname: string,
  exactMatch: boolean = true,
): boolean {
  if (typeof basePathname !== 'string' || typeof currentPathname !== 'string') {
    throw new Error('Both basePathname and currentPathname must be strings')
  }

  // Use this when you want a strict comparison, e.g., highlighting a specific page.
  if (exactMatch) {
    return basePathname === currentPathname
  }

  // Allow deeper routes to be considered as active.
  // Example: If basePathname is "/dashboard", it should match "/dashboard/stats".
  return (
    currentPathname.startsWith(basePathname) &&
    (currentPathname.length === basePathname.length || currentPathname[basePathname.length] === '/')
  )
}

/**
 * Format a file size
 * @example
 * ```ts
 * import { formatFileSize } from "@docimin/utils"
 *
 * const fileSize = formatFileSize(1024)
 * ```
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1000 // Use 1024 for binary
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

/**
 * Format a file type
 * @example
 * ```ts
 * import { formatFileType } from "@docimin/utils"
 *
 * const fileType = formatFileType("image/png")
 * ```
 */
export function formatFileType(type: string): string {
  return type.slice(0, type.lastIndexOf('/'))
}

/**
 * Convert a rating to a percentage
 * @example
 * ```ts
 * import { ratingToPercentage } from "@docimin/utils"
 *
 * const percentage = ratingToPercentage(4, 5)
 * ```
 */
export function ratingToPercentage(
  rating: number,
  maxRating: number,
  fractionDigits: number = 0,
): string {
  const value = ((rating / maxRating) * 100).toFixed(fractionDigits)
  const result = `${value}%`

  return result
}

/**
 * Format a currency
 * @example
 * ```ts
 * import { formatCurrency } from "@docimin/utils"
 *
 * const currency = formatCurrency(1000)
 * ```
 */
export function formatCurrency(
  value: number,
  locales: LocaleType = 'en',
  currency: string = 'USD',
): string {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a percentage
 * @example
 * ```ts
 * import { formatPercent } from "@docimin/utils"
 *
 * const percentage = formatPercent(100)
 * ```
 */
export function formatPercent(value: number, locales: LocaleType = 'en'): string {
  return new Intl.NumberFormat(locales, {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format a date
 * @example
 * ```ts
 * import { formatDate } from "@docimin/utils"
 *
 * const date = formatDate("2021-01-01")
 * ```
 */
export function formatDate(value: string | number | Date): string {
  return format(value, 'PP')
}

/**
 * Format a relative date
 * @example
 * ```ts
 * import { formatRelativeDate } from "@docimin/utils"
 *
 * const relativeDate = formatRelativeDate("2021-01-01")
 * ```
 */
export function formatRelativeDate(value?: string | number | Date): string {
  if (!value) return 'No Date'

  const date = new Date(value)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'

  return formatDate(value)
}

/**
 * Format a date with time
 * @example
 * ```ts
 * import { formatDateWithTime } from "@docimin/utils"
 *
 * const dateWithTime = formatDateWithTime("2021-01-01")
 * ```
 */
export function formatDateWithTime(value: string | number | Date): string {
  return format(value, 'PP hh:mm a')
}

/**
 * Format a date short
 * @example
 * ```ts
 * import { formatDateShort } from "@docimin/utils"
 *
 * const dateShort = formatDateShort("2021-01-01")
 * ```
 */
export function formatDateShort(value: string | number | Date): string {
  return format(value, 'MMM dd')
}

/**
 * Format a time
 * @example
 * ```ts
 * import { formatTime } from "@docimin/utils"
 *
 * const time = formatTime("2021-01-01")
 * ```
 */
export function formatTime(value: string | number | Date): string {
  return format(value, 'h:mm a')
}

/**
 * Format a duration
 * @example
 * ```ts
 * import { formatDuration } from "@docimin/utils"
 *
 * const duration = formatDuration("2021-01-01")
 * ```
 */
export function formatDuration(value: string | number | Date): string {
  const numberValue = Number(value)
  const isNegative = numberValue < 0
  const absoluteValue = Math.abs(numberValue)

  const duration = intervalToDuration({ start: 0, end: absoluteValue })

  const hours = duration.hours ? `${duration.hours}h` : ''
  const minutes = duration.minutes ? `${duration.minutes}m` : ''
  const seconds = duration.seconds ? `${duration.seconds}s` : ''

  const formattedDuration = `${hours} ${minutes} ${seconds}`.trim()

  return isNegative ? `-${formattedDuration}` : formattedDuration
}

/**
 * Format a distance
 * @example
 * ```ts
 * import { formatDistance } from "@docimin/utils"
 *
 * const distance = formatDistance("2021-01-01")
 * ```
 */
export function formatDistance(value: string | number | Date): string {
  const distance = formatDistanceToNow(value, { addSuffix: true })

  const replacements: Record<string, string> = {
    minute: 'min',
    minutes: 'mins',
    hour: 'hr',
    hours: 'hrs',
    day: 'day',
    days: 'days',
    month: 'month',
    months: 'months',
    year: 'year',
    years: 'years',
  }

  if (distance === 'less than a minute ago') {
    return 'just now'
  }

  // Replace phrases based on the mapping
  return distance
    .replace(
      /less than a minute|minute|minutes|hour|hours|day|days|month|months|year|years/g,
      (match: string) => replacements[match] ?? match,
    )
    .replace(/\b(over|almost|about)\b/g, '')
}

/**
 * Format a number to compact
 * @example
 * ```ts
 * import { formatNumberToCompact } from "@docimin/utils"
 *
 * const compact = formatNumberToCompact(1000)
 * ```
 */
export function formatNumberToCompact(value: number, locales: LocaleType = 'en'): string {
  return new Intl.NumberFormat(locales, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value)
}

/**
 * Convert a time string to a date
 * @example
 * ```ts
 * import { timeToDate } from "@docimin/utils"
 *
 * const date = timeToDate("12:00")
 * ```
 */
export function timeToDate(timeString: string, baseDate = new Date()): Date {
  if (!/^\d{2}:\d{2}$/.test(timeString)) {
    throw new Error("Invalid time format. Use 'HH:mm'.")
  }

  const [hours, minutes] = timeString.split(':').map(Number)
  const date = new Date(baseDate) // Clone base date

  date.setHours(hours, minutes, 0, 0) // Set hours and minutes, reset seconds & milliseconds

  return date
}

/**
 * Convert a camel case string to a title case string
 * @example
 * ```ts
 * import { camelCaseToTitleCase } from "@docimin/utils"
 *
 * const titleCase = camelCaseToTitleCase("camelCase")
 * ```
 */
export function camelCaseToTitleCase(camelCaseStr: string): string {
  const titleCaseStr = camelCaseStr
    .replace(/([A-Z])/g, ' $1') // Insert space before uppercase letters
    .replace(/^./, (char) => char.toUpperCase()) // Capitalize the first letter

  return titleCaseStr
}

/**
 * Convert a title case string to a camel case string
 * @example
 * ```ts
 * import { titleCaseToCamelCase } from "@docimin/utils"
 *
 * const camelCase = titleCaseToCamelCase("Title Case")
 * ```
 */
export function titleCaseToCamelCase(titleCaseStr: string): string {
  const camelCaseStr = titleCaseStr
    .toLowerCase() // Convert the entire string to lowercase first
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase()) // Remove spaces and capitalize the following character

  return camelCaseStr
}

/**
 * Convert a text to a slug
 * @example
 * ```ts
 * import { slugify } from "@docimin/utils"
 *
 * const slug = slugify("Hello World")
 * ```
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with "-"
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
}

/**
 * Ensure a string starts with a prefix
 * @example
 * ```ts
 * import { ensureWithPrefix } from "@docimin/utils"
 *
 * const prefixed = ensureWithPrefix("Hello", "Hello")
 * ```
 */
export function ensureWithPrefix(value: string, prefix: string): string {
  return value.startsWith(prefix) ? value : `${prefix}${value}`
}

/**
 * Ensure a string ends with a suffix
 * @example
 * ```ts
 * import { ensureWithSuffix } from "@docimin/utils"
 *
 * const suffixed = ensureWithSuffix("Hello", "Hello")
 * ```
 */
export function ensureWithSuffix(value: string, suffix: string): string {
  return value.endsWith(suffix) ? value : `${value}${suffix}`
}

/**
 * Ensure a string does not end with a suffix
 * @example
 * ```ts
 * import { ensureWithoutSuffix } from "@docimin/utils"
 *
 * const withoutSuffix = ensureWithoutSuffix("Hello", "Hello")
 * ```
 */
export function ensureWithoutSuffix(value: string, suffix: string): string {
  return value.endsWith(suffix) ? value.slice(0, -suffix.length) : value
}

/**
 * Ensure a string does not start with a prefix
 * @example
 * ```ts
 * import { ensureWithoutPrefix } from "@docimin/utils"
 *
 * const withoutPrefix = ensureWithoutPrefix("Hello", "Hello")
 * ```
 */
export function ensureWithoutPrefix(value: string, prefix: string): string {
  return value.startsWith(prefix) ? value.slice(prefix.length) : value
}

/**
 * Ensure a redirect pathname
 * @example
 * ```ts
 * import { ensureRedirectPathname } from "@docimin/utils"
 *
 * const redirectPathname = ensureRedirectPathname("/dashboard", "/dashboard/stats")
 * ```
 */
export function ensureRedirectPathname(basePathname: string, redirectPathname: string): string {
  const searchParams = new URLSearchParams({
    redirectTo: ensureWithoutSuffix(redirectPathname, '/'),
  })

  return ensureWithSuffix(basePathname, `?${searchParams.toString()}`)
}

/**
 * Check if a number is non-negative
 * @example
 * ```ts
 * import { isNonNegative } from "@docimin/utils"
 *
 * const isNonNegative = isNonNegative(100)
 * ```
 */
export function isNonNegative(num: number): boolean {
  return num >= 0
}

/**
 * Get a discounted price
 * @example
 * ```ts
 * import { getDiscountedPrice } from "@docimin/utils"
 *
 * const discountedPrice = getDiscountedPrice(100, 0.1)
 * ```
 */
export function getDiscountedPrice(
  price: number,
  discountRate: number,
  isAnnual: boolean = false,
): number {
  if (isAnnual) {
    // Apply discount to the annual price
    const annualPrice = price * 12
    const discountedAnnualPrice = annualPrice * (1 - discountRate)

    // Calculate the equivalent monthly price after the discount
    const monthlyEquivalentPrice = discountedAnnualPrice / 12
    return monthlyEquivalentPrice
  } else {
    // Apply discount directly to the monthly price
    const discountedMonthlyPrice = price * (1 - discountRate)
    return discountedMonthlyPrice
  }
}

/**
 * Check if a date is before today
 * @example
 * ```ts
 * import { isBeforeToday } from "@docimin/utils"
 *
 * const isBeforeToday = isBeforeToday(new Date())
 * ```
 */
export function isBeforeToday(date: Date): boolean {
  // Get the start of today
  const startOfToday = new Date(new Date().setHours(0, 0, 0, 0))

  // Compare the dates
  return date < startOfToday
}

/**
 * Format an unread count
 * @example
 * ```ts
 * import { formatUnreadCount } from "@docimin/utils"
 *
 * const unreadCount = formatUnreadCount(100)
 * ```
 */
export function formatUnreadCount(unreadCount: number): number | string {
  // If the unread count is 100 or more, display "+99"; otherwise, display the actual unread count.
  return unreadCount >= 100 ? '+99' : unreadCount
}

/**
 * Wait for a number of milliseconds
 * @example
 * ```ts
 * import { wait } from "@docimin/utils"
 *
 * const result = await wait(1000)
 * ```
 */
export function wait(ms: number = 250): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Format an overview card value
 * @example
 * ```ts
 * import { formatOverviewCardValue } from "@docimin/utils"
 *
 * const value = formatOverviewCardValue(100, "percent")
 * ```
 */
export function formatOverviewCardValue(
  value: number,
  formatStyle: FormatStyleType,
): string | number {
  switch (formatStyle) {
    case 'percent':
      return formatPercent(value)
    case 'duration':
      return formatDuration(value)
    case 'currency':
      return formatCurrency(value)
    default:
      return value.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
  }
}

export function getInitials(fullName: string) {
  if (fullName.length === 0) return ''

  // Split the name by spaces
  const names = fullName.split(' ')
  // Extract the first letter of each name and convert it to uppercase
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join('')

  return initials
}
