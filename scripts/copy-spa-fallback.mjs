/**
 * GitHub Pages: serve SPA shell for unknown paths (deep links / refresh).
 */
import { copyFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const indexHtml = join(root, 'dist', 'index.html')
const notFound = join(root, 'dist', '404.html')

if (!existsSync(indexHtml)) {
  console.error('copy-spa-fallback: dist/index.html missing — run vite build first.')
  process.exit(1)
}
copyFileSync(indexHtml, notFound)
console.log('copy-spa-fallback: dist/index.html → dist/404.html')
