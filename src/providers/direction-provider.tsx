"use client"

import { DirectionProvider as DirectionProviderPrimitive } from "@radix-ui/react-direction"

import type { ReactNode } from "react"
import type { DirectionType } from "../types"

/**
 * Provider for the direction
 * @example
 * ```ts
 * import { DirectionProvider } from "@docimin/providers"
 *
 * <DirectionProvider direction="ltr">
 *   <App />
 * </DirectionProvider>
 * ```
 */
export function DirectionProvider({
  direction,
  children,
}: {
  direction: DirectionType
  children: ReactNode
}) {
  return (
    <DirectionProviderPrimitive dir={direction}>
      {children}
    </DirectionProviderPrimitive>
  )
}
