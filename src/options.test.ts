import { expect, test } from 'vitest';
import { DEFAULT_PATH, DEFAULT_THROW_ON_ERROR, getOptions } from './options';

test('parse undefined options', async () => {
  const opts = getOptions();
  expect(opts).not.toBeUndefined();
  expect(opts).not.toBeNull();
  expect(opts).toBeTypeOf('object');
  expect(opts.path).toBe(DEFAULT_PATH);
  expect(opts.throwOnError).toBe(DEFAULT_THROW_ON_ERROR);
});

test('parse options with custom path', async () => {
  const path = 'hello_world';
  const opts = getOptions({ path });
  expect(opts).not.toBeUndefined();
  expect(opts).not.toBeNull();
  expect(opts).toBeTypeOf('object');
  expect(opts.path).toBe(path);
  expect(opts.throwOnError).toBe(DEFAULT_THROW_ON_ERROR);
});
