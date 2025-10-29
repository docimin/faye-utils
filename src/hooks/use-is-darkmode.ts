'use client'

import { useMedia } from 'react-use'

import { useSettings } from './use-settings'

/**
 * Hook to check if the mode is dark
 * @example
 * ```ts
 * import { useIsDarkMode } from "@docimin/utils"
 *
 * const isDarkMode = useIsDarkMode()
 * ```
 */
export function useIsDarkMode(): boolean {
  const { settings } = useSettings()
  const isDarkModePreferred = useMedia('(prefers-color-scheme: dark)')

  let resolvedDarkMode = settings.darkMode

  if (resolvedDarkMode === 'system') {
    resolvedDarkMode = isDarkModePreferred ? 'dark' : 'light'
  }

  return resolvedDarkMode === 'dark'
}
