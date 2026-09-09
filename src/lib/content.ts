import historiaMd from '../../content/historia.md?raw'
import horariosRaw from '../../content/horarios.json'
import parroquiaRaw from '../../content/parroquia.json'
import librosRaw from '../../content/registros/libros.json'
import { parseFrontmatter } from './frontmatter'
import {
  type Comunidad,
  ComunidadSchema,
  HorariosSchema,
  LibrosSchema,
  ParroquiaSchema,
} from './schemas'

/**
 * Contenido tipado para las páginas. El `parse` corre al cargar el módulo, así que
 * un contenido inválido rompe también el build de las páginas, no solo el validador previo.
 */
export const libros = LibrosSchema.parse(librosRaw)
export const horarios = HorariosSchema.parse(horariosRaw)
export const parroquia = ParroquiaSchema.parse(parroquiaRaw)

/**
 * Resuelve rutas de archivos estáticos (imágenes en /public) tomando en cuenta el base path de GitHub Pages.
 */
export function resolveAsset(path?: string): string | undefined {
  if (!path) return undefined
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  return `${cleanBase}${cleanPath}`
}

export interface DatosUbicacion {
  direccion?: string
  mapaEmbedUrl?: string
  latitud?: number
  longitud?: number
}

export function coordenadasDe(u: DatosUbicacion): { lat: number; lng: number } | undefined {
  return u.latitud != null && u.longitud != null ? { lat: u.latitud, lng: u.longitud } : undefined
}

export function tieneUbicacion(u: DatosUbicacion): boolean {
  return Boolean(u.direccion || u.mapaEmbedUrl || coordenadasDe(u))
}

/**
 * URL del mapa incrustado: la que se pegó en el CMS, o —si solo hay
 * coordenadas— una de OpenStreetMap generada al vuelo (gratis, sin clave).
 */
export function mapaEmbedDe(u: DatosUbicacion): string | undefined {
  if (u.mapaEmbedUrl) return u.mapaEmbedUrl
  const c = coordenadasDe(u)
  if (!c) return undefined
  const d = 0.006
  const bbox = [c.lng - d, c.lat - d, c.lng + d, c.lat + d].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${c.lat},${c.lng}`
}

/** Enlaces "Cómo llegar" que abren la app nativa (Google Maps / Waze) si está instalada. */
export function rutasHacia(u: DatosUbicacion): { google: string; waze?: string } | undefined {
  const c = coordenadasDe(u)
  if (c) {
    return {
      google: `https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`,
      waze: `https://waze.com/ul?ll=${c.lat},${c.lng}&navigate=yes`,
    }
  }
  if (u.direccion) {
    return {
      google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.direccion)}`,
    }
  }
  return undefined
}

export const hayUbicacionParroquia = tieneUbicacion(parroquia)

// --- Registros --------------------------------------------------------------

/** Libros agrupados por tipo de sacramento, cada grupo ordenado por año de inicio. */
export function librosPorTipo(): { tipo: string; tomos: typeof libros.libros }[] {
  const grupos = new Map<string, typeof libros.libros>()
  for (const libro of libros.libros) {
    const lista = grupos.get(libro.tipo) ?? []
    lista.push(libro)
    grupos.set(libro.tipo, lista)
  }
  return [...grupos.entries()]
    .map(([tipo, tomos]) => ({ tipo, tomos: [...tomos].sort((a, b) => a.desde - b.desde) }))
    .sort((a, b) => a.tipo.localeCompare(b.tipo, 'es'))
}

// --- Avisos ----------------------------------------------------------------

export interface Aviso {
  slug: string
  titulo: string
  fecha: string
  destacado: boolean
  cuerpo: string
}

const avisosRaw = import.meta.glob('../../content/avisos/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugDeRuta(ruta: string): string {
  return ruta.split('/').pop()?.replace(/\.md$/, '') ?? ruta
}

/** Avisos ordenados por fecha, del más reciente al más antiguo. */
export const avisos: Aviso[] = Object.entries(avisosRaw)
  .map(([ruta, texto]) => {
    const { data, body } = parseFrontmatter(texto)
    const slug = slugDeRuta(ruta)
    return {
      slug,
      titulo: String(data.titulo ?? slug),
      fecha: String(data.fecha ?? ''),
      destacado: data.destacado === true,
      cuerpo: body,
    }
  })
  .sort((a, b) => b.fecha.localeCompare(a.fecha))

// --- Comunidades (templos de las comunidades) -----------------------------

const comunidadesRaw = import.meta.glob('../../content/comunidades/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Templos de las comunidades, ordenados por `orden` y luego por nombre. */
export const comunidades: Comunidad[] = Object.entries(comunidadesRaw)
  .map(([ruta, texto]) => {
    const { data, body } = parseFrontmatter(texto)
    const slug = slugDeRuta(ruta)
    const parsed = ComunidadSchema.parse({ ...data, descripcion: body })
    return { ...parsed, slug }
  })
  .sort(
    (a, b) =>
      (a.orden ?? 999) - (b.orden ?? 999) || a.nombre.localeCompare(b.nombre, 'es'),
  )

export function getComunidad(slug: string): Comunidad | undefined {
  return comunidades.find((c) => c.slug === slug)
}

// --- Fechas / historia ---------------------------------------------------

/** "2026-02-14" → "14 de febrero de 2026". */
export function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]
  return `${d} de ${meses[(m ?? 1) - 1]} de ${y}`
}

/**
 * Primer párrafo real de la historia, para el adelanto de la portada.
 * Vacío mientras `historia.md` siga siendo el marcador ("texto pendiente").
 */
export const historiaIntro: string = (() => {
  if (/texto pendiente/i.test(historiaMd)) return ''
  const cuerpo = historiaMd
    .replace(/^---\n[\s\S]*?\n---\n?/, '')
    .replace(/^#\s+.*\n+/, '')
    .trim()
  const parrafo = cuerpo
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .find((b) => b.length > 0 && !b.startsWith('#') && !/^\*.*\*$/.test(b))
  return parrafo ?? ''
})()
