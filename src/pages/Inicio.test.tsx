import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { SACRAMENTOS_PRINCIPALES } from '../features/sacramentos/config/definiciones'
import { avisos, comunidades, parroquia } from '../lib/content'
import { Inicio } from './Inicio'

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }: { children: ReactNode }) => children,
}))

function renderInicio(): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={['/']}>
      <Inicio />
    </MemoryRouter>,
  )
}

describe('Inicio', () => {
  it('renderiza portada con SEO, hero, foto parroquial y accesos principales', () => {
    const html = renderInicio()

    expect(html).toContain('<title>Parroquia Santa Cruz · Chiquimulilla</title>')
    expect(html).toContain('Parroquia Santa Cruz')
    expect(html).toContain('href="/sacramentos"')
    expect(html).toContain('href="/historia"')
    expect(html).toContain('href="/registros"')
    if (comunidades.length > 0) {
      expect(html).toContain('href="/comunidades"')
    }
    if (parroquia.foto) {
      expect(html).toContain(`src="${parroquia.foto}"`)
    }
    if (parroquia.fotoPie) {
      expect(html).toContain(parroquia.fotoPie)
    }
  })

  it('lista los seis sacramentos principales', () => {
    const html = renderInicio()
    for (const def of SACRAMENTOS_PRINCIPALES) {
      expect(html).toContain(def.nombre)
      expect(html).toContain(`href="/sacramentos/${def.slug}"`)
    }
  })

  it('muestra la ubicación parroquial y hasta dos avisos destacados', () => {
    const html = renderInicio()
    const destacados = avisos.filter((a) => a.destacado).slice(0, 2)

    if (destacados.length > 0) {
      expect(html).toContain('Avisos de la Parroquia')
      for (const aviso of destacados) {
        expect(html).toContain(aviso.titulo)
      }
    } else {
      expect(html).not.toContain('Avisos de la Parroquia')
    }

    expect(html).toContain('Dónde estamos')
    expect(html).toContain(parroquia.direccion ?? '')
  })
})
