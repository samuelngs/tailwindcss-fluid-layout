import { PluginOptions } from './schema';

export const DEFAULT_PATH = 'layouts';
export const DEFAULT_THROW_ON_ERROR = false;

export function getOptions(params?: PluginOptions): PluginOptions {
  return {
    path: DEFAULT_PATH,
    throwOnError: DEFAULT_THROW_ON_ERROR,
    ...params,
  };
}
