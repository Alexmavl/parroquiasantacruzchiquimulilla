import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
    env: {
      VITE_WHATSAPP: '50200000000',
      VITE_TELEFONO: '50200000000',
    },
  },
})
