import type { ReactElement } from 'react'
import { Phone } from 'lucide-react'
import { IconoWhatsApp } from '../../icons/marcas'
import { TELEFONO_TEL, TELEFONO_TEXTO } from '../../lib/telefono'

interface Props {
  href: string
  /** Etiqueta en voz activa y específica: "Solicitar por WhatsApp", no "Contactar". */
  etiqueta: string
}

/**
 * Botón de WhatsApp con respaldo telefónico ordenado y accesible.
 */
export function BotonWhatsApp({ href, etiqueta }: Props): ReactElement {
  return (
    <div className="no-print flex flex-col gap-3">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primario inline-flex items-center gap-2 self-start shadow-md hover:shadow-lg"
      >
        <IconoWhatsApp aria-hidden="true" size={20} />
        <span>{etiqueta}</span>
      </a>

      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-carbon-600 bg-white/80 border border-marino-200/60 px-3 py-1.5 rounded-lg w-fit">
        <Phone aria-hidden="true" size={14} className="text-marino-600" />
        <span>¿No usas WhatsApp? Llama al:</span>
        <a
          href={`tel:${TELEFONO_TEL}`}
          className="font-semibold text-marino-700 hover:text-marino-900 underline"
        >
          {TELEFONO_TEXTO}
        </a>
      </div>
    </div>
  )
}
