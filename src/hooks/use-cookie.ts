'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to get, set, and delete a cookie
 * @example
 * ```ts
 * import { useCookie } from "@docimin/utils"
 *
 * const [value, setValue, deleteCookie] = useCookie("myCookie")
 * ```
 */
export function useCookie(name: string) {
  const [value, setValue] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Get cookie value on mount
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
    setValue(cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined)
  }, [name])

  const setCookie = (newValue: string, days = 365) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    // biome-ignore lint/suspicious/noDocumentCookie: document.cookie is intentional
    document.cookie = `${name}=${encodeURIComponent(newValue)};expires=${expires.toUTCString()};path=/`
    setValue(newValue)
  }

  const deleteCookie = () => {
    // biome-ignore lint/suspicious/noDocumentCookie: document.cookie is intentional
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    setValue(undefined)
  }

  return [value, setCookie, deleteCookie] as const
}
