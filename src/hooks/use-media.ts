'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to check if a media query matches
 * @example
 * ```ts
 * import { useMedia } from "@docimin/utils"
 *
 * const isDark = useMedia("(prefers-color-scheme: dark)")
 * ```
 */
export function useMedia(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)

    // Listen for changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener('change', listener)

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}
