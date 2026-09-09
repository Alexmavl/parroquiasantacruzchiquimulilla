import { describe, expect, it } from 'vitest'
import { ICONOS_POR_SLUG } from '../../../icons/liturgicos/iconos'
import { DEFINICIONES, SACRAMENTOS_PRINCIPALES, getDefinicion } from './definiciones'

describe('definiciones de sacramentos', () => {
  it('tiene 7 entradas por slug', () => {
    expect(Object.keys(DEFINICIONES)).toHaveLength(7)
  })

  it('expone 6 sacramentos principales (la supletoria no va en la retícula)', () => {
    expect(SACRAMENTOS_PRINCIPALES).toHaveLength(6)
    expect(SACRAMENTOS_PRINCIPALES.every((d) => d.modalidad === 'ORDINARIA')).toBe(true)
    expect(SACRAMENTOS_PRINCIPALES.map((d) => d.slug)).not.toContain('primera-comunion-supletoria')
  })

  it('la clave de cada entrada coincide con su slug', () => {
    for (const [clave, def] of Object.entries(DEFINICIONES)) {
      expect(def.slug).toBe(clave)
    }
  })

  it('todo icono existe en ICONOS_POR_SLUG', () => {
    for (const def of Object.values(DEFINICIONES)) {
      expect(ICONOS_POR_SLUG).toHaveProperty(def.icono)
    }
  })

  it('modalidadRelacionada es bidireccional', () => {
    for (const def of Object.values(DEFINICIONES)) {
      if (!def.modalidadRelacionada) continue
      const otra = getDefinicion(def.modalidadRelacionada)
      expect(otra, `${def.slug} apunta a un slug inexistente`).toBeDefined()
      expect(otra?.modalidadRelacionada).toBe(def.slug)
    }
  })

  it('el modo de contacto sigue las reglas de la spec', () => {
    expect(getDefinicion('uncion-de-enfermos')?.modoContacto).toBe('URGENCIA')
    expect(getDefinicion('confesion')?.modoContacto).toBe('SIN_SOLICITUD')
    const resto = Object.values(DEFINICIONES).filter(
      (d) => !['uncion-de-enfermos', 'confesion'].includes(d.slug),
    )
    expect(resto.every((d) => d.modoContacto === 'WHATSAPP')).toBe(true)
  })

  it('getDefinicion devuelve undefined para un slug desconocido', () => {
    expect(getDefinicion('no-existe')).toBeUndefined()
  })
})
