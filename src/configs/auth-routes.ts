export type RouteType = 'guest' | 'protected' | 'public'
export type RouteConfig = Map<string, { type: RouteType }>

/**
 * Helper to create a route configuration
 * @example
 * ```ts
 * import { createRouteConfig } from '@docimin/utils'
 *
 * export const routes = createRouteConfig([
 *   ["/login", { type: "guest" }],
 *   ["/dashboard", { type: "protected" }],
 * ])
 * ```
 */
export function createRouteConfig(routes: [string, { type: RouteType }][]): RouteConfig {
  return new Map(routes)
}
