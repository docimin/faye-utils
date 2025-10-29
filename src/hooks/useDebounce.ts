'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to debounce a value
 * @example
 * ```ts
 * import { useDebounce } from "@docimin/utils"
 *
 * const debouncedValue = useDebounce(value, delay)
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
