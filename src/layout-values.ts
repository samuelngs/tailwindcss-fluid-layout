import { PluginAPI } from 'tailwindcss/types/config';
import { n } from './helpers/css-unit';
import { prettyErrors } from './helpers/error';
import { config, Config, Layout } from './schema';

export function getTailwindLayoutValues(
  api: PluginAPI,
  path: string
): Layout[] {
  try {
    const values = config.parse(api.theme(path) ?? {});

    return Object.entries(values).reduce<Layout[]>(
      (acc, [name, { sizes, padding }]) => {
        return acc.concat({
          name,
          sizes: getLayoutSizes(api, sizes),
          padding,
        });
      },
      []
    );
  } catch (err) {
    prettyErrors(path, err);
    return [];
  }
}

function getLayoutSizes(
  api: PluginAPI,
  sizes: Config[number]['sizes']
): Layout['sizes'] {
  if (typeof sizes !== 'object' || sizes === null) return [];

  return Object.entries(sizes)
    .reduce<Layout['sizes']>(
      (acc, [name, size]) => acc.concat({ name: api.e(name), size }),
      []
    )
    .sort((a, b) => n(b.size) - n(a.size));
}
