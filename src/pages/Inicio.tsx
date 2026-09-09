import { Bell, BookOpen, Calendar, Church, FileText, Flame, MapPin } from 'lucide-react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { Ubicacion } from '../components/Ubicacion'
import { TarjetaSacramento } from '../components/sacramentos/TarjetaSacramento'
import { SACRAMENTOS_PRINCIPALES } from '../features/sacramentos/config/definiciones'
import {
  avisos,
  comunidades,
  fechaLarga,
  hayUbicacionParroquia,
  historiaIntro,
  parroquia,
  resolveAsset,
} from '../lib/content'

export function Inicio(): ReactElement {
  const destacados = avisos.filter((a) => a.destacado).slice(0, 2)

  return (
    <div className="space-y-12 sm:space-y-14">
      <Seo
        titulo="Parroquia Santa Cruz · Chiquimulilla"
        descripcion="Sacramentos, horarios de misa y confesión, y consulta de registros parroquiales de la Parroquia Santa Cruz de Chiquimulilla."
      />

      {/* Hero Principal & Historia de la Parroquia (Unificado, Abierto y Elegante) */}
      <section>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className={parroquia.foto ? 'lg:col-span-7' : 'lg:col-span-12'}>
            <div className="inline-flex items-center gap-2 rounded-full border border-marino-200 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-marino-700 shadow-xs mb-3">
              <Church aria-hidden="true" size={14} className="text-oro-500" />
              <span>Diócesis de Santa Rosa de Lima</span>
            </div>
            <h1 className="text-marino-800">Parroquia Santa Cruz</h1>
            <hr className="filete" />

            {/* Párrafo de Bienvenida e Historia */}
            <p className="prosa-guia text-lg sm:text-xl leading-relaxed text-carbon-800">
              {historiaIntro ||
                'Chiquimulilla, Santa Rosa. Encuentra aquí los requisitos de cada sacramento, los horarios de misa y confesión, y cómo consultar registros parroquiales.'}
            </p>

            {/* Enlaces y Accesos Destacados */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/sacramentos" className="btn btn-primario text-sm">
                <Flame aria-hidden="true" size={16} className="text-oro-400" />
                <span>Ver Sacramentos</span>
              </Link>
              <Link
                to="/historia"
                className="btn btn-secundario text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <BookOpen aria-hidden="true" size={16} className="text-oro-500" />
                <span>Conoce la historia</span>
              </Link>
              {comunidades.length > 0 && (
                <Link
                  to="/comunidades"
                  className="btn btn-secundario text-sm inline-flex items-center gap-2 shadow-xs"
                >
                  <Church aria-hidden="true" size={16} className="text-oro-500" />
                  <span>Templos de las comunidades</span>
                </Link>
              )}
            </div>
          </div>

          {parroquia.foto && (
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group w-full max-w-md lg:max-w-none">
                <img
                  src={resolveAsset(parroquia.foto)}
                  alt={parroquia.fotoPie ?? 'Templo de la Parroquia Santa Cruz de Chiquimulilla'}
                  className="w-full h-auto max-h-[480px] rounded-2xl object-contain shadow-xl shadow-slate-900/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-marino-950/20"
                />
                {parroquia.fotoPie && (
                  <p className="mt-2.5 text-center text-xs text-carbon-500 font-medium">
                    {parroquia.fotoPie}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sacramentos Section */}
      <section aria-labelledby="sacramentos-titulo">
        <div className="mb-4 flex flex-col gap-1">
          <h2 id="sacramentos-titulo" className="inline-flex items-center gap-2 text-2xl text-marino-800">
            <Flame aria-hidden="true" size={24} className="text-oro-500" />
            <span>Sacramentos</span>
          </h2>
          <p className="prosa-guia text-sm text-carbon-500">
            Elige un sacramento para ver los requisitos, documentación y cómo iniciar tu trámite.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SACRAMENTOS_PRINCIPALES.map((def) => (
            <li key={def.slug} className="flex">
              <TarjetaSacramento def={def} nivel={3} />
            </li>
          ))}
        </ul>
      </section>

      {/* Avisos */}
      {destacados.length > 0 && (
        <section aria-labelledby="avisos-titulo">
          <h2 id="avisos-titulo" className="mb-4 inline-flex items-center gap-2 text-2xl text-marino-800">
            <Bell aria-hidden="true" size={24} className="text-oro-500" />
            <span>Avisos de la Parroquia</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {destacados.map((a) => (
              <article
                key={a.slug}
                className="group relative flex flex-col rounded-xl border border-marino-200 bg-white p-4 shadow-xs transition-all duration-300 hover:border-marino-400 hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-marino-800">{a.titulo}</h3>
                </div>
                {a.fecha && (
                  <p className="mb-2 inline-flex items-center gap-1 text-xs font-medium text-marino-600 bg-marino-50 px-2.5 py-0.5 rounded-md w-fit">
                    <Calendar aria-hidden="true" size={12} className="text-oro-500" />
                    {fechaLarga(a.fecha)}
                  </p>
                )}
                <p className="prosa-guia text-sm leading-relaxed text-carbon-700">{a.cuerpo}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Dónde estamos */}
      {hayUbicacionParroquia && (
        <section aria-labelledby="ubicacion-titulo" className="rounded-2xl border border-marino-200/80 bg-white p-5 sm:p-6 shadow-xs">
          <h2 id="ubicacion-titulo" className="mb-3 inline-flex items-center gap-2 text-2xl text-marino-800">
            <MapPin aria-hidden="true" size={24} className="text-oro-500" />
            <span>Dónde estamos</span>
          </h2>
          <div className="mt-3">
            <Ubicacion
              nombre="la Parroquia Santa Cruz"
              direccion={parroquia.direccion}
              mapaEmbedUrl={parroquia.mapaEmbedUrl}
              latitud={parroquia.latitud}
              longitud={parroquia.longitud}
            />
          </div>
        </section>
      )}

      {/* Acceso rápido a registros */}
      <section className="rounded-2xl border border-marino-200 bg-gradient-to-r from-marino-50 via-white to-marino-50 p-6 text-center shadow-xs">
        <h2 className="text-lg font-serif text-marino-900 mb-1">¿Buscas una fe de bautismo, matrimonio o confirmación?</h2>
        <p className="prosa-guia mx-auto text-sm text-carbon-500 mb-3">
          Consulta qué libros parroquiales se conservan y solicita la búsqueda asistida en el archivo.
        </p>
        <Link
          to="/registros"
          className="btn btn-primario text-sm inline-flex items-center gap-2"
        >
          <FileText aria-hidden="true" size={16} className="text-oro-400" />
          Consultar registros parroquiales
        </Link>
      </section>
    </div>
  )
}

export const Component = Inicio
