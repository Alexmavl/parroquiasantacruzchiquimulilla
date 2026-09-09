import { ArrowRight, Sparkles } from 'lucide-react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { getDefinicion } from '../../features/sacramentos/config/definiciones'

/**
 * Punto de entrada a la otra modalidad.
 */
export function BloqueModalidadRelacionada({ slug }: { slug: string }): ReactElement | null {
  const otra = getDefinicion(slug)
  if (!otra) return null

  const dirigidoA = otra.publicoObjetivo.charAt(0).toLowerCase() + otra.publicoObjetivo.slice(1)

  return (
    <aside className="rounded-2xl border border-oro-400/80 bg-gradient-to-r from-oro-50/70 via-white to-marino-50/60 p-4 sm:p-5 shadow-xs transition-all duration-200 hover:border-oro-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-serif font-semibold text-marino-900 inline-flex items-center gap-2">
            <Sparkles aria-hidden="true" size={20} className="text-oro-600 shrink-0" />
            <span>¿Va dirigido a {dirigidoA}?</span>
          </h2>
          <p className="prosa-guia text-sm text-carbon-700">
            Existe una preparación especial: <strong>{otra.nombre}</strong>. {otra.resumen}
          </p>
        </div>

        <Link
          to={`/sacramentos/${otra.slug}`}
          className="btn btn-primario text-xs sm:text-sm font-semibold shrink-0 shadow-xs inline-flex items-center gap-2 group"
        >
          <span>Ver {otra.nombre}</span>
          <ArrowRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </aside>
  )
}
