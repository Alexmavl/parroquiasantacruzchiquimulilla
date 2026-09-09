import { Clock, HelpCircle, MessageCircle } from 'lucide-react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { DefinicionSacramento } from '../../features/sacramentos/config/definiciones'
import { horarios } from '../../lib/content'
import { enlaceSolicitud } from '../../lib/whatsapp'
import { BotonWhatsApp } from '../ui/BotonWhatsApp'
import { TablaHorarios } from '../ui/TablaHorarios'

/**
 * Bloque de contacto según `modoContacto`.
 */
export function BloqueContacto({ def }: { def: DefinicionSacramento }): ReactElement | null {
  if (def.modoContacto === 'WHATSAPP') {
    return (
      <section
        aria-labelledby="contacto-titulo"
        className="rounded-2xl border border-marino-200 bg-white p-4 sm:p-6 shadow-xs space-y-4"
      >
        <div>
          <h2 id="contacto-titulo" className="mb-1 inline-flex items-center gap-2 text-xl font-serif text-marino-800">
            <MessageCircle aria-hidden="true" size={22} className="text-oro-500" />
            <span>Cómo iniciar el trámite</span>
          </h2>
          <p className="prosa-guia text-sm text-carbon-600">
            Comunícate directamente con el despacho parroquial para iniciar tu trámite o resolver dudas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <BotonWhatsApp href={enlaceSolicitud(def)} etiqueta={`Solicitar ${def.nombre.toLowerCase()} por WhatsApp`} />
          {def.anticipacion && (
            <span className="text-xs text-carbon-500 font-medium max-w-sm">
              {def.anticipacion}.
            </span>
          )}
        </div>

        <div className="pt-1">
          <TablaHorarios id="despacho" titulo="Horario de atención en despacho" bloques={horarios.despacho} compact />
        </div>
      </section>
    )
  }

  if (def.modoContacto === 'SIN_SOLICITUD') {
    return (
      <section
        aria-labelledby="contacto-titulo"
        className="rounded-2xl border border-marino-200 bg-white p-4 sm:p-6 shadow-xs space-y-4"
      >
        <div>
          <h2 id="contacto-titulo" className="mb-1 inline-flex items-center gap-2 text-xl font-serif text-marino-800">
            <Clock aria-hidden="true" size={22} className="text-oro-500" />
            <span>Cuándo hay confesiones</span>
          </h2>
          <p className="prosa-guia text-sm text-carbon-600">
            No necesitas cita ni avisar con antelación. Acércate en los horarios señalados al confesonario.
          </p>
        </div>

        <TablaHorarios id="confesiones" titulo="Horario de confesiones" bloques={horarios.confesiones} />

        <div className="panel-modalidad p-4">
          <h3 className="mb-1.5 inline-flex items-center gap-2 text-base font-serif text-marino-800">
            <HelpCircle aria-hidden="true" size={18} className="text-oro-500" />
            <span>¿Hace tiempo que no te confiesas?</span>
          </h3>
          <p className="prosa-guia text-sm text-carbon-700 leading-relaxed">
            No te preocupes. Si no recuerdas los pasos o hace mucho tiempo que no te acercas al sacramento,
            díselo con total confianza al sacerdote: él te guiará y acompañará con paciencia.
          </p>
          <p className="mt-2.5">
            <Link to="/guia-confesion" className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-marino-700 hover:text-marino-900">
              Guía breve para prepararte →
            </Link>
          </p>
        </div>
      </section>
    )
  }

  return null
}
