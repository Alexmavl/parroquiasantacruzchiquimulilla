import { MapPin } from 'lucide-react'
import type { ReactElement } from 'react'
import { IconoGoogleMaps, IconoWaze } from '../icons/marcas'
import { type DatosUbicacion, mapaEmbedDe, rutasHacia, tieneUbicacion } from '../lib/content'

interface Props extends DatosUbicacion {
  /** Nombre del lugar, para el título accesible del mapa. */
  nombre?: string
}

/**
 * Dirección + mapa incrustado + botones "Cómo llegar". Reutilizable para la
 * parroquia y para cada templo de comunidad.
 */
export function Ubicacion({ nombre, ...u }: Props): ReactElement | null {
  if (!tieneUbicacion(u)) return null
  const rutas = rutasHacia(u)
  const mapa = mapaEmbedDe(u)

  return (
    <div className="flex flex-col gap-4">
      {u.direccion && (
        <p className="flex items-start gap-2 text-sm sm:text-base text-carbon-700">
          <MapPin aria-hidden="true" size={18} className="mt-1 shrink-0 text-oro-500" />
          <span>{u.direccion}</span>
        </p>
      )}

      {mapa && (
        <div className="overflow-hidden rounded-xl border border-marino-200/90 shadow-2xs">
          <iframe
            src={mapa}
            title={nombre ? `Mapa de ${nombre}` : 'Mapa'}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0"
          />
        </div>
      )}

      {rutas && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={rutas.google}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secundario text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs group"
          >
            <IconoGoogleMaps size={17} className="text-red-600 transition-transform group-hover:scale-110" />
            <span>Cómo llegar con Google Maps</span>
          </a>
          {rutas.waze && (
            <a
              href={rutas.waze}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secundario text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs group"
            >
              <IconoWaze size={18} className="text-sky-500 transition-transform group-hover:scale-110" />
              <span>Abrir en Waze</span>
            </a>
          )}
        </div>
      )}
    </div>
  )
}
