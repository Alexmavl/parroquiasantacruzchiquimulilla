import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as content from '../../../lib/content'
import { type Comunidad, ComunidadSchema } from '../../../lib/schemas'
import { ComunidadDetalle, getStaticPaths } from './ComunidadDetalle'

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }: { children: ReactNode }) => children,
}))

function crearComunidad(slug: string, datos: Record<string, unknown>): Comunidad {
  return { ...ComunidadSchema.parse(datos), slug }
}

function renderDetalle(ruta: string): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/comunidades/:slug" element={<ComunidadDetalle />} />
        <Route path="/comunidades" element={<ComunidadDetalle />} />
      </Routes>
    </MemoryRouter>,
  )
}

const comunidadCompleta = crearComunidad('prueba-completa', {
  nombre: 'Capilla San Pedro',
  comunidad: 'Aldea El Pinal',
  descripcion: 'Templo construido por las familias del lugar.',
  direccion: 'Km 12 carretera a la costa',
  foto: '/images/san-pedro.jpg',
  fotoPie: 'Fachada principal de la capilla',
  latitud: 14.08,
  longitud: -90.38,
  misa: 'Domingos 9:00 a. m.',
  orden: 1,
})

const comunidadMinima = crearComunidad('prueba-minima', {
  nombre: 'Ermita San Marcos',
  descripcion: 'Descripción básica de la ermita.',
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ComunidadDetalle', () => {
  it('renderiza una comunidad real del contenido con su reseña, misa y ubicación', () => {
    const html = renderDetalle('/comunidades/ejemplo-san-jose')
    expect(html).toContain('Capilla San José')
    expect(html).toContain('Aldea Las Lisas')
    expect(html).toContain('Domingos 8:00 a. m.')
    expect(html).toContain('Cómo llegar con Google Maps')
    expect(html).not.toContain('Ubicación geográfica pendiente de publicar.')
  })

  it('muestra todos los bloques opcionales, metadatos SEO, foto con pie y enlace de WhatsApp', () => {
    vi.spyOn(content, 'getComunidad').mockReturnValue(comunidadCompleta)
    const html = renderDetalle('/comunidades/prueba-completa')

    expect(html).toContain('<title>Capilla San Pedro — Parroquia Santa Cruz · Chiquimulilla</title>')
    expect(html).toContain('content="Aldea El Pinal"')
    expect(html).toContain('Aldea El Pinal')
    expect(html).toContain('src="/images/san-pedro.jpg"')
    expect(html).toContain('alt="Fachada principal de la capilla"')
    expect(html).toContain('Fachada principal de la capilla')
    expect(html).toContain('Santa Misa en la comunidad')
    expect(html).toContain('Domingos 9:00 a. m.')
    expect(html).toContain('Km 12 carretera a la costa')
    expect(html).not.toContain('Ubicación geográfica pendiente de publicar.')
    expect(html).toContain('Consultar sobre Capilla San Pedro')
    expect(html).toContain(encodeURIComponent('Capilla San Pedro (Aldea El Pinal)'))
  })

  it('omite los bloques opcionales cuando faltan y muestra respaldos de SEO y ubicación', () => {
    vi.spyOn(content, 'getComunidad').mockReturnValue(comunidadMinima)
    const html = renderDetalle('/comunidades/prueba-minima')

    expect(html).toContain('Ermita San Marcos')
    expect(html).toContain('content="Templo de Ermita San Marcos"')
    expect(html).not.toContain('<div class="mt-2">')
    expect(html).not.toContain('<img')
    expect(html).not.toContain('Santa Misa en la comunidad')
    expect(html).toContain('Ubicación geográfica pendiente de publicar.')
    expect(html).toContain(encodeURIComponent('de Ermita San Marcos.'))
    expect(html).not.toContain(encodeURIComponent('Ermita San Marcos ('))
  })

  it('usa el nombre del templo como texto alternativo cuando hay foto pero no pie de foto', () => {
    vi.spyOn(content, 'getComunidad').mockReturnValue({
      ...comunidadMinima,
      foto: '/images/ermita.jpg',
    })
    const html = renderDetalle('/comunidades/prueba-minima')

    expect(html).toContain('src="/images/ermita.jpg"')
    expect(html).toContain('alt="Templo de Ermita San Marcos"')
    expect(html).not.toContain('aux mt-2')
  })

  it('oculta el aviso de ubicación pendiente cuando solo existe dirección o mapaEmbedUrl', () => {
    vi.spyOn(content, 'getComunidad').mockReturnValueOnce({
      ...comunidadMinima,
      direccion: 'Calle principal',
    })
    const htmlDir = renderDetalle('/comunidades/prueba-minima')
    expect(htmlDir).toContain('Calle principal')
    expect(htmlDir).not.toContain('Ubicación geográfica pendiente de publicar.')

    vi.spyOn(content, 'getComunidad').mockReturnValueOnce({
      ...comunidadMinima,
      mapaEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=0,0,1,1',
    })
    const htmlMapa = renderDetalle('/comunidades/prueba-minima')
    expect(htmlMapa).toContain('<iframe')
    expect(htmlMapa).not.toContain('Ubicación geográfica pendiente de publicar.')
  })

  it('muestra ubicación pendiente si las coordenadas están incompletas (latitud sin longitud)', () => {
    vi.spyOn(content, 'getComunidad').mockReturnValueOnce({
      ...comunidadMinima,
      latitud: 14.08,
    })
    const html = renderDetalle('/comunidades/prueba-minima')
    expect(html).not.toContain('<iframe')
    expect(html).toContain('Ubicación geográfica pendiente de publicar.')
  })

  it('muestra la página NoEncontrado si el slug no existe o falta en la ruta', () => {
    const htmlDesconocido = renderDetalle('/comunidades/no-existe-jamas')
    expect(htmlDesconocido).toContain('No encontramos esta página')

    const htmlSinSlug = renderDetalle('/comunidades')
    expect(htmlSinSlug).toContain('No encontramos esta página')
  })

  it('genera rutas estáticas para todas las comunidades cargadas', () => {
    const paths = getStaticPaths()
    expect(paths).toEqual(content.comunidades.map((c) => `comunidades/${c.slug}`))
    expect(paths.length).toBeGreaterThan(0)
  })
})
