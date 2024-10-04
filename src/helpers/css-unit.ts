export const cssUnits: readonly [string, ...string[]] = [
  'px',
  'pt',
  'pc',
  'cm',
  'mm',
  'in',
  'em',
  'rem',
  'ex',
  'ch',
  '%',
  'vw',
  'vh',
  'vmin',
  'vmax',
  'dvw',
  'dvh',
  'lvw',
  'lvh',
  'svw',
  'svh',
];

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

export function getUnit<T extends string>(value: string): T | undefined {
  const units = cssUnits.join('|');
  const regex = new RegExp(`^[+-]?\\d+(\\.\\d+)?(${units}+)$`, 'g');

  return regex.exec(value)?.at(2) as T | undefined;
}

export function isUnitOf<T extends string>(value: string, unit: T): value is T {
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
