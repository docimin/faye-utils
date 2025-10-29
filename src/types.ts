import type { icons } from 'lucide-react'

import type { radii, themes } from './configs/themes'

export type LayoutType = 'vertical' | 'horizontal'

export type DarkModeType = 'light' | 'dark' | 'system'

export type OrientationType = 'vertical' | 'horizontal'

export type DirectionType = 'ltr' | 'rtl'

export type LocaleType = 'en' | 'de' | 'nl'

export type FormatStyleType = 'percent' | 'duration' | 'currency' | 'regular'

export type ThemeType = keyof typeof themes

export type RadiusType = (typeof radii)[number]

export type DynamicIconNameType = keyof typeof icons

export type SettingsType = {
  theme: ThemeType
  darkMode: DarkModeType
  radius: RadiusType
  layout: LayoutType
  locale: LocaleType
}

export type SettingsConfig = {
  theme?: boolean
  darkMode?: boolean
  radius?: boolean
  layout?: boolean
  locale?: boolean
}
