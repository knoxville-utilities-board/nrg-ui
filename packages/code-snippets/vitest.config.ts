import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html', 'clover', 'json', 'json-summary'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
      watermarks: {
        branches: [70, 85],
        functions: [70, 85],
        lines: [70, 85],
        statements: [70, 85],
      },
    },
    globals: true,
    environment: 'node',
    include: ['tests/**/*.ts'],
  },
});
