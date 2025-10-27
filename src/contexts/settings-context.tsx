"use client"

import { createContext, useCallback, useEffect, useState } from "react"
import { useCookie } from "react-use"

import type { ReactNode } from "react"
import type { LocaleType, SettingsConfig, SettingsType } from "../types"

export const defaultSettings: SettingsType = {
  theme: "zinc",
  darkMode: "system",
  radius: 0.5,
  layout: "vertical",
  locale: "en",
}

export const SettingsContext = createContext<
  | {
      settings: SettingsType
      updateSettings: (newSettings: SettingsType) => void
      resetSettings: () => void
      settingsConfig: SettingsConfig
    }
  | undefined
>(undefined)

/**
 * Context for the settings
 * @example
 * ```ts
 * import { SettingsProvider } from "@docimin/utils"
 *
 * function App() {
 *   return (
 *     <SettingsProvider locale="en">
 *       <App />
 *     </SettingsProvider>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Disable theme selection
 * <SettingsProvider locale="en" settingsConfig={{ theme: false }}>
 *   <App />
 * </SettingsProvider>
 * ```
 */
export function SettingsProvider({
  locale,
  children,
  settingsConfig = {
    theme: true,
    darkMode: true,
    radius: true,
    layout: true,
    locale: true,
  },
}: {
  locale: LocaleType
  children: ReactNode
  settingsConfig?: SettingsConfig
}) {
  const [storedSettings, setStoredSettings, deleteStoredSettings] =
    useCookie("settings")
  const [settings, setSettings] = useState<SettingsType | null>(null)

  useEffect(() => {
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings)
      setSettings({ ...defaultSettings, locale, ...parsedSettings })
    } else {
      setSettings({ ...defaultSettings, locale })
    }
  }, [storedSettings, locale])

  const updateSettings = useCallback(
    (newSettings: SettingsType) => {
      // Filter and only store enabled settings
      const filteredSettings = filterSettings(newSettings, settingsConfig)
      setStoredSettings(JSON.stringify(filteredSettings))
      setSettings(newSettings)
    },
    [setStoredSettings, settingsConfig]
  )

  const resetSettings = useCallback(() => {
    deleteStoredSettings()
    setSettings({ ...defaultSettings, locale })
  }, [deleteStoredSettings, locale])

  // Render children only when settings are ready
  if (!settings) {
    return null
  }

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings, settingsConfig }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

/**
 * Filters settings based on the configuration
 * Only includes settings that are enabled in the config
 */
function filterSettings(
  settings: SettingsType,
  config: SettingsConfig
): Partial<SettingsType> {
  const filtered: Partial<SettingsType> = {}

  if (config.theme !== false) {
    filtered.theme = settings.theme
  }
  if (config.darkMode !== false) {
    filtered.darkMode = settings.darkMode
  }
  if (config.radius !== false) {
    filtered.radius = settings.radius
  }
  if (config.layout !== false) {
    filtered.layout = settings.layout
  }
  if (config.locale !== false) {
    filtered.locale = settings.locale
  }

  return filtered
}
