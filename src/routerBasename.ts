/**
 * GitHub Project Pages: app lives at https://<user>.github.io/<repo>/.
 * With Vite `base: './'`, set Router basename from the first path segment on *.github.io.
 *
 * Override: VITE_ROUTER_BASENAME=/velorah in `.env.production` if needed.
 */
export function resolveRouterBasename(): string | undefined {
  const fromEnv = import.meta.env.VITE_ROUTER_BASENAME?.trim()
  if (fromEnv && fromEnv !== '/') {
    return fromEnv.replace(/\/$/, '')
  }

  if (typeof window === 'undefined') return undefined

  const { hostname, pathname } = window.location
  if (hostname.endsWith('github.io')) {
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length >= 1) return `/${parts[0]}`
  }

  return undefined
}
