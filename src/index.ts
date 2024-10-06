import createPlugin from 'tailwindcss/plugin';
import { generateGridStyles, generateLayoutStyles } from './generator';
import { getTailwindLayoutValues } from './layout-values';
import type { PluginOptions } from './schema';

export default createPlugin.withOptions((opts?: PluginOptions) => {
  return (api) => {
    const layouts = getTailwindLayoutValues(api, opts);

    api.addUtilities(generateLayoutStyles(layouts));
    api.addUtilities(generateGridStyles(layouts));
  };
});
