import { Check, ClipboardList, Printer, UserCheck } from 'lucide-react'
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Seo } from '../../../components/Seo'
import { BloqueContacto } from '../../../components/sacramentos/BloqueContacto'
import { BloqueModalidadRelacionada } from '../../../components/sacramentos/BloqueModalidadRelacionada'
import { FranjaUrgencia } from '../../../components/sacramentos/FranjaUrgencia'
import { Migas } from '../../../components/ui/Migas'
import { IconoLiturgico } from '../../../icons/liturgicos/IconoLiturgico'
import type { SlugIcono } from '../../../icons/liturgicos/iconos'
import { NoEncontrado } from '../../../pages/NoEncontrado'
import { DEFINICIONES, getDefinicion } from '../config/definiciones'

function Encabezado({
  nombre,
  icono,
  descripcion,
  publicoObjetivo,
  modalidadRelacionada,
}: {
  nombre: string
  icono: SlugIcono
  descripcion: string
  publicoObjetivo: string
  modalidadRelacionada?: string
}): ReactElement {
  return (
    <header className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="badge-icono-liturgico flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-oro-500 border border-oro-200/80 shadow-xs cursor-default hover:bg-marino-700 hover:text-oro-400 hover:border-marino-700">
          <IconoLiturgico slug={icono} size={32} className="transition-transform duration-300 hover:scale-110" />
        </div>
        <div>
          <h1 className="text-marino-800">{nombre}</h1>
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-marino-100/70 px-2.5 py-1 text-xs sm:text-sm font-medium text-marino-900">
            <UserCheck aria-hidden="true" size={14} className="text-oro-600" />
            <span><strong className="text-marino-950">Dirigido a:</strong> {publicoObjetivo}</span>
          </div>
        </div>
      </div>
      <hr className="filete" />
      <p className="prosa-guia text-base sm:text-lg leading-relaxed text-carbon-800">{descripcion}</p>

      {modalidadRelacionada && (
        <div className="pt-2">
          <BloqueModalidadRelacionada slug={modalidadRelacionada} />
        </div>
      )}
    </header>
  )
}

export function SacramentoDetalle(): ReactElement {
  const { slug } = useParams()
  const def = slug ? getDefinicion(slug) : undefined

  if (!def) return <NoEncontrado />

  const esUrgencia = def.modoContacto === 'URGENCIA'

  return (
    <article className="flex flex-col gap-8">
      <Seo titulo={def.nombre} descripcion={def.resumen} />

      <div className="space-y-4">
        <Migas
          items={[
            { nombre: 'Inicio', href: '/' },
            { nombre: 'Sacramentos', href: '/sacramentos' },
            { nombre: def.nombre },
          ]}
        />

        <Encabezado
          nombre={def.nombre}
          icono={def.icono}
          descripcion={def.descripcion}
          publicoObjetivo={def.publicoObjetivo}
          modalidadRelacionada={def.modalidadRelacionada}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {def.requisitos.length > 0 && (
          <section
            aria-labelledby="requisitos-titulo"
            className="rounded-2xl border border-marino-200 bg-white p-4 sm:p-6 shadow-xs flex flex-col h-full"
          >
            <div className="mb-3.5 flex items-center justify-between flex-wrap gap-2">
              <h2 id="requisitos-titulo" className="inline-flex items-center gap-2 text-xl font-serif text-marino-800">
                <ClipboardList aria-hidden="true" size={22} className="text-oro-500" />
                <span>Requisitos y documentación</span>
              </h2>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-secundario no-print text-xs py-1.5 px-3 shadow-xs"
              >
                <Printer aria-hidden="true" size={14} />
                Imprimir
              </button>
            </div>
            <ul className="flex flex-col gap-2.5 flex-1">
              {def.requisitos.map((r) => (
                <li
                  key={r.id}
                  className="flex items-start gap-2.5 rounded-xl border border-marino-100/80 bg-marino-50/40 p-3 transition-all duration-200 hover:border-marino-200 hover:bg-marino-50/80"
                >
                  <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-oro-500/20 text-oro-700 font-bold">
                    <Check aria-hidden="true" size={12} />
                  </div>
                  <div>
                    <span className="font-semibold text-marino-900 text-sm block leading-snug">{r.label}</span>
                    {r.nota && <span className="aux mt-0.5 block text-xs leading-relaxed text-carbon-600">{r.nota}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {esUrgencia ? <FranjaUrgencia def={def} /> : <BloqueContacto def={def} />}
      </div>
    </article>
  )
}

export const Component = SacramentoDetalle

export function getStaticPaths(): string[] {
  return Object.keys(DEFINICIONES).map((s) => `sacramentos/${s}`)
}
