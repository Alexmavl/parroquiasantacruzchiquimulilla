/**
 * Valida el contenido de `/content` contra los esquemas de Zod ANTES de construir.
 * Si algo no cumple, sale con código 1 y el build se detiene (spec tarea 5).
 *
 * Comprobaciones extra de seguridad (spec tarea 5 y §0.1):
 *  - Ningún archivo de `content/registros/` puede contener la palabra "folio"
 *    ni parecer un listado de personas.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter } from '../src/lib/frontmatter.ts'
import { ComunidadSchema, ESQUEMAS_JSON } from '../src/lib/schemas.ts'

const raiz = fileURLToPath(new URL('..', import.meta.url))
const errores: string[] = []

// 1. Validación de esquema de cada JSON registrado.
for (const [ruta, esquema] of Object.entries(ESQUEMAS_JSON)) {
  const abs = join(raiz, ruta)
  try {
    const datos = JSON.parse(readFileSync(abs, 'utf8'))
    const r = esquema.safeParse(datos)
    if (!r.success) {
      errores.push(`${ruta}:\n${JSON.stringify(r.error.format(), null, 2)}`)
    }
  } catch (e) {
    errores.push(`${ruta}: no se pudo leer o parsear (${(e as Error).message})`)
  }
}

// 2. `content/registros/` no debe contener datos de personas.
const dirRegistros = join(raiz, 'content/registros')
function revisarRegistros(dir: string): void {
  for (const nombre of readdirSync(dir)) {
    const abs = join(dir, nombre)
    if (statSync(abs).isDirectory()) {
      revisarRegistros(abs)
      continue
    }
    const texto = readFileSync(abs, 'utf8').toLowerCase()
    if (/\bfolio\b/.test(texto)) {
      errores.push(
        `${relative(raiz, abs)}: contiene la palabra "folio". ` +
          'Los libros sacramentales y sus folios no se publican (spec §0.1).',
      )
    }
    if (abs.endsWith('.pdf')) {
      errores.push(
        `${relative(raiz, abs)}: hay un PDF en content/registros/. ` +
          'No se publican PDF con registros de personas (spec tarea 5).',
      )
    }
  }
}
revisarRegistros(dirRegistros)

// 3. Frontmatter de cada templo de comunidad.
const dirComunidades = join(raiz, 'content/comunidades')
if (existsSync(dirComunidades)) {
  for (const nombre of readdirSync(dirComunidades)) {
    if (!nombre.endsWith('.md')) continue
    const abs = join(dirComunidades, nombre)
    const { data, body } = parseFrontmatter(readFileSync(abs, 'utf8'))
    const r = ComunidadSchema.safeParse({ ...data, descripcion: body })
    if (!r.success) {
      errores.push(
        `${relative(raiz, abs)}:\n${JSON.stringify(r.error.format(), null, 2)}`,
      )
    }
  }
}

if (errores.length > 0) {
  console.error('\n✗ Validación de contenido fallida:\n')
  console.error(errores.join('\n\n'))
  console.error('')
  process.exit(1)
}

console.log('✓ Contenido válido.')
