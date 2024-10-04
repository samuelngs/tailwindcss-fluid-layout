import { CSSRuleObject, PluginAPI } from 'tailwindcss/types/config';

interface MockPluginAPI extends PluginAPI {
  output(): CSSRuleObject;
}

export function createTailwindMockApi(
  theme: Record<string, any>
): MockPluginAPI {
  let css = {};

  return {
    addUtilities(objs: CSSRuleObject | CSSRuleObject[]) {
      css = { ...css, ...merge(objs) };
    },
    matchUtilities() {
      throw new Error('Function not implemented.');
    },
    addComponents() {
      throw new Error('Function not implemented.');
    },
    matchComponents() {
      throw new Error('Function not implemented.');
    },
    addBase() {
      throw new Error('Function not implemented.');
    },
    addVariant() {
      throw new Error('Function not implemented.');
    },
    matchVariant() {
      throw new Error('Function not implemented.');
    },
    theme(path?: string) {
      return typeof path === 'string' ? theme[path] : theme;
    },
    config() {
      throw new Error('Function not implemented.');
    },
    corePlugins() {
      throw new Error('Function not implemented.');
    },
    e(className: string) {
      return className;
    },
    output() {
      return css;
    },
  };
}

function merge(objs: CSSRuleObject | CSSRuleObject[]): CSSRuleObject {
  return ([] as CSSRuleObject[])
    .concat(objs)
    .reduce<CSSRuleObject>((acc, obj) => ({ ...acc, ...obj }), {});
}
