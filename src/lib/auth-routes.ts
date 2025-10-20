import type { RouteConfig, RouteType } from "../configs/auth-routes"

/**
 * Strip the locale from the route
 * @example
 * ```ts
 * import { stripLocale } from "@docimin/lib"
 *
 * const routeWithoutLocale = stripLocale("/en/dashboard")
 * ```
 */
const stripLocale = (route: string): string => {
  // Remove locale prefix (e.g., "/en/dashboard" -> "/dashboard")
  // Matches patterns like /en, /de, /fr, etc. (2-letter locale codes)
  return route.replace(/^\/[a-z]{2}(\/|$)/, "/")
}

/**
 * Get the base path from the route
 * @example
 * ```ts
 * import { getBasePath } from "@docimin/lib"
 *
 * const basePath = getBasePath("/user/settings")
 * ```
 */
const getBasePath = (route: string): string => {
  // Strip locale first, then extract the base path
  const routeWithoutLocale = stripLocale(route)
  // Extract the base path (e.g., "/user" from "/user/settings")
  const secondSlash = routeWithoutLocale.indexOf("/", 1)
  return secondSlash === -1
    ? routeWithoutLocale
    : routeWithoutLocale.substring(0, secondSlash)
}

/**
 * Check if the route is of a certain type
 * @example
 * ```ts
 * import { isRouteType } from "@docimin/lib"
 *
 * const isPublicRoute = isRouteType("/user", "public", routeConfig)
 * ```
 */
function isRouteType(
  route: string,
  type: RouteType,
  routeConfig: RouteConfig
): boolean {
  const basePath = getBasePath(route)
  const routeInfo = routeConfig.get(basePath)

  // Check if route exists and matches the desired type
  if (routeInfo && routeInfo.type === type) {
    return true
  }

  // If no matching route, return false
  return false
}

/**
 * Check if the route is public
 * @example
 * ```ts
 * import { isPublicRoute } from "@docimin/lib"
 *
 * const isPublicRoute = isPublicRoute("/user", routeConfig)
 * ```
 */
export function isPublicRoute(
  route: string,
  routeConfig: RouteConfig
): boolean {
  return isRouteType(route, "public", routeConfig)
}

/**
 * Check if the route is guest
 * @example
 * ```ts
 * import { isGuestRoute } from "@docimin/lib"
 *
 * const isGuestRoute = isGuestRoute("/user", routeConfig)
 * ```
 */
export function isGuestRoute(route: string, routeConfig: RouteConfig): boolean {
  return isRouteType(route, "guest", routeConfig)
}

/**
 * Check if the route is protected
 * @example
 * ```ts
 * import { isProtectedRoute } from "@docimin/lib"
 *
 * const isProtectedRoute = isProtectedRoute("/user", routeConfig)
 * ```
 */
export function isProtectedRoute(
  route: string,
  routeConfig: RouteConfig
): boolean {
  return isRouteType(route, "protected", routeConfig)
}
