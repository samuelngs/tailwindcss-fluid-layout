import type { PluginAPI } from 'tailwindcss/types/config';
import { n } from './helpers/css-unit';
import { prettyErrors } from './helpers/error';
import { getOptions } from './options';
import { type Config, type Layout, type PluginOptions, config } from './schema';

export function getTailwindLayoutValues(
  api: PluginAPI,
  params?: PluginOptions,
): Layout[] {
  const opts = getOptions(params);

  try {
    const values = config.parse(api.theme(opts.path) ?? {});
    return Object.entries(values).reduce<Layout[]>(
      (acc, [name, { sizes, padding }]) => {
        return acc.concat({
          name,
          sizes: getLayoutSizes(api, sizes),
          padding,
        });
      },
      [],
    );
  } catch (err) {
    if (opts.throwOnError) {
      throw err;
    }

    prettyErrors(opts.path!, err);
    return [];
  }
}

function getLayoutSizes(
  api: PluginAPI,
  sizes: Config[number]['sizes'],
): Layout['sizes'] {
  if (typeof sizes !== 'object' || sizes === null) return [];

  return Object.entries(sizes)
    .reduce<Layout['sizes']>(
      (acc, [name, size]) => acc.concat({ name: api.e(name), size }),
      [],
    )
    .sort((a, b) => n(b.size) - n(a.size));
}
