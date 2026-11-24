import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { horarios, parroquia } from '../../lib/content'
import { TELEFONO_TEL, TELEFONO_TEXTO } from '../../lib/telefono'
import { Footer } from './Footer'

describe('Footer', () => {
  it('muestra identidad, dirección, horarios de despacho y enlaces de contacto', () => {
    const html = renderToStaticMarkup(<Footer />)

    expect(html).toContain('Parroquia Santa Cruz')
    expect(html).toContain('Diócesis de Santa Rosa de Lima')
    expect(html).toContain(parroquia.direccion ?? 'Chiquimulilla, Santa Rosa, Guatemala.')

    for (const bloque of horarios.despacho) {
      expect(html).toContain(bloque.dia)
      expect(html).toContain(bloque.horas.join(' · '))
    }

    expect(html).toContain(`href="tel:${TELEFONO_TEL}"`)
    expect(html).toContain(TELEFONO_TEXTO)
    expect(html).toContain('https://wa.me/')
    expect(html).toContain(
      parroquia.facebook ?? 'https://www.facebook.com/parroquiasantacruzchiquimulilla/',
    )
  })
})
