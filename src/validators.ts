import { CSSUnit, GridLayoutSizes, Size } from './types';

export function validateSizes<T extends Size<CSSUnit>>(
  sizes: GridLayoutSizes<T>
) {
  checkUniqueNames(sizes);
}

export function checkUniqueNames<T extends Size<CSSUnit>>(
  sizes: GridLayoutSizes<T>
) {
  const names = sizes.map(({ name }) => name);
  const uniqueNames = new Set(names);

  if (names.length !== uniqueNames.size) {
    throw new Error(
      'Grid names contain non-unique values. Each name must be unique.'
    );
  }
  return;
}
