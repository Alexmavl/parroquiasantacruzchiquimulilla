import { PhoneCall } from 'lucide-react'
import type { ReactElement } from 'react'
import type { DefinicionSacramento } from '../../features/sacramentos/config/definiciones'
import { TELEFONO_TEL, TELEFONO_TEXTO } from '../../lib/telefono'
import { enlaceSolicitud } from '../../lib/whatsapp'

/**
 * Franja de urgencia para la unción de los enfermos (spec tarea 3).
 * Va arriba del todo, antes de la descripción: un familiar buscando sacerdote a
 * las 2 a. m. no debe encontrarse primero con un párrafo explicativo.
 *
 * En el flujo (no fija). No usa etiqueta de encabezado para no romper la
 * jerarquía (el único <h1> es el nombre del sacramento). Todo son enlaces
 * planos: funciona con JavaScript desactivado.
 */
export function FranjaUrgencia({ def }: { def: DefinicionSacramento }): ReactElement {
  return (
    <section className="franja-urgencia" aria-label="Atención inmediata para la unción de los enfermos">
      <p className="text-xl font-semibold inline-flex items-center gap-2">
        <PhoneCall aria-hidden="true" size={24} className="shrink-0 text-oro-400" />
        <span>Atención inmediata, a cualquier hora</span>
      </p>
      <p className="mt-1">Si la persona está grave, llama directamente.</p>
      <p className="mt-4">
        <a href={`tel:${TELEFONO_TEL}`} className="btn btn-primario">
          Llamar al {TELEFONO_TEXTO}
        </a>
      </p>
      <p className="mt-4 text-sm">
        Para unción comunitaria o un enfermo crónico en casa,{' '}
        <a href={enlaceSolicitud(def)} target="_blank" rel="noopener noreferrer">
          escríbenos por WhatsApp
        </a>
        .
      </p>
    </section>
  )
}
