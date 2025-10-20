"use client"

import { remToPx } from "../lib/utils"

import { useSettings } from "./use-settings"

/**
 * Hook to get the radius
 * @example
 * ```ts
 * import { useRadius } from "@faye/hooks"
 *
 * const radius = useRadius()
 * ```
 */
export function useRadius(asPx = true): number {
  const { settings } = useSettings()

  let radius = Number(settings.radius)
  if (asPx) {
    radius = remToPx(radius)
  }

  return radius
}
