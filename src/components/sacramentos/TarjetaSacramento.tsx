import { FileText } from 'lucide-react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { DefinicionSacramento } from '../../features/sacramentos/config/definiciones'
import { IconoLiturgico } from '../../icons/liturgicos/IconoLiturgico'
import { enlaceSolicitudConstancia } from '../../lib/whatsapp'

interface Props {
  def: DefinicionSacramento
  /** Nivel de encabezado del nombre, para no romper la jerarquía de la página. */
  nivel?: 2 | 3
}

// Sacramentos que típicamente emiten fe/constancia registrada
const SACRAMENTOS_CON_CONSTANCIA = new Set([
  'bautizo',
  'primera-comunion',
  'confirmacion',
  'matrimonio',
  'primera-comunion-supletoria',
])

/**
 * Tarjeta de sacramento moderna con elevación sutil, icono destacado y acción de constancia.
 */
export function TarjetaSacramento({ def, nivel = 2 }: Props): ReactElement {
  const Titulo = nivel === 2 ? 'h2' : 'h3'
  const permiteConstancia = SACRAMENTOS_CON_CONSTANCIA.has(def.slug)

  return (
    <div className="tarjeta-sacramento group w-full flex flex-col justify-between">
      <Link to={`/sacramentos/${def.slug}`} className="flex flex-col gap-2.5 flex-1 no-underline text-inherit">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-oro-500 border border-oro-200/80 transition-all duration-300 group-hover:bg-marino-700 group-hover:text-oro-400 group-hover:border-marino-700 group-hover:shadow-sm">
            <IconoLiturgico slug={def.icono} size={24} />
          </div>
          <Titulo className="text-base sm:text-lg font-serif font-semibold text-marino-800 transition-colors duration-200 group-hover:text-marino-900 leading-snug">
            {def.nombre}
          </Titulo>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-carbon-700">{def.resumen}</p>
        {def.anticipacion && (
          <p className="aux pt-2 text-[11px] font-medium text-marino-700 border-t border-marino-100/70 mt-auto">
            {def.anticipacion}
          </p>
        )}
      </Link>

      <div className="mt-3 pt-2.5 border-t border-marino-100/70 flex items-center justify-between gap-2">
        <Link
          to={`/sacramentos/${def.slug}`}
          className="text-xs font-semibold text-marino-700 hover:text-marino-900 transition-colors"
        >
          Ver requisitos →
        </Link>

        {permiteConstancia && (
          <a
            href={enlaceSolicitudConstancia(def.nombre)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-marino-50 px-2 py-1 text-[11px] font-semibold text-marino-700 border border-marino-200/90 shadow-2xs transition-all duration-200 hover:bg-marino-700 hover:text-white hover:border-marino-700"
            title={`Solicitar constancia o fe de ${def.nombre.toLowerCase()} por WhatsApp`}
          >
            <FileText aria-hidden="true" size={12} className="text-oro-500" />
            <span>Solicitar constancia</span>
          </a>
        )}
      </div>
    </div>
  )
}
