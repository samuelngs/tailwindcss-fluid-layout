import { CSSRuleObject } from 'tailwindcss/types/config';
import {
  CSSUnit,
  GridLayoutOptions,
  GridLayoutSize,
  GridLayoutSizes,
  Size,
} from './types';

export function layoutStyles<T extends Size<CSSUnit>>(
  prefix: string,
  sizes: GridLayoutSizes<T>,
  { name, padding }: GridLayoutOptions
): CSSRuleObject {
  const template = gridContainerTemplate(prefix, sizes);
  const variables = sizes.reduce(
    (acc, { name, size }, i) => ({
      ...acc,
      [`--${prefix}-layout-${name}-size`]: size,
      [`--${prefix}-layout-${name}-gutter`]: gridContainerGutter(
        prefix,
        i,
        name,
        sizes
      ),
    }),
    {
      [`--${prefix}-layout-full-size`]: '100%',
      [`--${prefix}-layout-padding`]: padding ?? `0px`,
      [`--${prefix}-layout-size`]: `var(--${prefix}-layout-full-size) - (var(--${prefix}-layout-padding) * 2)`,
    }
  );

  return {
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
}

export function gridStyles<T extends Size<CSSUnit>>(
  sizes: GridLayoutSizes<T>
): CSSRuleObject {
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

function gridContainerGutter<T extends Size<CSSUnit>>(
  prefix: string,
  i: number,
  name: string,
  sizes: GridLayoutSizes<T>
): string {
  const nextSize = sizes[i + 1];

  return nextSize
    ? `calc((min(var(--${prefix}-layout-size), var(--${prefix}-layout-${name}-size)) - var(--${prefix}-layout-${nextSize.name}-size)) / 2)`
    : '0';
}

function gridContainerTemplate<T extends Size<CSSUnit>>(
  prefix: string,
  sizes: GridLayoutSizes<T>
): string {
  const reducer = gridContainerTemplateReducer(prefix);
  const inner = sizes.concat().reverse().reduce(reducer, '');

  const space = `minmax(var(--${prefix}-layout-padding), 1fr)`;
  return `[full-start] ${space} ${inner} ${space} [full-end]`;
}

function gridContainerTemplateReducer(prefix: string) {
  return function reducer(
    previous: string,
    { name }: GridLayoutSize<CSSUnit>
  ): string {
    if (!previous) {
      return `[${name}-start] min(var(--${prefix}-layout-size), var(--${prefix}-layout-${name}-size)) [${name}-end]`;
    }

    const space = `minmax(0, var(--${prefix}-layout-${name}-gutter))`;
    return `[${name}-start] ${space} ${previous} ${space} [${name}-end]`;
  };
}
