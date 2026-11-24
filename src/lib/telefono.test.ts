import { describe, expect, it } from 'vitest'
import { TELEFONO_TEL, TELEFONO_TEXTO, formatearTelefono } from './telefono'

describe('telefono', () => {
  it('formatea números con código de país de Guatemala y números locales de 8 dígitos', () => {
    expect(formatearTelefono('50255551234')).toBe('+502 5555-1234')
    expect(formatearTelefono('55551234')).toBe('5555-1234')
  })

  it('expone TELEFONO_TEL y TELEFONO_TEXTO a partir de VITE_TELEFONO', () => {
    expect(TELEFONO_TEL).toBe('+50200000000')
    expect(TELEFONO_TEXTO).toBe('+502 0000-0000')
    expect(formatearTelefono()).toBe('+502 0000-0000')
  })
})
