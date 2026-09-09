import type { ReactElement } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollToTop } from '../ScrollToTop'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout(): ReactElement {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-blanco focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" className="contenedor flex-1 py-6 sm:py-8 overflow-hidden">
        <div key={location.pathname} className="animacion-pagina">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

