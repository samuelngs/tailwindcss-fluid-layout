import type { Config } from 'tailwindcss';
import tailwindFluidGrid from './src';

const config: Config = {
  content: ['./src/**/*.tsx'],
  plugins: [tailwindFluidGrid],
  theme: {
    extend: {
      layouts: {
        main: {
          padding: '16px',
          sizes: {
            compact: '400px',
            content: '800px',
            popout: '1200px',
            feature: '1400px',
          },
        },
      },
    },
  },
};

export default config;
