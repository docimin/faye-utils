"use client"

import { useMedia } from "react-use"

import { useSettings } from "./use-settings"

/**
 * Hook to check if the mode is dark
 * @example
 * ```ts
 * import { useIsDarkMode } from "@faye/hooks"
 *
 * const isDarkMode = useIsDarkMode()
 * ```
 */
export function useIsDarkMode(): boolean {
  const { settings } = useSettings()
  const isDarkModePreferred = useMedia("(prefers-color-scheme: dark)")

  let resolvedMode = settings.mode

  if (resolvedMode === "system") {
    resolvedMode = isDarkModePreferred ? "dark" : "light"
  }

  return resolvedMode === "dark"
}
