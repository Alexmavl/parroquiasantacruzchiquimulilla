import { Clock } from 'lucide-react'
import type { ReactElement } from 'react'
import { Seo } from '../components/Seo'
import { Migas } from '../components/ui/Migas'
import { TablaHorarios } from '../components/ui/TablaHorarios'
import { horarios } from '../lib/content'

export function Horarios(): ReactElement {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Seo
        titulo="Horarios"
        descripcion="Horarios de misa, confesión y despacho parroquial de la Parroquia Santa Cruz de Chiquimulilla."
      />
      <Migas items={[{ nombre: 'Inicio', href: '/' }, { nombre: 'Horarios' }]} />

      <header>
        <h1 className="inline-flex items-center gap-3 text-marino-800">
          <Clock aria-hidden="true" size={32} className="text-oro-500" />
          <span>Horarios</span>
        </h1>
        <hr className="filete" />
        <p className="prosa-guia text-base sm:text-lg leading-relaxed text-carbon-700">
          Consulta los horarios de santas misas, confesiones y atención en el despacho parroquial.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <div className="lg:col-span-2">
          <TablaHorarios id="misas" titulo="Santas Misas" bloques={horarios.misas} />
        </div>
        <TablaHorarios id="confesiones" titulo="Confesiones" bloques={horarios.confesiones} />
        <TablaHorarios id="despacho" titulo="Despacho parroquial" bloques={horarios.despacho} />
      </div>
    </div>
  )
}

export const Component = Horarios
