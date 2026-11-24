import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'
import {
  revisarRegistros,
  validarComunidades,
  validarContenido,
  validarJsonRegistrados,
} from './validar-contenido'

const temporales: string[] = []

function crearTempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'validar-contenido-'))
  temporales.push(dir)
  return dir
}

afterEach(() => {
  while (temporales.length > 0) {
    rmSync(temporales.pop()!, { recursive: true, force: true })
  }
})

describe('validar-contenido', () => {
  it('valida sin errores el contenido real del repositorio', () => {
    const raiz = fileURLToPath(new URL('..', import.meta.url))
    expect(validarContenido(raiz)).toEqual([])
  })

  it('revisarRegistros detecta recursivamente la palabra folio y archivos PDF', () => {
    const raiz = crearTempDir()
    const dirRegistros = join(raiz, 'content/registros')
    const sub = join(dirRegistros, 'sub')
    mkdirSync(sub, { recursive: true })

    writeFileSync(join(dirRegistros, 'limpio.json'), '{"nota":"sin datos personales"}')
    writeFileSync(join(sub, 'prohibido.txt'), 'Libro 3, Folio 45')
    writeFileSync(join(sub, 'acta.pdf'), '%PDF-1.4')

    const errores = revisarRegistros(dirRegistros, raiz)
    expect(errores).toHaveLength(2)
    expect(errores.some((e) => e.includes('palabra "folio"'))).toBe(true)
    expect(errores.some((e) => e.includes('hay un PDF en content/registros/'))).toBe(true)
  })

  it('validarJsonRegistrados reporta archivos faltantes o inválidos contra su esquema', () => {
    const raiz = crearTempDir()
    mkdirSync(join(raiz, 'content/registros'), { recursive: true })
    writeFileSync(join(raiz, 'content/registros/libros.json'), '{"actualizado":"no-es-fecha","libros":[]}')

    const errores = validarJsonRegistrados(raiz)
    expect(errores.some((e) => e.startsWith('content/registros/libros.json:'))).toBe(true)
    expect(errores.some((e) => e.includes('no se pudo leer o parsear'))).toBe(true)
  })

  it('validarComunidades ignora archivos no markdown, tolera carpeta ausente y reporta frontmatter inválido', () => {
    const raizVacia = crearTempDir()
    expect(validarComunidades(raizVacia)).toEqual([])

    const raiz = crearTempDir()
    const dirCom = join(raiz, 'content/comunidades')
    mkdirSync(dirCom, { recursive: true })
    writeFileSync(join(dirCom, 'notas.txt'), 'ignorado')
    writeFileSync(join(dirCom, 'valida.md'), '---\nnombre: Capilla Luz\n---\nDescripción válida.')
    writeFileSync(join(dirCom, 'invalida.md'), '---\nnombre: ""\n---\n')

    const errores = validarComunidades(raiz)
    expect(errores).toHaveLength(1)
    expect(errores[0]).toContain('invalida.md')
  })
})
