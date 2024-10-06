import { CustomThemeConfig } from 'tailwindcss/types/config';
import { expect, test } from 'vitest';
import { createTailwindMockApi } from './helpers/mock';
import { getTailwindLayoutValues } from './layout-values';
import type { Layout } from './schema';

function getValues(theme: Partial<CustomThemeConfig>): Layout[] {
  const mockApi = createTailwindMockApi(theme);
  return getTailwindLayoutValues(mockApi, { throwOnError: true });
}

test('using mutiple layout configurations', async () => {
  const values = getValues({
    layouts: {
      main: {
        sizes: {
          test: '200px',
        },
      },
      secondary: {
        sizes: {
          test: '300px',
        },
      },
    },
  });
  expect(values).toHaveLength(2);
});

test('sorting sizes within the layout configuration', async () => {
  const values = getValues({
    layouts: {
      grid: {
        sizes: {
          size1: '400px',
          size2: '1200px',
          size3: '800px',
          size4: '600px',
        },
      },
    },
  });
  expect(values).toHaveLength(1);

  const layout = values.at(0)!;
  expect(layout.sizes).toHaveLength(4);
  expect(layout.sizes[0].name).toBe('size2');
  expect(layout.sizes[1].name).toBe('size3');
  expect(layout.sizes[2].name).toBe('size4');
  expect(layout.sizes[3].name).toBe('size1');
  expect(layout.sizes[0].size).toBe('1200px');
  expect(layout.sizes[1].size).toBe('800px');
  expect(layout.sizes[2].size).toBe('600px');
  expect(layout.sizes[3].size).toBe('400px');
});

test('using a size without a length literal', async () => {
  expect(
    getValues.bind(undefined, {
      layouts: {
        grid: {
          sizes: {
            main: 200,
          },
        },
      },
    })
  ).toThrowError('Invalid CSS unit');
});

test('using inconsistent css units', async () => {
  expect(
    getValues.bind(undefined, {
      layouts: {
        grid: {
          sizes: {
            size1: '200px',
            size2: '50em',
          },
        },
      },
    })
  ).toThrowError('Inconsistent CSS units');
});
