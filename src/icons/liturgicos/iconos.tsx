import type { ReactNode } from 'react'

/**
 * Set litúrgico propio. Ocho iconos, portados 1:1 desde
 * `public/preview-iconos.html` (mismos paths, viewBox 24, trazo 1.5).
 *
 * Regla de la spec (§0.5): todo icono va acompañado de texto. Por eso el
 * wrapper es siempre `aria-hidden` y nunca expone `aria-label`.
 */
export type SlugIcono =
  | 'cruz'
  | 'bautizo'
  | 'primera-comunion'
  | 'confirmacion'
  | 'matrimonio'
  | 'confesion'
  | 'uncion'
  | 'catequesis'
  | 'plan-pastoral'

export const ICONOS_POR_SLUG: Record<SlugIcono, ReactNode> = {
  cruz: (
    <>
      {/* Resplandor / destellos de fondo */}
      <path
        d="M12 4.5l1.2 2.8 2.8 1.2-2.8 1.2L12 12.5l-1.2-2.8L8 8.5l2.8-1.2z"
        fill="currentColor"
        fillOpacity={0.15}
        stroke="none"
      />
      <path
        d="M6 2.5l6 6M18 2.5l-6 6M6 14.5l6-6M18 14.5l-6-6"
        stroke="currentColor"
        strokeWidth={1}
        strokeOpacity={0.45}
        strokeDasharray="1 2.5"
      />
      {/* Cuerpo principal de la Santa Cruz */}
      <path
        d="M12 1.5v21M4.5 8.5h15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Remates ornamentales en los extremos */}
      <path
        d="M9.5 1.5h5M9.5 22.5h5M4.5 6v5M19.5 6v5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Resplandor central */}
      <circle
        cx="12"
        cy="8.5"
        r="1.8"
        fill="currentColor"
        fillOpacity={0.9}
        stroke="currentColor"
        strokeWidth={0.5}
      />
    </>
  ),
  bautizo: (
    <>
      <path d="M4.5 12.5a7.5 7.5 0 0 1 15 0z" />
      <path d="M12 12.5 6.7 7.2M12 12.5V5m0 7.5 5.3-5.3" />
      <path d="M7.5 15.5c-.7.9-1.1 1.5-1.1 2a1.1 1.1 0 0 0 2.2 0c0-.5-.4-1.1-1.1-2z" />
      <path d="M12 16c-.7.9-1.1 1.5-1.1 2a1.1 1.1 0 0 0 2.2 0c0-.5-.4-1.1-1.1-2z" />
      <path d="M16.5 15.5c-.7.9-1.1 1.5-1.1 2a1.1 1.1 0 0 0 2.2 0c0-.5-.4-1.1-1.1-2z" />
    </>
  ),
  'primera-comunion': (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <path d="m14.3 2.7.7-.7m-5.3.7-.7-.7M15.2 5h1M8.8 5h-1" />
      <path d="M7.5 9.5a4.5 4.5 0 0 0 9 0z" />
      <path d="M12 14v6.5M10.5 17h3M8.5 20.5h7" />
    </>
  ),
  confirmacion: (
    <>
      <path d="M12 2.2c1.2 1.3 1.9 2.1 1.9 3a1.9 1.9 0 0 1-3.8 0c0-.9.7-1.7 1.9-3z" />
      <circle cx="14.2" cy="9.6" r="1.6" />
      <path d="m15.8 9.6 1.8.6" />
      <path d="M13 10.8C11.2 13 9.4 15.4 8 18" />
      <path d="M13.8 11.2c2-.4 4.4.2 5.8 1.8-2 .9-4.4.8-6.4 0" />
      <path d="m8 18-2.4 2.4M8 18l1.6 2.8" />
    </>
  ),
  matrimonio: (
    <>
      <path d="M12 2v6.4M9.4 4.4h5.2" />
      <circle cx="9.5" cy="14.5" r="4.8" />
      <circle cx="14.5" cy="14.5" r="4.8" />
    </>
  ),
  confesion: (
    <>
      <path d="M7.6 3c1 5 3.4 9.5 6.8 16.2" />
      <path d="M16.4 3c-1 5-3.4 9.5-6.8 16.2" />
      <path d="m13.4 19.9 2.4-1M8.2 18.9l2.4 1" />
    </>
  ),
  uncion: (
    <>
      <path d="M12 2.5c1 1.1 1.6 1.8 1.6 2.5a1.6 1.6 0 0 1-3.2 0c0-.7.6-1.4 1.6-2.5z" />
      <path d="M9.5 8h5" />
      <path d="M10.2 8v2M13.8 8v2" />
      <path d="M10.2 10c-2.2.8-3.4 2.8-3.4 5" />
      <path d="M13.8 10c2.2.8 3.4 2.8 3.4 5" />
      <path d="M6.8 15a5.2 5.2 0 0 0 10.4 0" />
      <path d="M12 13.5v4M10 15.5h4" />
    </>
  ),
  catequesis: (
    <>
      <path d="M12 1.8v4.8M9.6 3.9h4.8" />
      <path d="M12 9.5C10.6 8.4 8.6 7.9 6 7.9H3.2V19h3.2c2.2 0 4.1.5 5.6 1.6" />
      <path d="M12 9.5c1.4-1.1 3.4-1.6 6-1.6h2.8V19h-3.2c-2.2 0-4.1.5-5.6 1.6" />
      <path d="M12 9.5v11.1" />
    </>
  ),
  'plan-pastoral': (
    <>
      <path d="M9.5 21V9.5" />
      <path d="M9.5 9.5a4 4 0 0 1 8 0 2.3 2.3 0 0 1-4.6 0" />
    </>
  ),
}

/** Iconos disponibles para cada tipo de sacramento. */
export const ICONO_POR_SACRAMENTO = {
  BAUTIZO: 'bautizo',
  PRIMERA_COMUNION: 'primera-comunion',
  CONFIRMACION: 'confirmacion',
  MATRIMONIO: 'matrimonio',
  CONFESION: 'confesion',
  UNCION_ENFERMOS: 'uncion',
} as const

