import type { ReactElement } from 'react'

interface Props {
  size?: number
  className?: string
}

/**
 * Iconos de marca que no están en lucide-react.
 * Heredan el color del contenedor (`currentColor`).
 */
export function IconoWhatsApp({ size = 20, className }: Props): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 21.5a9.5 9.5 0 0 1-4.84-1.32l-.35-.2-3.6.94.96-3.5-.23-.36A9.5 9.5 0 1 1 12 21.5zM12 2a11.5 11.5 0 0 0-9.9 17.31L1 23l3.79-1.03A11.5 11.5 0 1 0 12 2z" />
    </svg>
  )
}

export function IconoFacebook({ size = 20, className }: Props): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function IconoGoogleMaps({ size = 20, className }: Props): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  )
}

export function IconoWaze({ size = 20, className }: Props): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M19.34 9.07a7.28 7.28 0 0 0-3.57-4.88 7.42 7.42 0 0 0-7.85.51A7.32 7.32 0 0 0 4.7 10a4.34 4.34 0 0 0-2.6 3.93 4.39 4.39 0 0 0 4.29 4.37h.18a2.56 2.56 0 0 0 2.47 1.87 2.57 2.57 0 0 0 2.53-2.12h1.69a2.57 2.57 0 0 0 2.53 2.12 2.56 2.56 0 0 0 2.47-1.87 4.93 4.93 0 0 0 3.8-4.75 6.94 6.94 0 0 0-2.72-4.48zm-10.42 8.6a1.07 1.07 0 1 1 1.07-1.07 1.07 1.07 0 0 1-1.07 1.07zm6.69 0a1.07 1.07 0 1 1 1.07-1.07 1.07 1.07 0 0 1-1.07 1.07zm2.46-3.88a3.42 3.42 0 0 1-2.46 1.01h-.25a2.53 2.53 0 0 0-2.28-1.44 2.53 2.53 0 0 0-2.28 1.44H9.27a2.53 2.53 0 0 0-2.28-1.44 2.53 2.53 0 0 0-2.28 1.44H4.53a2.89 2.89 0 0 1-2.83-2.88 2.84 2.84 0 0 1 1.83-2.68l.58-.23-.09-.62A5.82 5.82 0 0 1 6.64 5.9a5.92 5.92 0 0 1 6.27-.41 5.8 5.8 0 0 1 2.85 3.89l.13.62.62.13a5.45 5.45 0 0 1 3.56 3.66zM9.54 9.17a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44zm5.75 0a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
    </svg>
  )
}
