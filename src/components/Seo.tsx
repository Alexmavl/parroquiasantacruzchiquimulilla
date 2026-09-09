import type { ReactElement } from 'react'
import { Head } from 'vite-react-ssg'

const SITIO = 'Parroquia Santa Cruz · Chiquimulilla'

interface Props {
  titulo: string
  descripcion?: string
}

/** Título y descripción de la página. Se prerenderiza en el HTML. */
export function Seo({ titulo, descripcion }: Props): ReactElement {
  const completo = titulo === SITIO ? titulo : `${titulo} — ${SITIO}`
  return (
    <Head>
      <title>{completo}</title>
      {descripcion && <meta name="description" content={descripcion} />}
      <meta property="og:title" content={completo} />
      {descripcion && <meta property="og:description" content={descripcion} />}
    </Head>
  )
}
