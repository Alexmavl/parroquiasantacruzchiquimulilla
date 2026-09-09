import { Church, Clock, MapPin, Phone } from 'lucide-react'
import type { ReactElement } from 'react'
import { IconoFacebook, IconoWhatsApp } from '../../icons/marcas'
import { horarios, parroquia } from '../../lib/content'
import { TELEFONO_TEL, TELEFONO_TEXTO } from '../../lib/telefono'
import { enlaceGeneral } from '../../lib/whatsapp'

export function Footer(): ReactElement {
  const despacho = horarios.despacho
  const urlFacebook = parroquia.facebook || 'https://www.facebook.com/parroquiasantacruzchiquimulilla/'
  const urlWhatsApp = enlaceGeneral('Buen día. Deseo comunicarme con la Parroquia Santa Cruz.')

  return (
    <footer
      data-site-footer
      className="mt-auto border-t-2 border-oro-500 bg-gradient-to-b from-marino-900 to-marino-950 text-slate-100"
    >
      <div className="contenedor py-6 sm:py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:items-start">
          {/* Columna 1: Identidad */}
          <div>
            <h2 className="text-base font-serif tracking-wide text-white inline-flex items-center gap-2">
              <Church aria-hidden="true" size={17} className="shrink-0 text-oro-400" />
              <span>Parroquia Santa Cruz</span>
            </h2>
            <p className="mt-1 text-xs text-slate-300">Diócesis de Santa Rosa de Lima</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-300">
              <MapPin aria-hidden="true" size={14} className="shrink-0 text-oro-400" />
              <span>{parroquia.direccion ?? 'Chiquimulilla, Santa Rosa, Guatemala.'}</span>
            </p>
          </div>

          {/* Columna 2: Despacho */}
          <div>
            <h2 className="text-base font-serif tracking-wide text-white inline-flex items-center gap-2">
              <Clock aria-hidden="true" size={17} className="shrink-0 text-oro-400" />
              <span>Despacho</span>
            </h2>
            <ul className="mt-1 flex flex-col gap-1 text-xs text-slate-300">
              {despacho.map((b) => (
                <li key={b.dia} className="flex justify-between border-b border-marino-800/50 pb-0.5">
                  <span className="font-semibold text-white">{b.dia}</span>
                  <span className="text-slate-200">{b.horas.join(' · ')}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto Directo con Iconos Asertivos */}
          <div>
            <h2 className="text-base font-serif tracking-wide text-white inline-flex items-center gap-2">
              <Phone aria-hidden="true" size={17} className="shrink-0 text-oro-400" />
              <span>Contacto y Redes</span>
            </h2>
            <p className="mt-1 text-xs text-slate-300">Atención en horario de despacho:</p>

            {/* Fila Horizontal de Iconos Interactivos */}
            <div className="mt-2.5 flex items-center gap-2.5">
              {/* Teléfono */}
              <a
                href={`tel:${TELEFONO_TEL}`}
                title={`Llamar al ${TELEFONO_TEXTO}`}
                aria-label={`Llamar por teléfono al ${TELEFONO_TEXTO}`}
                className="group flex h-10 w-10 items-center justify-center rounded-lg bg-marino-800 text-slate-200 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-oro-500 hover:text-marino-950 active:scale-95"
              >
                <Phone size={18} className="transition-transform duration-200 group-hover:rotate-12" />
              </a>

              {/* WhatsApp */}
              <a
                href={urlWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                title="Escribir por WhatsApp"
                aria-label="Abrir chat de WhatsApp de la Parroquia Santa Cruz"
                className="group flex h-10 w-10 items-center justify-center rounded-lg bg-marino-800 text-slate-200 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#25D366] hover:text-white hover:shadow-md hover:shadow-[#25D366]/30 active:scale-95"
              >
                <IconoWhatsApp size={20} className="transition-transform duration-200 group-hover:scale-110" />
              </a>

              {/* Facebook */}
              <a
                href={urlFacebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Página de Facebook"
                aria-label="Abrir página oficial de Facebook de la Parroquia Santa Cruz"
                className="group flex h-10 w-10 items-center justify-center rounded-lg bg-marino-800 text-slate-200 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#1877F2] hover:text-white hover:shadow-md hover:shadow-[#1877F2]/30 active:scale-95"
              >
                <IconoFacebook size={20} className="transition-transform duration-200 group-hover:scale-110" />
              </a>

              <span className="text-xs text-slate-300 ml-1 font-mono font-semibold">{TELEFONO_TEXTO}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-marino-800/80 py-2.5 text-center text-[11px] text-slate-400">
        <p>Parroquia Santa Cruz · Chiquimulilla, Santa Rosa</p>
      </div>
    </footer>
  )
}
