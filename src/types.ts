export type CSSUnit =
  | 'px'
  | 'pt'
  | 'pc'
  | 'cm'
  | 'mm'
  | 'in'
  | 'em'
  | 'rem'
  | 'ex'
  | 'ch'
  | '%'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'dvw'
  | 'dvh'
  | 'lvw'
  | 'lvh'
  | 'svw'
  | 'svh';

export type GridLayoutSize<U extends CSSUnit> = {
  name: string;
  size: Size<U>;
};

/**
 * Ensure all sizes in the config item are of the same unit
 */
export type Size<T extends CSSUnit> = `${number}${T}`;

/**
 * This type captures the uniform configuration items based on the unit of the first item
 */
export type GridLayoutSizes<T extends `${number}${CSSUnit}`> =
  T extends `${number}${infer U extends CSSUnit}` ? GridLayoutSize<U>[] : never;

export type GridLayoutOptions = {
  name: string;
  padding?: Size<CSSUnit>;
};

export type GridLayoutConfig<T extends `${number}${CSSUnit}`> = {
  sizes: GridLayoutSizes<T>;
  opts?: GridLayoutOptions;
};
