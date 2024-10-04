import createPlugin from 'tailwindcss/plugin';
import { generateGridStyles, generateLayoutStyles } from './generator';
import { getTailwindLayoutValues } from './layout-values';

export default createPlugin((api) => {
  const layouts = getTailwindLayoutValues(api, 'layouts');

  api.addUtilities(generateLayoutStyles(layouts));
  api.addUtilities(generateGridStyles(layouts));
});
