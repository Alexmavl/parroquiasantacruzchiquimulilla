import { Church, MapPin } from 'lucide-react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../../../components/Seo'
import { Migas } from '../../../components/ui/Migas'
import { comunidades, resolveAsset } from '../../../lib/content'

/** Primer párrafo de la descripción, para el resumen de la tarjeta. */
function resumen(descripcion: string): string {
  const p = descripcion
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .find((b) => b.length > 0 && !b.startsWith('#'))
  return p ?? ''
}

export function ComunidadesIndex(): ReactElement {
  return (
    <div className="space-y-8">
      <Seo
        titulo="Templos de las comunidades"
        descripcion="Capillas y templos de las comunidades de la Parroquia Santa Cruz de Chiquimulilla: ubicación, fotos y horarios."
      />
      <Migas items={[{ nombre: 'Inicio', href: '/' }, { nombre: 'Comunidades' }]} />

      <header>
        <h1 className="inline-flex items-center gap-3 text-marino-800">
          <Church aria-hidden="true" size={34} className="text-oro-500" />
          <span>Templos de las comunidades</span>
        </h1>
        <hr className="filete" />
        <p className="prosa-guia text-base sm:text-lg leading-relaxed text-carbon-700">
          Capillas y templos de las aldeas y caseríos que atiende la parroquia. Cada uno con su
          ubicación en el mapa y su horario de misa.
        </p>
      </header>

      {comunidades.length === 0 ? (
        <p className="aux mt-8">Aún no hay templos publicados.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {comunidades.map((c) => (
            <li key={c.slug} className="flex">
              <Link
                to={`/comunidades/${c.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-xl border border-marino-200 bg-white no-underline shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-marino-400 hover:shadow-lg focus-visible:border-marino-600"
              >
                {c.foto && (
                  <div className="overflow-hidden aspect-[3/2] w-full bg-marino-50">
                    <img
                      src={resolveAsset(c.foto)}
                      alt={c.fotoPie ?? `Templo de ${c.nombre}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-xl font-serif text-marino-800 transition-colors duration-200 group-hover:text-marino-900 inline-flex items-center gap-2">
                    <Church aria-hidden="true" size={20} className="text-marino-600 shrink-0" />
                    <span>{c.nombre}</span>
                  </h2>
                  {c.comunidad && (
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-marino-700 bg-marino-50 px-2 py-0.5 rounded-md w-fit">
                      <MapPin aria-hidden="true" size={12} />
                      {c.comunidad}
                    </p>
                  )}
                  <p className="mt-3 text-sm line-clamp-3 text-carbon-700 leading-relaxed">
                    {resumen(c.descripcion)}
                  </p>
                  <span className="mt-auto pt-4 text-xs font-semibold text-marino-600 group-hover:text-marino-800">
                    Ver templo y cómo llegar →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const Component = ComunidadesIndex
