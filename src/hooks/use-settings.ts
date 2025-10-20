"use client"

import { useContext } from "react"

import { SettingsContext } from "../contexts/settings-context"

/**
 * Hook to get the settings
 * @example
 * ```ts
 * import { useSettings } from "@faye/hooks"
 *
 * const { settings } = useSettings()
 * ```
 */
export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
