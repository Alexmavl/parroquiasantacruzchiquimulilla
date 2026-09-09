import { MapPin, Navigation } from 'lucide-react'
import type { ReactElement } from 'react'
import { type DatosUbicacion, mapaEmbedDe, rutasHacia, tieneUbicacion } from '../lib/content'

interface Props extends DatosUbicacion {
  /** Nombre del lugar, para el título accesible del mapa. */
  nombre?: string
}

/**
 * Dirección + mapa incrustado + botones "Cómo llegar". Reutilizable para la
 * parroquia y para cada templo de comunidad. El mapa es un iframe gratuito
 * (Google Maps u OpenStreetMap): no usa API con clave, no genera costos.
 * Si un dato falta, su parte no se muestra.
 */
export function Ubicacion({ nombre, ...u }: Props): ReactElement | null {
  if (!tieneUbicacion(u)) return null
  const rutas = rutasHacia(u)
  const mapa = mapaEmbedDe(u)

  return (
    <div className="flex flex-col gap-4">
      {u.direccion && (
        <p className="flex items-start gap-2">
          <MapPin aria-hidden="true" size={20} className="mt-1 shrink-0 text-carbon-500" />
          <span>{u.direccion}</span>
        </p>
      )}

      {mapa && (
        <iframe
          src={mapa}
          title={nombre ? `Mapa de ${nombre}` : 'Mapa'}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border border-piedra-200"
        />
      )}

      {rutas && (
        <p className="flex flex-wrap gap-3">
          <a
            href={rutas.google}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secundario"
          >
            <Navigation aria-hidden="true" size={18} />
            Cómo llegar (Google Maps)
          </a>
          {rutas.waze && (
            <a
              href={rutas.waze}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secundario"
            >
              <Navigation aria-hidden="true" size={18} />
              Abrir en Waze
            </a>
          )}
        </p>
      )}
    </div>
  )
}
