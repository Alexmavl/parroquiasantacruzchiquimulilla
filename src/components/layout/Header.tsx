import { Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactElement } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IconoLiturgico } from '../../icons/liturgicos/IconoLiturgico'

const ENLACES = [
  { to: '/', nombre: 'Inicio', end: true },
  { to: '/sacramentos', nombre: 'Sacramentos', end: false },
  { to: '/horarios', nombre: 'Horarios', end: false },
  { to: '/comunidades', nombre: 'Comunidades', end: false },
  { to: '/registros', nombre: 'Registros', end: false },
]

export function Header(): ReactElement {
  const [abierto, setAbierto] = useState(false)
  const location = useLocation()
  const [prevPathname, setPrevPathname] = useState(location.pathname)

  // Cerrar menú al cambiar de ruta durante la renderización
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname)
    setAbierto(false)
  }

  // Cerrar menú con tecla Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && abierto) {
        setAbierto(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [abierto])

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b-2 border-oro-500 bg-gradient-to-r from-marino-950 via-marino-900 to-marino-950 text-white shadow-md transition-all duration-300"
    >
      <div className="contenedor py-2.5 sm:py-3">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="group flex items-center gap-2.5 sm:gap-3.5 no-underline focus-visible:outline focus-visible:outline-white"
            onClick={() => setAbierto(false)}
          >
            {/* Contenedor con efecto de resplandor / brillo aureola */}
            <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center">
              {/* Aura dorada / halo de luz difusa detrás */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-radial from-oro-400/40 via-oro-500/20 to-transparent blur-md transition-all duration-500 group-hover:scale-125 group-hover:from-oro-400/60 group-hover:via-oro-500/35"
              />

              {/* Insignia con degradado interno y borde iluminado */}
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-oro-400/50 bg-gradient-to-br from-marino-800 via-marino-900 to-marino-950 text-oro-400 shadow-[0_0_15px_rgba(234,179,8,0.25)] ring-1 ring-white/10 transition-all duration-300 group-hover:scale-105 group-hover:border-oro-300 group-hover:text-oro-300 group-hover:shadow-[0_0_22px_rgba(250,204,21,0.5)]">
                {/* Reflejo de luz diagonal superior */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white/20 blur-xs"
                />

                <IconoLiturgico
                  slug="cruz"
                  size={26}
                  className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-normal text-white transition-colors duration-200 group-hover:text-oro-300 leading-tight">
                Parroquia Santa Cruz
              </span>
              <span className="text-xs sm:text-sm text-marino-200 font-sans tracking-wide">
                Chiquimulilla, Santa Rosa
              </span>
            </div>
          </NavLink>

          {/* Botón menú hamburguesa (móvil) */}
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-marino-700 bg-marino-800 text-white shadow-xs transition-all duration-200 hover:bg-marino-700 hover:text-oro-300 active:scale-95 sm:hidden"
            aria-expanded={abierto}
            aria-controls="menu-navegacion"
            aria-label={abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            onClick={() => setAbierto((prev) => !prev)}
          >
            {abierto ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Navegación escritorio */}
          <nav aria-label="Principal" className="hidden sm:block">
            <ul className="flex items-center gap-1.5">
              {ENLACES.map((e) => (
                <li key={e.to}>
                  <NavLink
                    to={e.to}
                    end={e.end}
                    className={({ isActive }) =>
                      [
                        'relative flex min-h-10 items-center rounded-lg px-3.5 py-1.5 text-base font-medium no-underline transition-all duration-200',
                        isActive
                          ? 'bg-marino-800 text-white font-semibold shadow-xs border border-marino-700/80 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gradient-to-r after:from-oro-400 after:via-oro-300 after:to-oro-400 after:rounded-full after:shadow-[0_0_8px_rgba(250,204,21,0.9)]'
                          : 'text-slate-100 hover:bg-marino-800/70 hover:text-white',
                      ].join(' ')
                    }
                  >
                    {e.nombre}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Navegación desplegable móvil */}
        {abierto && (
          <nav
            id="menu-navegacion"
            aria-label="Principal móvil"
            className="mt-2.5 border-t border-marino-800/90 pt-2 pb-1 sm:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <ul className="flex flex-col gap-1">
              {ENLACES.map((e) => (
                <li key={e.to}>
                  <NavLink
                    to={e.to}
                    end={e.end}
                    className={({ isActive }) =>
                      [
                        'flex min-h-11 items-center rounded-lg px-3.5 py-2 text-base no-underline transition-all duration-200',
                        isActive
                          ? 'bg-marino-800 font-semibold text-white border-l-4 border-oro-400 shadow-[inset_4px_0_12px_rgba(234,179,8,0.15)]'
                          : 'text-slate-100 hover:bg-marino-800/80 hover:text-white',
                      ].join(' ')
                    }
                    onClick={() => setAbierto(false)}
                  >
                    {e.nombre}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
