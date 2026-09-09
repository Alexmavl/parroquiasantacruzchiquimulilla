import { Flame } from 'lucide-react'
import type { ReactElement } from 'react'
import { Seo } from '../../../components/Seo'
import { Migas } from '../../../components/ui/Migas'
import { TarjetaSacramento } from '../../../components/sacramentos/TarjetaSacramento'
import { SACRAMENTOS_PRINCIPALES } from '../config/definiciones'

export function SacramentosIndex(): ReactElement {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Seo
        titulo="Sacramentos"
        descripcion="Requisitos y cómo solicitar cada sacramento en la Parroquia Santa Cruz de Chiquimulilla."
      />
      <Migas items={[{ nombre: 'Inicio', href: '/' }, { nombre: 'Sacramentos' }]} />

      <header>
        <h1 className="inline-flex items-center gap-3 text-marino-800">
          <Flame aria-hidden="true" size={32} className="text-oro-500" />
          <span>Sacramentos</span>
        </h1>
        <hr className="filete" />
        <p className="prosa-guia text-base sm:text-lg leading-relaxed text-carbon-700">
          Elige un sacramento para ver quién puede recibirlo, qué documentos se necesitan y cómo
          empezar el trámite.
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SACRAMENTOS_PRINCIPALES.map((def) => (
          <li key={def.slug} className="flex">
            <TarjetaSacramento def={def} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Component = SacramentosIndex
