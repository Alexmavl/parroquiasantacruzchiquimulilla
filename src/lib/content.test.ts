import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  avisos,
  comunidades,
  coordenadasDe,
  fechaLarga,
  getComunidad,
  libros,
  librosPorTipo,
  mapaEmbedDe,
  resolveAsset,
  rutasHacia,
  tieneUbicacion,
} from './content'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('resolveAsset', () => {
  it('devuelve undefined cuando la ruta falta o está vacía', () => {
    expect(resolveAsset(undefined)).toBeUndefined()
    expect(resolveAsset('')).toBeUndefined()
  })

  it('conserva URLs absolutas http, https y data sin modificarlas', () => {
    expect(resolveAsset('http://ejemplo.org/foto.jpg')).toBe('http://ejemplo.org/foto.jpg')
    expect(resolveAsset('https://ejemplo.org/foto.jpg')).toBe('https://ejemplo.org/foto.jpg')
    expect(resolveAsset('data:image/png;base64,abc')).toBe('data:image/png;base64,abc')
  })

  it('resuelve rutas relativas con o sin barra inicial respetando BASE_URL', () => {
    vi.stubEnv('BASE_URL', '/')
    expect(resolveAsset('/images/templo.jpg')).toBe('/images/templo.jpg')
    expect(resolveAsset('images/templo.jpg')).toBe('/images/templo.jpg')

    vi.stubEnv('BASE_URL', '/parroquia')
    expect(resolveAsset('/images/templo.jpg')).toBe('/parroquia/images/templo.jpg')
    expect(resolveAsset('images/templo.jpg')).toBe('/parroquia/images/templo.jpg')

    vi.stubEnv('BASE_URL', '/parroquia/')
    expect(resolveAsset('/images/templo.jpg')).toBe('/parroquia/images/templo.jpg')

    vi.stubEnv('BASE_URL', '')
    expect(resolveAsset('/images/templo.jpg')).toBe('/images/templo.jpg')
  })
})

describe('utilidades de ubicación', () => {
  it('coordenadasDe exige latitud y longitud presentes (incluyendo 0)', () => {
    expect(coordenadasDe({ latitud: 14.08, longitud: -90.38 })).toEqual({ lat: 14.08, lng: -90.38 })
    expect(coordenadasDe({ latitud: 0, longitud: 0 })).toEqual({ lat: 0, lng: 0 })
    expect(coordenadasDe({ latitud: 14.08 })).toBeUndefined()
    expect(coordenadasDe({ longitud: -90.38 })).toBeUndefined()
    expect(coordenadasDe({})).toBeUndefined()
  })

  it('tieneUbicacion reconoce dirección, mapaEmbedUrl o par completo de coordenadas', () => {
    expect(tieneUbicacion({ direccion: 'Parque central' })).toBe(true)
    expect(tieneUbicacion({ mapaEmbedUrl: 'https://www.openstreetmap.org/export/embed.html' })).toBe(
      true,
    )
    expect(tieneUbicacion({ latitud: 14.08, longitud: -90.38 })).toBe(true)
    expect(tieneUbicacion({ latitud: 14.08 })).toBe(false)
    expect(tieneUbicacion({})).toBe(false)
  })

  it('mapaEmbedDe prioriza mapaEmbedUrl y genera OpenStreetMap con bbox ±0.006 cuando solo hay coordenadas', () => {
    const custom = 'https://www.google.com/maps/embed?pb=123'
    expect(mapaEmbedDe({ mapaEmbedUrl: custom, latitud: 14, longitud: -90 })).toBe(custom)

    const osm = mapaEmbedDe({ latitud: 14, longitud: -90 })
    expect(osm).toBe(
      `https://www.openstreetmap.org/export/embed.html?bbox=${-90 - 0.006},${14 - 0.006},${-90 + 0.006},${14 + 0.006}&layer=mapnik&marker=14,-90`,
    )

    expect(mapaEmbedDe({ direccion: 'Sin coordenadas' })).toBeUndefined()
  })

  it('rutasHacia devuelve Google Maps y Waze con coordenadas, solo Google con dirección, o undefined', () => {
    expect(rutasHacia({ latitud: 14.08, longitud: -90.38, direccion: 'Parque' })).toEqual({
      google: 'https://www.google.com/maps/dir/?api=1&destination=14.08,-90.38',
      waze: 'https://waze.com/ul?ll=14.08,-90.38&navigate=yes',
    })

    expect(rutasHacia({ direccion: 'Parque Central, Chiquimulilla' })).toEqual({
      google:
        'https://www.google.com/maps/search/?api=1&query=Parque%20Central%2C%20Chiquimulilla',
    })

    expect(rutasHacia({})).toBeUndefined()
  })
})

describe('registros, comunidades, avisos y fechas', () => {
  it('librosPorTipo agrupa todos los tomos por tipo ordenados alfabéticamente y por año inicial', () => {
    const grupos = librosPorTipo()
    const totalTomos = grupos.reduce((acc, g) => acc + g.tomos.length, 0)
    expect(totalTomos).toBe(libros.libros.length)

    const tipos = grupos.map((g) => g.tipo)
    expect(tipos).toEqual([...tipos].sort((a, b) => a.localeCompare(b, 'es')))

    for (const grupo of grupos) {
      for (let i = 1; i < grupo.tomos.length; i++) {
        expect(grupo.tomos[i].desde).toBeGreaterThanOrEqual(grupo.tomos[i - 1].desde)
      }
    }
  })

  it('fechaLarga formatea fechas ISO en español', () => {
    expect(fechaLarga('2026-01-01')).toBe('1 de enero de 2026')
    expect(fechaLarga('2026-02-14')).toBe('14 de febrero de 2026')
    expect(fechaLarga('2026-12-31')).toBe('31 de diciembre de 2026')
  })

  it('getComunidad resuelve por slug y devuelve undefined si no existe', () => {
    expect(comunidades.length).toBeGreaterThan(0)
    const primera = comunidades[0]
    expect(getComunidad(primera.slug)).toEqual(primera)
    expect(getComunidad('slug-que-no-existe')).toBeUndefined()
  })

  it('avisos se cargan ordenados de la fecha más reciente a la más antigua', () => {
    for (let i = 1; i < avisos.length; i++) {
      expect(avisos[i - 1].fecha.localeCompare(avisos[i].fecha)).toBeGreaterThanOrEqual(0)
    }
  })
})
