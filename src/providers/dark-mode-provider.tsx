'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { useIsDarkMode } from '../hooks/use-is-darkmode'

const defaultModes = ['light', 'dark']

/**
 * Provider for the mode
 * @example
 * ```ts
 * import { DarkModeProvider } from "@docimin/utils"
 *
 * <DarkModeProvider>
 *   <App />
 * </DarkModeProvider>
 * ```
 */
export function DarkModeProvider({ children }: { children: ReactNode }) {
  const isDarkMode = useIsDarkMode()
  const mode = isDarkMode ? 'dark' : 'light'

  useEffect(() => {
    const rootElement = document.documentElement

    // Update class names in the <html> tag
    rootElement.classList.remove(...defaultModes)
    rootElement.classList.add(mode)
  }, [mode])

  return <>{children}</>
}
