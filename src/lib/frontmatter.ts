/**
 * Parser mínimo de frontmatter YAML plano (`clave: valor`), sin dependencias.
 * Solo escalares en la raíz —suficiente para el contenido del CMS de este sitio—:
 * strings, números y booleanos. No admite listas ni objetos anidados.
 */
export interface Frontmatter {
  data: Record<string, string | number | boolean>
  body: string
}

function coerce(bruto: string): string | number | boolean {
  const v = bruto.trim().replace(/^["']|["']$/g, '')
  if (v === 'true') return true
  if (v === 'false') return false
  if (v !== '' && /^-?\d+(\.\d+)?$/.test(v)) return Number(v)
  return v
}

export function parseFrontmatter(texto: string): Frontmatter {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(texto)
  if (!m) return { data: {}, body: texto.trim() }

  const data: Record<string, string | number | boolean> = {}
  for (const linea of (m[1] ?? '').split('\n')) {
    const par = /^([\w-]+):\s*(.*)$/.exec(linea.trim())
    if (par && par[1]) data[par[1]] = coerce(par[2] ?? '')
  }
  return { data, body: (m[2] ?? '').trim() }
}
