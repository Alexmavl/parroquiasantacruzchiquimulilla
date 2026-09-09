import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restablece el scroll de la ventana a la parte superior (0, 0)
 * cada vez que cambia la ruta de navegacion.
 */
export function ScrollToTop(): null {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}
