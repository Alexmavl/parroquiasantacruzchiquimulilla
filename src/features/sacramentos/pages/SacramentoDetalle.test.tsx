import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { BloqueContacto } from '../../../components/sacramentos/BloqueContacto'
import { DEFINICIONES, getDefinicion } from '../config/definiciones'
import { SacramentoDetalle, getStaticPaths } from './SacramentoDetalle'

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }: { children: ReactNode }) => children,
}))

function renderSacramento(ruta: string): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/sacramentos/:slug" element={<SacramentoDetalle />} />
        <Route path="/sacramentos" element={<SacramentoDetalle />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SacramentoDetalle y BloqueContacto', () => {
  it('renderiza un sacramento con trámite por WhatsApp, requisitos y horario de despacho', () => {
    const html = renderSacramento('/sacramentos/bautizo')

    expect(html).toContain('Bautizo')
    expect(html).toContain('Requisitos y documentación')
    expect(html).toContain('Cómo iniciar el trámite')
    expect(html).toContain('Solicitar bautizo por WhatsApp')
    expect(html).toContain('Horario de atención en despacho')
  })

  it('muestra el bloque de modalidad relacionada cuando el sacramento tiene alternativa', () => {
    const html = renderSacramento('/sacramentos/primera-comunion')

    expect(html).toContain('Primera comunión')
    expect(html).toContain('/sacramentos/primera-comunion-supletoria')
  })

  it('muestra horarios de confesión y guía breve en modo SIN_SOLICITUD', () => {
    const html = renderSacramento('/sacramentos/confesion')

    expect(html).toContain('Confesión')
    expect(html).not.toContain('Requisitos y documentación')
    expect(html).toContain('Cuándo hay confesiones')
    expect(html).toContain('Horario de confesiones')
    expect(html).toContain('href="/guia-confesion"')
  })

  it('muestra la franja de urgencia para unción de enfermos y BloqueContacto devuelve null en modo URGENCIA', () => {
    const html = renderSacramento('/sacramentos/uncion-de-enfermos')
    expect(html).toContain('Unción de los enfermos')
    expect(html).toContain('Atención inmediata, a cualquier hora')
    expect(html).not.toContain('Cómo iniciar el trámite')

    const uncion = getDefinicion('uncion-de-enfermos')!
    expect(renderToStaticMarkup(<BloqueContacto def={uncion} />)).toBe('')
  })

  it('muestra NoEncontrado para slug desconocido o ausente y genera todas las rutas estáticas', () => {
    expect(renderSacramento('/sacramentos/no-existe')).toContain('No encontramos esta página')
    expect(renderSacramento('/sacramentos')).toContain('No encontramos esta página')
    expect(getStaticPaths()).toEqual(Object.keys(DEFINICIONES).map((s) => `sacramentos/${s}`))
  })
})
