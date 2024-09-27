import type { Config } from 'tailwindcss';
import { fluidGrid } from './src';

const config: Config = {
  content: ['./src/**/*.tsx'],
  plugins: [
    fluidGrid(
      [
        { name: 'compact', size: '400px' },
        { name: 'content', size: '800px' },
        { name: 'popout', size: '1200px' },
        { name: 'feature', size: '1400px' },
      ],
      {
        name: 'main',
        padding: '16px',
      }
    ),
  ],
};

export default config;
