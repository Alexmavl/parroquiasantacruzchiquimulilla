import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { IconoFacebook, IconoGoogleMaps, IconoWaze, IconoWhatsApp } from './marcas'

const ICONOS = [
  { nombre: 'WhatsApp', Componente: IconoWhatsApp, inicioPath: 'M17.5 14.4' },
  { nombre: 'Facebook', Componente: IconoFacebook, inicioPath: 'M24 12.073' },
  { nombre: 'GoogleMaps', Componente: IconoGoogleMaps, inicioPath: 'M12 2C8.13' },
  { nombre: 'Waze', Componente: IconoWaze, inicioPath: 'M19.34 9.07' },
] as const

describe('iconos de marca', () => {
  it('renderizan SVG accesible con tamaño 20 por defecto y trazado propio', () => {
    const trazados = new Set<string>()

    for (const { Componente, inicioPath } of ICONOS) {
      const html = renderToStaticMarkup(<Componente />)
      expect(html).toContain('viewBox="0 0 24 24"')
      expect(html).toContain('width="20"')
      expect(html).toContain('height="20"')
      expect(html).toContain('fill="currentColor"')
      expect(html).toContain('aria-hidden="true"')
      expect(html).toContain('focusable="false"')
      expect(html).toContain(`d="${inicioPath}`)

      const match = /d="([^"]+)"/.exec(html)
      expect(match?.[1]).toBeTruthy()
      trazados.add(match![1])
    }

    expect(trazados.size).toBe(ICONOS.length)
  })

  it('aceptan tamaño y clase personalizados', () => {
    const html = renderToStaticMarkup(<IconoWhatsApp size={28} className="text-oro-500" />)
    expect(html).toContain('width="28"')
    expect(html).toContain('height="28"')
    expect(html).toContain('class="text-oro-500"')
  })
})
