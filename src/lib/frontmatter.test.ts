import { describe, expect, it } from 'vitest'
import { parseFrontmatter } from './frontmatter'

describe('parseFrontmatter', () => {
  it('devuelve data vacía y cuerpo recortado cuando no hay bloque frontmatter', () => {
    expect(parseFrontmatter('  Solo texto plano  \n')).toEqual({
      data: {},
      body: 'Solo texto plano',
    })
  })

  it('parsea strings, números, negativos, decimales, booleanos y comillas', () => {
    const doc = [
      '---',
      'titulo: "Parroquia Santa Cruz"',
      "subtitulo: 'Chiquimulilla'",
      'orden: 1',
      'latitud: 14.0841',
      'longitud: -90.38',
      'destacado: true',
      'oculto: false',
      'vacio: ""',
      'url-mapa: https://www.openstreetmap.org/?mlat=14&mlon=-90',
      '---',
      '',
      'Cuerpo del documento.',
      '',
    ].join('\n')

    expect(parseFrontmatter(doc)).toEqual({
      data: {
        titulo: 'Parroquia Santa Cruz',
        subtitulo: 'Chiquimulilla',
        orden: 1,
        latitud: 14.0841,
        longitud: -90.38,
        destacado: true,
        oculto: false,
        vacio: '',
        'url-mapa': 'https://www.openstreetmap.org/?mlat=14&mlon=-90',
      },
      body: 'Cuerpo del documento.',
    })
  })

  it('soporta saltos de línea CRLF e ignora líneas sin formato clave: valor', () => {
    const doc = '---\r\n# comentario\r\n\r\nnombre: Capilla San José\r\nlinea-invalida\r\n---\r\nCuerpo CRLF\r\n'
    expect(parseFrontmatter(doc)).toEqual({
      data: { nombre: 'Capilla San José' },
      body: 'Cuerpo CRLF',
    })
  })

  it('conserva como texto valores que parecen números incompletos o mixtos', () => {
    const doc = ['---', 'codigo: 14.08.01', 'fecha: 2026-02-14', '---', ''].join('\n')
    expect(parseFrontmatter(doc)).toEqual({
      data: {
        codigo: '14.08.01',
        fecha: '2026-02-14',
      },
      body: '',
    })
  })
})
