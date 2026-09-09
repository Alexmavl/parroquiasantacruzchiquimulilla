import type { ReactElement } from 'react'
import { ICONOS_POR_SLUG, type SlugIcono } from './iconos'

interface Props {
  slug: SlugIcono
  /** Lado del icono en px. Escala usada por la spec: 32 (tarjeta), 48 (detalle). */
  size?: number
  className?: string
}

/**
 * Icono del set litúrgico propio. Siempre `aria-hidden`: en la spec (§0.5)
 * todo icono va acompañado de texto.
 */
export function IconoLiturgico({ slug, size = 24, className }: Props): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {ICONOS_POR_SLUG[slug]}
    </svg>
  )
}
