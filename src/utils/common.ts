"use client"
/**
 * Retrieve the value of a cookie by its name.
 * @return The value of the cookie, or undefined if the cookie does not exist.
 * @param name The name of the cookie.
 * @example
 * ```ts
 * import { getCookie } from "@docimin/utils"
 *
 * const cookie = getCookie("orgId")
 * ```
 */
export function getCookie(name: string): string | undefined {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift()
      return cookieValue ? cookieValue : undefined
    }
  }
  return undefined
}
