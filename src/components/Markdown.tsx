import type { ReactElement } from 'react'

/**
 * Render mínimo de Markdown sin dependencias: encabezados, párrafos y listas
 * simples. Suficiente para el contenido del CMS (historia, descripción de los
 * templos). Los `#` bajan un nivel: el `<h1>` siempre lo pone la página.
 */
export function Markdown({ children }: { children: string }): ReactElement {
  const md = children.replace(/^---\n[\s\S]*?\n---\n?/, '').replace(/^#\s+.*\n+/, '').trim()

  const bloques = md.split(/\n{2,}/).map((bruto, i) => {
    const b = bruto.trim()

    const h = /^(#{1,6})\s+(.*)$/.exec(b)
    if (h) {
      const nivel = Math.min((h[1]?.length ?? 1) + 1, 4)
      const texto = h[2] ?? ''
      if (nivel === 2) return <h2 key={i}>{texto}</h2>
      if (nivel === 3) return <h3 key={i}>{texto}</h3>
      return <h4 key={i}>{texto}</h4>
    }

    if (/^[-*]\s+/.test(b)) {
      const items = b.split('\n').map((l) => l.replace(/^[-*]\s+/, '').trim())
      return (
        <ul key={i} className="prosa-guia flex list-disc flex-col gap-1 pl-5">
          {items.map((t, j) => (
            <li key={j}>{t}</li>
          ))}
        </ul>
      )
    }

    const italic = /^\*(.+)\*$/.exec(b)
    if (italic) {
      return (
        <p key={i} className="aux italic">
          {italic[1]}
        </p>
      )
    }

    return (
      <p key={i} className="prosa-guia">
        {b}
      </p>
    )
  })

  return <div className="flex flex-col gap-4">{bloques}</div>
}
