import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { TablaHorarios } from './TablaHorarios'

const BLOQUES = [
  {
    dia: 'Domingos',
    horas: ['7:00 a. m.', '10:00 a. m.'],
    lugar: 'Templo parroquial',
    nota: 'Misa mayor a las 10:00',
  },
  {
    dia: 'Miércoles',
    horas: [],
    nota: 'Sin atención por retiro',
  },
  {
    dia: 'Viernes',
    horas: [],
  },
]

describe('TablaHorarios', () => {
  it('renderiza título, días, lugares, horas, notas y guion de respaldo', () => {
    const html = renderToStaticMarkup(
      <TablaHorarios id="misas" titulo="Horario de misas" bloques={BLOQUES} />,
    )

    expect(html).toContain('aria-labelledby="misas"')
    expect(html).toContain('id="misas"')
    expect(html).toContain('Horario de misas')
    expect(html).toContain('Domingos')
    expect(html).toContain('Templo parroquial')
    expect(html).toContain('7:00 a. m.')
    expect(html).toContain('10:00 a. m.')
    expect(html).toContain('(Misa mayor a las 10:00)')
    expect(html).toContain('Sin atención por retiro')
    expect(html).toContain('—')
  })

  it('soporta el modo compacto y los iconos por categoría (misas, confesiones, despacho y por defecto)', () => {
    const misas = renderToStaticMarkup(
      <TablaHorarios id="misas" titulo="Misas" bloques={BLOQUES.slice(0, 1)} />,
    )
    const confesiones = renderToStaticMarkup(
      <TablaHorarios id="confesiones" titulo="Confesiones" bloques={BLOQUES.slice(0, 1)} compact />,
    )
    const despacho = renderToStaticMarkup(
      <TablaHorarios id="despacho" titulo="Despacho" bloques={BLOQUES.slice(0, 1)} compact />,
    )
    const otro = renderToStaticMarkup(
      <TablaHorarios id="otros" titulo="Otros" bloques={BLOQUES.slice(0, 1)} />,
    )

    expect(misas).toContain('lucide-calendar')
    expect(confesiones).toContain('lucide-heart-handshake')
    expect(confesiones).toContain('bg-marino-50/40')
    expect(despacho).toContain('lucide-building-2')
    expect(otro).toContain('lucide-clock')
  })
})
