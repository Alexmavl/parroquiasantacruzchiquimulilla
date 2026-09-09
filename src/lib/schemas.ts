import { z } from 'zod'

/**
 * Esquemas de todo el contenido editable en `/content`.
 * Se validan al construir (`scripts/validar-contenido.ts`, paso previo al build):
 * si un JSON no cumple, el build falla.
 */

const anio = z.number().int().gte(1500).lte(2100)

export const LibroSchema = z.object({
  tipo: z.string().min(1),
  tomo: z.string().min(1),
  desde: anio,
  hasta: anio,
})

export const LibrosSchema = z
  .object({
    actualizado: z.iso.date(),
    libros: z.array(LibroSchema).min(1),
    nota: z.string().optional(),
  })
  .refine((d) => d.libros.every((l) => l.hasta >= l.desde), {
    message: 'Un libro no puede terminar antes de empezar (hasta < desde).',
  })

const bloqueHorario = z.object({
  dia: z.string().min(1),
  horas: z.array(z.string().min(1)),
  lugar: z.string().optional(),
  nota: z.string().optional(),
})

export const HorariosSchema = z.object({
  misas: z.array(bloqueHorario).min(1),
  confesiones: z.array(bloqueHorario).min(1),
  despacho: z.array(bloqueHorario).min(1),
})

/** Texto vacío o nulo se normaliza a `undefined` (los campos del CMS llegan como ""). */
const opcional = z
  .union([z.string(), z.number(), z.boolean(), z.null()])
  .optional()
  .transform((v) =>
    v === null || v === undefined || String(v).trim() === '' ? undefined : String(v).trim(),
  )

/** Coordenada opcional: acepta número, string numérica, null o "". */
const coordenada = z
  .union([z.number(), z.string(), z.null()])
  .optional()
  .transform((v) => {
    if (typeof v === 'number') return v
    if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v)
    return undefined
  })

/** Hosts permitidos para el iframe del mapa (evita pegar cualquier URL). */
const HOSTS_MAPA = ['google.com', 'www.google.com', 'maps.google.com', 'www.openstreetmap.org']

const mapaEmbed = opcional.refine(
  (v) => {
    if (!v) return true
    try {
      return HOSTS_MAPA.includes(new URL(v).hostname)
    } catch {
      return false
    }
  },
  { message: 'mapaEmbedUrl debe ser un enlace de Google Maps u OpenStreetMap.' },
)

export const ParroquiaSchema = z.object({
  direccion: opcional,
  mapaEmbedUrl: mapaEmbed,
  latitud: coordenada,
  longitud: coordenada,
  facebook: opcional,
  foto: opcional,
  fotoPie: opcional,
})

/**
 * Templo de una comunidad (`content/comunidades/*.md`).
 * `descripcion` se toma del cuerpo del markdown, no del frontmatter.
 */
export const ComunidadSchema = z.object({
  nombre: z.string().min(1),
  comunidad: opcional,
  descripcion: z.string().min(1),
  direccion: opcional,
  foto: opcional,
  fotoPie: opcional,
  latitud: coordenada,
  longitud: coordenada,
  mapaEmbedUrl: mapaEmbed,
  misa: opcional,
  orden: coordenada,
})

export type Libros = z.infer<typeof LibrosSchema>
export type Horarios = z.infer<typeof HorariosSchema>
export type Parroquia = z.infer<typeof ParroquiaSchema>
export type Comunidad = z.infer<typeof ComunidadSchema> & { slug: string }

/** Registro nombre-de-archivo → esquema, usado por el validador de build. */
export const ESQUEMAS_JSON = {
  'content/registros/libros.json': LibrosSchema,
  'content/horarios.json': HorariosSchema,
  'content/parroquia.json': ParroquiaSchema,
} as const
