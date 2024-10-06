import type { CSSRuleObject } from 'tailwindcss/types/config';

export function css(
  input: CSSRuleObject,
  ...rest: CSSRuleObject[]
): CSSRuleObject {
  for (const obj of rest) {
    for (const [key, value] of Object.entries(obj)) {
      input[key] = value;
    }
  }
  return input;
}
