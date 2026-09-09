import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/layout/Layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      { index: true, lazy: () => import('./pages/Inicio') },
      {
        path: 'sacramentos',
        lazy: () => import('./features/sacramentos/pages/SacramentosIndex'),
        entry: 'src/features/sacramentos/pages/SacramentosIndex.tsx',
      },
      {
        path: 'sacramentos/:slug',
        lazy: () => import('./features/sacramentos/pages/SacramentoDetalle'),
        entry: 'src/features/sacramentos/pages/SacramentoDetalle.tsx',
      },
      {
        path: 'guia-confesion',
        lazy: () => import('./features/sacramentos/pages/GuiaConfesion'),
      },
      { path: 'horarios', lazy: () => import('./pages/Horarios') },
      {
        path: 'comunidades',
        lazy: () => import('./features/comunidades/pages/ComunidadesIndex'),
        entry: 'src/features/comunidades/pages/ComunidadesIndex.tsx',
      },
      {
        path: 'comunidades/:slug',
        lazy: () => import('./features/comunidades/pages/ComunidadDetalle'),
        entry: 'src/features/comunidades/pages/ComunidadDetalle.tsx',
      },
      {
        path: 'registros',
        lazy: () => import('./features/registros/pages/Registros'),
        entry: 'src/features/registros/pages/Registros.tsx',
      },
      { path: 'historia', lazy: () => import('./pages/Historia') },
      { path: '*', lazy: () => import('./pages/NoEncontrado') },
    ],
  },
]
