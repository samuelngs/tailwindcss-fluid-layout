import { CSSUnit, GridLayoutSizes, Size } from './types';

export function n(input: string): number {
  const res = /^[+-]?\d+(\.\d+)?/g.exec(input);
  if (res === null) {
    throw new Error(`unable to read size of ${input}`);
  }

  const num = Number(res[0]);
  if (isNaN(num)) {
    throw new Error(`unable to read size of ${input}`);
  }
  return num;
}

export function sortSizes<T extends Size<CSSUnit>>(
  sizes: GridLayoutSizes<T>
): GridLayoutSizes<T> {
  return sizes.concat().sort((a, b) => {
    const sizeA = n(a.size);
    const sizeB = n(b.size);

    return sizeB - sizeA;
  }) as GridLayoutSizes<T>;
}

export function isUnitOf<T extends CSSUnit>(
  value: string,
  unit: T
): value is T {
  const regex = new RegExp(`^[+-]?\\d+(\\.\\d+)?(${unit})$`, 'g');
  return regex.test(value);
}

export function em2px(input: `${number}em`, base = 16.0): number {
  return n(input) * base;
}

export function rem2px(input: `${number}rem`, base = 16.0): number {
  return n(input) * base;
}

export function cm2px(input: `${number}cm`, ppi = 96.0): number {
  return (n(input) * ppi) / 2.54;
}

export function mm2px(input: `${number}mm`, ppi = 96.0): number {
  return (n(input) * ppi) / 25.4;
}

export function in2px(input: `${number}in`, ppi = 96.0): number {
  return n(input) * ppi;
}

export function pt2px(input: `${number}pt`): number {
  return n(input) * (1.0 / 0.75);
}

export function pc2px(input: `${number}pc`, base = 16.0): number {
  return n(input) * base;
}
