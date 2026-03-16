import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    env: {
      MILJO: 'mock',
      USE_MSW: 'true',
    },
  },
})
