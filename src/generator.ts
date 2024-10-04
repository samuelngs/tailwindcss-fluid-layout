import { CSSRuleObject } from 'tailwindcss/types/config';
import { Layout, Size } from './schema';

export function generateLayoutStyles(layouts: Layout[]): CSSRuleObject {
  return layouts.reduce<CSSRuleObject>((acc, { name, sizes, padding }) => {
    const template = generateGridTemplate(sizes);
    const variables = generateGridVariables(sizes, padding);

    return {
      ...acc,
      [`.grid-cols-${name}`]: {
        ...variables,
        display: 'grid',
        gridTemplateColumns: template,
      },
      [`.grid-rows-${name}`]: {
        ...variables,
        display: 'grid',
        gridTemplateRows: template,
      },
    };
  }, {});
}

export function generateGridStyles(layouts: Layout[]): CSSRuleObject {
  return layouts.reduce<CSSRuleObject>(
    (acc, { sizes }) => ({ ...generateGridLayoutStyles(sizes), ...acc }),
    {
      '.col-full': {
        gridColumn: 'full',
      },
      '.row-full': {
        gridRow: 'full',
      },
      ['.col-start-full']: {
        gridColumnStart: 'full',
      },
      ['.col-start-full-end']: {
        gridColumnStart: 'full-end',
      },
      ['.col-end-full']: {
        gridColumnEnd: 'full',
      },
      ['.col-end-full-start']: {
        gridColumnEnd: 'full-start',
      },
      ['.row-start-full']: {
        gridRowStart: 'full',
      },
      ['.row-start-full-end']: {
        gridRowStart: 'full-end',
      },
      ['.row-end-full']: {
        gridRowEnd: 'full',
      },
      ['.row-end-full-start']: {
        gridRowEnd: 'full-start',
      },
    }
  );
}

function gridLayoutGutter(
  i: number,
  name: string,
  sizes: Layout['sizes']
): string {
  const nextSize = sizes[i + 1];

  return nextSize
    ? `calc((min(var(--tw-layout-size), var(--tw-layout-${name}-size)) - var(--tw-layout-${nextSize.name}-size)) / 2)`
    : '0';
}

function generateGridLayoutStyles(sizes: Layout['sizes']): CSSRuleObject {
  return sizes.reduce(
    (acc, { name }) => ({
      [`.col-${name}`]: {
        gridColumn: name,
      },
      [`.row-${name}`]: {
        gridRow: name,
      },
      [`.col-start-${name}`]: {
        gridColumnStart: name,
      },
      [`.col-start-${name}-end`]: {
        gridColumnStart: `${name}-end`,
      },
      [`.col-end-${name}`]: {
        gridColumnEnd: name,
      },
      [`.col-end-${name}-start`]: {
        gridColumnEnd: `${name}-start`,
      },
      [`.row-start-${name}`]: {
        gridRowStart: name,
      },
      [`.row-start-${name}-end`]: {
        gridRowStart: `${name}-end`,
      },
      [`.row-end-${name}`]: {
        gridRowEnd: name,
      },
      [`.row-end-${name}-start`]: {
        gridRowEnd: `${name}-start`,
      },
      ...acc,
    }),
    {}
  );
}

function generateGridTemplate(sizes: Layout['sizes']): string {
  const inner = sizes
    .concat()
    .reverse()
    .reduce((acc: string, { name }: Layout['sizes'][number]) => {
      if (!acc) {
        return `[${name}-start] min(var(--tw-layout-size), var(--tw-layout-${name}-size)) [${name}-end]`;
      }

      const space = `minmax(0, var(--tw-layout-${name}-gutter))`;
      return `[${name}-start] ${space} ${acc} ${space} [${name}-end]`;
    }, '');

  const space = `minmax(var(--tw-layout-padding), 1fr)`;
  return `[full-start] ${space} ${inner} ${space} [full-end]`;
}

function generateGridVariables(
  sizes: Layout['sizes'],
  padding?: Size
): CSSRuleObject {
  return sizes.reduce(
    (acc, { name, size }, i) => ({
      ...acc,
      [`--tw-layout-${name}-size`]: size,
      [`--tw-layout-${name}-gutter`]: gridLayoutGutter(i, name, sizes),
    }),
    {
      [`--tw-layout-full-size`]: '100%',
      [`--tw-layout-padding`]: padding ?? `0px`,
      [`--tw-layout-size`]: `var(--tw-layout-full-size) - (var(--tw-layout-padding) * 2)`,
    }
  );
}
