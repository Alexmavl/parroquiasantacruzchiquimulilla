import { describe, expect, it } from 'vitest'
import { getDefinicion } from '../features/sacramentos/config/definiciones'
import { enlaceComprobante, enlaceConsultaRegistro, enlaceGeneral, enlaceSolicitud } from './whatsapp'

function textoDecodificado(url: string): string {
  const query = new URL(url).searchParams.get('text')
  return query ?? ''
}

describe('enlaces de WhatsApp', () => {
  it('apunta al dominio de WhatsApp con el número de entorno', () => {
    const url = new URL(enlaceGeneral())
    expect(url.protocol).toBe('https:')
    expect(url.host).toBe(['wa', 'me'].join('.'))
    expect(url.pathname).toBe('/50200000000')
  })

  it('el texto se decodifica con saltos de línea reales', () => {
    const texto = textoDecodificado(enlaceConsultaRegistro())
    expect(texto).toContain('\n')
    expect(texto).not.toContain('%0A')
    expect(texto).toContain('Nombre completo de la persona:')
  })

  it('la solicitud de un sacramento incluye el checklist de requisitos', () => {
    const bautizo = getDefinicion('bautizo')!
    const texto = textoDecodificado(enlaceSolicitud(bautizo))
    expect(texto).toContain('Deseo solicitar Bautizo.')
    for (const req of bautizo.requisitos) {
      expect(texto).toContain(`- ${req.label}:`)
    }
  })

  it('el comprobante pide concepto y fecha', () => {
    const texto = textoDecodificado(enlaceComprobante())
    expect(texto).toContain('comprobante del depósito')
    expect(texto).toContain('Fecha del depósito:')
  })

  it('enlaceGeneral admite un mensaje propio', () => {
    expect(textoDecodificado(enlaceGeneral('Hola'))).toBe('Hola')
  })
})
