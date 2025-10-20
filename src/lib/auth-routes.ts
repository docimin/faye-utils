import type { RouteConfig } from "../configs/auth-routes"

const stripLocale = (route: string): string => {
  // Remove locale prefix (e.g., "/en/dashboard" -> "/dashboard")
  // Matches patterns like /en, /de, /fr, etc. (2-letter locale codes)
  return route.replace(/^\/[a-z]{2}(\/|$)/, "/")
}

const getBasePath = (route: string): string => {
  // Strip locale first, then extract the base path
  const routeWithoutLocale = stripLocale(route)
  // Extract the base path (e.g., "/user" from "/user/settings")
  const secondSlash = routeWithoutLocale.indexOf("/", 1)
  return secondSlash === -1
    ? routeWithoutLocale
    : routeWithoutLocale.substring(0, secondSlash)
}

function isRouteType(route: string, type: string, routeConfig: RouteConfig) {
  const basePath = getBasePath(route)
  const routeInfo = routeConfig.get(basePath)

  // Check if route exists and matches the desired type
  if (routeInfo && routeInfo.type === type) {
    return true
  }

  // If no matching route, return false
  return false
}

export function isPublicRoute(route: string, routeConfig: RouteConfig) {
  return isRouteType(route, "public", routeConfig)
}

export function isGuestRoute(route: string, routeConfig: RouteConfig) {
  return isRouteType(route, "guest", routeConfig)
}

export function isProtectedRoute(route: string, routeConfig: RouteConfig) {
  return isRouteType(route, "protected", routeConfig)
}
