import { Building2, Calendar, Clock, HeartHandshake } from 'lucide-react'
import type { ReactElement } from 'react'
import type { Horarios } from '../../lib/schemas'

type Bloque = Horarios['misas'][number]

interface Props {
  titulo: string
  bloques: Bloque[]
  /** Id para enlazar el título con la tabla vía aria-labelledby. */
  id: string
}

function getIconoPorId(id: string): ReactElement {
  switch (id) {
    case 'misas':
      return <Calendar aria-hidden="true" size={24} className="text-oro-500 shrink-0" />
    case 'confesiones':
      return <HeartHandshake aria-hidden="true" size={24} className="text-oro-500 shrink-0" />
    case 'despacho':
      return <Building2 aria-hidden="true" size={24} className="text-oro-500 shrink-0" />
    default:
      return <Clock aria-hidden="true" size={24} className="text-oro-500 shrink-0" />
  }
}

/**
 * Tabla de horarios moderna con estilo de tarjeta y filas alternadas.
 */
export function TablaHorarios({
  titulo,
  bloques,
  id,
  compact = false,
}: Props & { compact?: boolean }): ReactElement {
  const containerClass = compact
    ? 'rounded-xl border border-marino-100/90 bg-marino-50/40 p-3.5 sm:p-4'
    : 'overflow-hidden rounded-2xl border border-marino-200/90 bg-white p-4 sm:p-5 shadow-xs transition-all duration-200'

  return (
    <section aria-labelledby={id} className={containerClass}>
      <h3
        id={id}
        className={`inline-flex items-center gap-2 font-serif text-marino-800 ${
          compact ? 'mb-3 text-base font-semibold' : 'mb-3.5 text-lg'
        }`}
      >
        {getIconoPorId(id)}
        <span>{titulo}</span>
      </h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {bloques.map((b) => (
          <li
            key={b.dia}
            className="flex flex-col justify-between gap-1.5 rounded-lg border border-marino-100/70 bg-white p-2.5 sm:p-3 shadow-2xs transition-colors duration-150 hover:border-marino-200 hover:bg-white"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-marino-900 text-xs sm:text-sm flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-marino-500" />
                {b.dia}
              </span>
              {b.lugar && (
                <span className="aux text-[11px] font-medium text-marino-700 bg-marino-50 px-2 py-0.5 rounded border border-marino-100/60">
                  {b.lugar}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {b.horas.length > 0 ? (
                b.horas.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1 rounded-md bg-marino-100/80 px-2 py-0.5 text-xs font-semibold tabular-nums text-marino-900"
                  >
                    <Clock aria-hidden="true" size={11} className="text-marino-600" />
                    {h}
                  </span>
                ))
              ) : (
                <span className="text-xs text-carbon-500">{b.nota ?? '—'}</span>
              )}
            </div>

            {b.horas.length > 0 && b.nota && (
              <span className="aux text-[11px] text-carbon-500 italic">({b.nota})</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
