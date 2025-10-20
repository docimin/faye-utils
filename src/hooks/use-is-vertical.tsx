"use client"

import { useSettings } from "./use-settings"

/**
 * Hook to check if the layout is vertical
 * @example
 * ```ts
 * import { useIsVertical } from "@docimin/utils"
 *
 * const isVertical = useIsVertical()
 * ```
 */
export function useIsVertical(): boolean {
  const { settings } = useSettings()

  const isVertical = settings.layout === "vertical"
  return isVertical
}
