import { Calendar, Church, Clock, MapPin, MessageCircle } from 'lucide-react'
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Markdown } from '../../../components/Markdown'
import { Seo } from '../../../components/Seo'
import { Ubicacion } from '../../../components/Ubicacion'
import { BotonWhatsApp } from '../../../components/ui/BotonWhatsApp'
import { Migas } from '../../../components/ui/Migas'
import { comunidades, getComunidad, resolveAsset } from '../../../lib/content'
import { enlaceGeneral } from '../../../lib/whatsapp'
import { NoEncontrado } from '../../../pages/NoEncontrado'

export function ComunidadDetalle(): ReactElement {
  const { slug } = useParams()
  const c = slug ? getComunidad(slug) : undefined

  if (!c) return <NoEncontrado />

  const mensajeWhatsApp = enlaceGeneral(
    `Buen día. Deseo consultar sobre la comunidad y templo de ${c.nombre}${c.comunidad ? ` (${c.comunidad})` : ''}.`,
  )

  return (
    <article className="space-y-8">
      <Seo titulo={c.nombre} descripcion={c.comunidad ?? `Templo de ${c.nombre}`} />

      <div className="space-y-3">
        <Migas
          items={[
            { nombre: 'Inicio', href: '/' },
            { nombre: 'Comunidades', href: '/comunidades' },
            { nombre: c.nombre },
          ]}
        />
        <header>
          <h1 className="inline-flex items-center gap-3 text-marino-800">
            <Church aria-hidden="true" size={32} className="text-oro-500" />
            <span>{c.nombre}</span>
          </h1>
          {c.comunidad && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-marino-700 bg-marino-50 px-2.5 py-1 rounded-md border border-marino-200/60">
                <MapPin aria-hidden="true" size={13} />
                <span>{c.comunidad}</span>
              </span>
            </div>
          )}
          <hr className="filete" />
        </header>
      </div>

      {/* Imagen Realista y Natural sin contenedor/marco */}
      {c.foto && (
        <div>
          <img
            src={resolveAsset(c.foto)}
            alt={c.fotoPie ?? `Templo de ${c.nombre}`}
            loading="lazy"
            className="w-full rounded-2xl object-cover max-h-[480px] shadow-xl shadow-slate-900/10 transition-transform duration-500 hover:scale-[1.01]"
          />
          {c.fotoPie && (
            <p className="aux mt-2 text-center text-xs text-carbon-500 font-medium">
              {c.fotoPie}
            </p>
          )}
        </div>
      )}

      {/* Descripción y Reseña */}
      <div className="rounded-2xl border border-marino-200/80 bg-white p-5 sm:p-7 shadow-xs">
        <h2 className="text-xl font-serif text-marino-800 mb-3">Sobre este templo</h2>
        <div className="prose max-w-none text-carbon-700 leading-relaxed">
          <Markdown>{c.descripcion}</Markdown>
        </div>
      </div>

      {/* Horario de Misa */}
      {c.misa && (
        <div className="rounded-2xl border border-marino-200 bg-gradient-to-r from-marino-50/80 via-white to-marino-50/80 p-5 sm:p-6 shadow-xs flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-marino-100 text-marino-700">
            <Clock aria-hidden="true" size={22} />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-marino-600 block">
              Santa Misa en la comunidad
            </span>
            <p className="text-base font-semibold text-marino-900 mt-0.5">{c.misa}</p>
          </div>
        </div>
      )}

      {/* Ubicación y Cómo llegar */}
      <section aria-labelledby="ubicacion-titulo" className="rounded-2xl border border-marino-200 bg-white p-5 sm:p-7 shadow-xs">
        <h2 id="ubicacion-titulo" className="mb-4 inline-flex items-center gap-2 text-2xl text-marino-800">
          <MapPin aria-hidden="true" size={24} className="text-marino-600" />
          <span>Cómo llegar</span>
        </h2>
        <Ubicacion
          nombre={c.nombre}
          direccion={c.direccion}
          mapaEmbedUrl={c.mapaEmbedUrl}
          latitud={c.latitud}
          longitud={c.longitud}
        />
        {!c.direccion && !c.mapaEmbedUrl && c.latitud == null && (
          <p className="aux text-xs text-carbon-500">Ubicación geográfica pendiente de publicar.</p>
        )}
      </section>

      {/* Sección de Contacto Ordenada y Asertiva */}
      <section className="rounded-2xl border border-marino-200 bg-gradient-to-br from-white to-marino-50/60 p-5 sm:p-7 shadow-xs">
        <h2 className="mb-2 text-xl font-serif text-marino-800 inline-flex items-center gap-2">
          <MessageCircle aria-hidden="true" size={22} className="text-marino-600" />
          <span>Contacto y Consultas</span>
        </h2>
        <p className="prosa-guia text-sm text-carbon-600 mb-4">
          ¿Deseas consultar sobre celebraciones, patronales o trámites para {c.nombre}? Escríbenos directamente o comunícate con el despacho parroquial.
        </p>
        <BotonWhatsApp href={mensajeWhatsApp} etiqueta={`Consultar sobre ${c.nombre}`} />
      </section>
    </article>
  )
}

export const Component = ComunidadDetalle

export function getStaticPaths(): string[] {
  return comunidades.map((c) => `comunidades/${c.slug}`)
}
