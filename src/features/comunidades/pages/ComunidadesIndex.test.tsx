import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { comunidades } from '../../../lib/content'
import { ComunidadesIndex } from './ComunidadesIndex'

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }: { children: ReactNode }) => children,
}))

describe('ComunidadesIndex', () => {
  it('lista todas las comunidades publicadas con enlaces, ubicación y resumen', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter initialEntries={['/comunidades']}>
        <ComunidadesIndex />
      </MemoryRouter>,
    )

    expect(html).toContain('Templos de las comunidades')
    expect(html).toContain('Ver templo y cómo llegar →')

    for (const c of comunidades) {
      expect(html).toContain(c.nombre)
      expect(html).toContain(`href="/comunidades/${c.slug}"`)
      if (c.comunidad) {
        expect(html).toContain(c.comunidad)
      }
    }
  })
})
