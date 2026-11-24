import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Markdown } from './Markdown'

describe('Markdown', () => {
  it('elimina frontmatter y H1 inicial, baja encabezados un nivel y renderiza listas, cursiva y párrafos', () => {
    const contenido = [
      '---',
      'titulo: Historia',
      '---',
      '# Título principal ignorado',
      '',
      '# Sección nivel 2',
      '',
      '## Subsección nivel 3',
      '',
      '### Detalle nivel 4',
      '',
      '##### Nivel acotado a h4',
      '',
      '- Primer elemento',
      '* Segundo elemento',
      '',
      '*Nota en cursiva*',
      '',
      'Párrafo normal de prosa.',
    ].join('\n')

    const html = renderToStaticMarkup(<Markdown>{contenido}</Markdown>)

    expect(html).not.toContain('titulo: Historia')
    expect(html).not.toContain('Título principal ignorado')
    expect(html).toContain('<h2>Sección nivel 2</h2>')
    expect(html).toContain('<h3>Subsección nivel 3</h3>')
    expect(html).toContain('<h4>Detalle nivel 4</h4>')
    expect(html).toContain('<h4>Nivel acotado a h4</h4>')
    expect(html).toContain('<ul class="prosa-guia flex list-disc flex-col gap-1 pl-5"><li>Primer elemento</li><li>Segundo elemento</li></ul>')
    expect(html).toContain('<p class="aux italic">Nota en cursiva</p>')
    expect(html).toContain('<p class="prosa-guia">Párrafo normal de prosa.</p>')
  })
})
