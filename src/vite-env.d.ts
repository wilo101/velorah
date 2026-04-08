/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROUTER_BASENAME?: string
  /** Web3Forms access key — https://web3forms.com */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  /** Used when Web3Forms is not configured (mailto fallback) */
  readonly VITE_CONTACT_EMAIL?: string
  /** Optional: `/hero.mp4` or full URL to replace default hero video */
  readonly VITE_HERO_VIDEO_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
