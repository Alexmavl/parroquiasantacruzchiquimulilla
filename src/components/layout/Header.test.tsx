import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

function renderHeader(ruta = '/'): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[ruta]}>
      <Header />
    </MemoryRouter>,
  )
}

describe('Header', () => {
  it('renderiza la marca parroquial, botón móvil cerrado y los cinco enlaces principales', () => {
    const html = renderHeader('/')

    expect(html).toContain('Parroquia Santa Cruz')
    expect(html).toContain('Chiquimulilla, Santa Rosa')
    expect(html).toContain('aria-expanded="false"')
    expect(html).toContain('aria-label="Abrir menú de navegación"')
    expect(html).not.toContain('id="menu-navegacion"')

    for (const ruta of ['/', '/sacramentos', '/horarios', '/comunidades', '/registros']) {
      expect(html).toContain(`href="${ruta}"`)
    }
  })

  it('marca el enlace activo según la ruta actual', () => {
    const htmlInicio = renderHeader('/')
    expect(htmlInicio).toMatch(/<a[^>]*aria-current="page"[^>]*href="\/"[^>]*>Inicio<\/a>/)
    expect(htmlInicio).not.toMatch(/<a[^>]*aria-current="page"[^>]*href="\/horarios"/)

    const htmlHorarios = renderHeader('/horarios')
    expect(htmlHorarios).toMatch(
      /<a[^>]*aria-current="page"[^>]*href="\/horarios"[^>]*>Horarios<\/a>/,
    )
    expect(htmlHorarios).not.toMatch(/<a[^>]*aria-current="page"[^>]*href="\/"[^>]*>Inicio<\/a>/)
  })
})
