"use client"

import { useDirection } from "@radix-ui/react-direction"

/**
 * Hook to check if the direction is RTL
 * @example
 * ```ts
 * import { useIsRtl } from "@docimin/hooks"
 *
 * const isRtl = useIsRtl()
 * ```
 */
export function useIsRtl(): boolean {
  const direction = useDirection()

  const isRtl = direction === "rtl"
  return isRtl
}
