import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
  },
}));
