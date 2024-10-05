import { expect, test } from 'vitest';
import { generateGridStyles, generateLayoutStyles } from './generator';

test('generate layout styles', async () => {
  const styles = generateLayoutStyles([
    {
      name: 'main',
      sizes: [
        { name: 'content', size: '800px' },
        { name: 'breakout', size: '1400px' },
      ],
    },
    {
      name: 'secondary',
      sizes: [
        { name: 'content', size: '900px' },
        { name: 'breakout', size: '1200px' },
      ],
    },
  ]);
  expect(styles).toHaveProperty('.grid-cols-main');
  expect(styles).toHaveProperty('.grid-rows-main');
  expect(styles).toHaveProperty('.grid-cols-secondary');
  expect(styles).toHaveProperty('.grid-rows-secondary');
});

test('generate grid styles', () => {
  const styles = generateGridStyles([
    {
      name: 'main',
      sizes: [
        { name: 'content', size: '800px' },
        { name: 'breakout', size: '1400px' },
      ],
    },
  ]);
  expect(styles).toHaveProperty('.col-content');
  expect(styles).toHaveProperty('.col-breakout');
  expect(styles).toHaveProperty('.row-content');
  expect(styles).toHaveProperty('.row-breakout');
});
