import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export interface Miga {
  nombre: string
  href?: string
}

/** Migas de pan. El último elemento es la página actual y no lleva enlace. */
export function Migas({ items }: { items: Miga[] }): ReactElement {
  return (
    <nav aria-label="Ruta de navegación" className="aux mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const ultimo = i === items.length - 1
          return (
            <li key={item.nombre} className="flex items-center gap-2">
              {item.href && !ultimo ? (
                <Link to={item.href}>{item.nombre}</Link>
              ) : (
                <span aria-current={ultimo ? 'page' : undefined}>{item.nombre}</span>
              )}
              {!ultimo && <span aria-hidden="true">·</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
