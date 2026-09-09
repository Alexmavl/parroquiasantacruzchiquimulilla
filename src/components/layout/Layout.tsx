import type { ReactElement } from 'react'
import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '../ScrollToTop'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout(): ReactElement {
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
      <main id="contenido" className="contenedor flex-1 py-6 sm:py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
