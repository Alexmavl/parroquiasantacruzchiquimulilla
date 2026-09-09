import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function NoEncontrado(): ReactElement {
  return (
    <>
      <Seo titulo="Página no encontrada" />
      <h1>No encontramos esta página</h1>
      <p className="prosa-guia mt-4 text-lg">
        Puede que el enlace esté equivocado o que la página se haya movido.
      </p>
      <p className="mt-6">
        <Link to="/">Volver al inicio</Link>
      </p>
    </>
  )
}

export const Component = NoEncontrado
