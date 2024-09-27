import plugin from 'tailwindcss/plugin';
import { gridStyles, layoutStyles } from './generator';
import { CSSUnit, GridLayoutOptions, GridLayoutSizes, Size } from './types';
import { sortSizes } from './utils';
import { validateSizes } from './validators';

export function fluidGrid<T extends Size<CSSUnit>>(
  sizes: GridLayoutSizes<T>,
  opts: GridLayoutOptions
): ReturnType<typeof plugin> {
  return plugin(function ({ addUtilities }) {
    validateSizes(sizes);

    const sortedSizes = sortSizes(sizes);

    addUtilities(layoutStyles('tw', sortedSizes, opts));
    addUtilities(gridStyles(sortedSizes));
  });
}
