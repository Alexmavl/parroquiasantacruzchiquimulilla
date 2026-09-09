import { BookOpen, CheckCircle } from 'lucide-react'
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../../../components/Seo'
import { Migas } from '../../../components/ui/Migas'

export function GuiaConfesion(): ReactElement {
  return (
    <div className="space-y-8">
      <Seo
        titulo="Guía breve para prepararte para la confesión"
        descripcion="Pasos sencillos para acercarte al sacramento de la reconciliación."
      />
      <Migas
        items={[
          { nombre: 'Inicio', href: '/' },
          { nombre: 'Sacramentos', href: '/sacramentos' },
          { nombre: 'Confesión', href: '/sacramentos/confesion' },
          { nombre: 'Guía para prepararte' },
        ]}
      />

      <div className="rounded-2xl border border-marino-200 bg-white p-6 sm:p-10 shadow-xs">
        <h1 className="inline-flex items-center gap-3 text-marino-800">
          <BookOpen aria-hidden="true" size={34} className="text-oro-500" />
          <span>Guía breve para prepararte</span>
        </h1>

        <div className="prosa-guia mt-4 text-lg text-carbon-700 leading-relaxed">
          <p>
            No necesitas cita ni avisar. Si hace años que no te confiesas, díselo al sacerdote al
            empezar: él te acompaña y te guía con serenidad y comprensión.
          </p>
        </div>

        <ol className="mt-8 flex flex-col gap-4">
          <li className="flex items-start gap-3.5 rounded-xl border border-marino-100 bg-marino-50/40 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-marino-700 text-sm font-bold text-white">
              1
            </span>
            <div>
              <strong className="text-marino-900 block font-semibold text-base">Haz un rato de silencio</strong>
              <p className="mt-0.5 text-sm text-carbon-700 leading-relaxed">
                Repasa tu vida desde la última confesión: en qué has fallado con Dios, con los demás y contigo mismo.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3.5 rounded-xl border border-marino-100 bg-marino-50/40 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-marino-700 text-sm font-bold text-white">
              2
            </span>
            <div>
              <strong className="text-marino-900 block font-semibold text-base">Pide perdón de corazón</strong>
              <p className="mt-0.5 text-sm text-carbon-700 leading-relaxed">
                Reconoce tus faltas con sinceridad y decide, con la ayuda de la gracia de Dios, cambiar en lo que puedas.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3.5 rounded-xl border border-marino-100 bg-marino-50/40 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-marino-700 text-sm font-bold text-white">
              3
            </span>
            <div>
              <strong className="text-marino-900 block font-semibold text-base">Acércate al confesor</strong>
              <p className="mt-0.5 text-sm text-carbon-700 leading-relaxed">
                Llega en el horario de confesiones o antes de la misa. Comparte tus faltas con sencillez: Dios ya conoce tu corazón.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3.5 rounded-xl border border-marino-100 bg-marino-50/40 p-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-marino-700 text-sm font-bold text-white">
              4
            </span>
            <div>
              <strong className="text-marino-900 block font-semibold text-base">Escucha y recibe la absolución</strong>
              <p className="mt-0.5 text-sm text-carbon-700 leading-relaxed">
                Escucha el consejo del sacerdote, reza la penitencia que te indique y recibe el abrazo de la paz y el perdón sacramental.
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-8 border-t border-marino-100 pt-6">
          <Link
            to="/sacramentos/confesion"
            className="btn btn-primario inline-flex items-center gap-2"
          >
            <CheckCircle aria-hidden="true" size={18} />
            Ver horarios de confesión
          </Link>
        </div>
      </div>
    </div>
  )
}

export const Component = GuiaConfesion
