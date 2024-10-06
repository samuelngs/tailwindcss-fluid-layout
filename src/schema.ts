import { z } from 'zod';
import { cssUnits, getUnit, isUnitOf, n } from './helpers/css-unit';

export const cssUnit = z.enum(cssUnits);

export const size = z.custom<`${number}${CSSUnit}`>(
  (val: string) => {
    return n(val) && cssUnits.some((unit) => isUnitOf(val, unit));
  },
  {
    message: 'Invalid CSS unit',
  },
);

export const config = z.record(
  z.string(),
  z.object({
    sizes: z.record(z.string(), size).refine(
      (map) => {
        const uniqueUnits = new Set(Object.values(map).map(getUnit));
        return uniqueUnits.size === 1;
      },
      {
        message: 'Inconsistent CSS units',
      },
    ),
    padding: size.optional(),
  }),
);

export const layout = z.object({
  name: z.string(),
  sizes: z.array(
    z.object({
      name: z.string(),
      size,
    }),
  ),
  padding: size.optional(),
});

export const pluginOptions = z.object({
  path: z.string().optional(),
  throwOnError: z.boolean().optional(),
});

export type CSSUnit = z.infer<typeof cssUnit>;
export type Size = z.infer<typeof size>;
export type Config = z.infer<typeof config>;
export type Layout = z.infer<typeof layout>;
export type PluginOptions = z.infer<typeof pluginOptions>;
