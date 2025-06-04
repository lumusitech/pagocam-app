import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    globals: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/index.ts'],

    include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],

    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',

      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/*.d.ts',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/index.ts',
        '**/Specification.ts',
        '**/constants/**',
        '**/ports/**',
        '**/types/**',
        '**/errors/**',
      ],
    },
  },
})
