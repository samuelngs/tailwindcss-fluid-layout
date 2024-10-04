import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: 'vite.config.ts',
    test: {
      include: ['**/*.{test,spec}.{ts,tsx}'],
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        providerOptions: {},
        headless: true,
      },
    },
  },
]);
