import { BookOpen } from 'lucide-react'
import type { ReactElement } from 'react'
import historiaMd from '../../content/historia.md?raw'
import { Markdown } from '../components/Markdown'
import { Seo } from '../components/Seo'
import { Migas } from '../components/ui/Migas'

export function Historia(): ReactElement {
  return (
    <div className="space-y-8">
      <Seo titulo="Historia de la parroquia" />
      <Migas items={[{ nombre: 'Inicio', href: '/' }, { nombre: 'Historia' }]} />

      <header>
        <h1 className="inline-flex items-center gap-3 text-marino-800">
          <BookOpen aria-hidden="true" size={34} className="text-oro-500" />
          <span>Historia de la parroquia</span>
        </h1>
        <hr className="filete" />
      </header>

      <div className="prose max-w-none text-carbon-800 leading-relaxed text-base sm:text-lg">
        <Markdown>{historiaMd}</Markdown>
      </div>
    </div>
  )
}

export const Component = Historia
