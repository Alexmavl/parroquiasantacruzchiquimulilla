import { BookMarked, Calendar, FileSearch, Library } from 'lucide-react'
import type { ReactElement } from 'react'
import { Seo } from '../../../components/Seo'
import { BotonWhatsApp } from '../../../components/ui/BotonWhatsApp'
import { Migas } from '../../../components/ui/Migas'
import { fechaLarga, libros, librosPorTipo } from '../../../lib/content'
import { enlaceConsultaRegistro } from '../../../lib/whatsapp'

export function Registros(): ReactElement {
  const grupos = librosPorTipo()

  return (
    <div className="space-y-6 sm:space-y-8">
      <Seo
        titulo="Consulta de registros"
        descripcion="Cómo saber si tu registro de bautizo, confirmación o matrimonio se conserva en la Parroquia Santa Cruz de Chiquimulilla."
      />
      <Migas items={[{ nombre: 'Inicio', href: '/' }, { nombre: 'Registros' }]} />

      <header>
        <h1 className="inline-flex items-center gap-3 text-marino-800">
          <FileSearch aria-hidden="true" size={32} className="text-oro-500" />
          <span>Consulta de registros</span>
        </h1>
        <hr className="filete" />

        <div className="prosa-guia flex flex-col gap-2 text-base sm:text-lg leading-relaxed text-carbon-700">
          <p>
            Si necesitas una fe de bautismo, de confirmación o de matrimonio, escríbenos y
            buscamos en el libro. Danos el nombre completo, el año aproximado y los nombres de los
            padres: con eso lo encontramos.
          </p>
          <p className="text-sm text-carbon-500">
            La constancia oficial se entrega en la parroquia, en horario de despacho.
          </p>
        </div>

        <div className="mt-5">
          <BotonWhatsApp href={enlaceConsultaRegistro()} etiqueta="Consultar por WhatsApp" />
        </div>
      </header>

      <section aria-labelledby="libros-titulo" className="rounded-2xl border border-marino-200 bg-white p-5 sm:p-7 shadow-xs">
        <h2 id="libros-titulo" className="inline-flex items-center gap-2 text-2xl text-marino-800">
          <Library aria-hidden="true" size={24} className="text-oro-500" />
          <span>Libros que conserva la parroquia</span>
        </h2>
        <p className="prosa-guia mt-1.5 text-sm text-carbon-500">
          Esto te indica si tu registro <em>puede</em> estar aquí. No incluye nombres personales: la búsqueda
          se realiza en el libro físico a través de WhatsApp.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {grupos.map((grupo) => (
            <div
              key={grupo.tipo}
              className="rounded-xl border border-marino-200/80 bg-gradient-to-br from-white to-marino-50/70 p-4 shadow-xs transition-all duration-200 hover:border-marino-300 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-marino-800 inline-flex items-center gap-2">
                <BookMarked aria-hidden="true" size={18} className="text-oro-500 shrink-0" />
                <span>{grupo.tipo}</span>
              </h3>
              <ul className="mt-2.5 flex flex-col divide-y divide-marino-100">
                {grupo.tomos.map((t) => (
                  <li key={t.tomo} className="flex items-center justify-between py-1.5 text-xs sm:text-sm">
                    <span className="font-medium text-carbon-800">Tomo {t.tomo}</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-marino-100/90 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-marino-900">
                      <Calendar aria-hidden="true" size={11} className="text-marino-600" />
                      {t.desde} – {t.hasta}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {libros.nota && <p className="aux mt-5 border-t border-marino-100 pt-3 text-xs">{libros.nota}</p>}
        <p className="aux mt-1.5 text-xs">Actualizado el {fechaLarga(libros.actualizado)}.</p>
      </section>
    </div>
  )
}

export const Component = Registros
