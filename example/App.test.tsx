import { page } from '@vitest/browser/context';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from './App';

test('renders fluid grid layout', async () => {
  const app = render(<App />);

  const fullArea = app.getByTestId('area-full');
  const featureArea = app.getByTestId('area-feature');
  const popoutArea = app.getByTestId('area-popout');
  const contentArea = app.getByTestId('area-content');
  const compactArea = app.getByTestId('area-compact');

  await expect.element(fullArea).toBeInTheDocument();
  await expect.element(featureArea).toBeInTheDocument();
  await expect.element(popoutArea).toBeInTheDocument();
  await expect.element(contentArea).toBeInTheDocument();
  await expect.element(compactArea).toBeInTheDocument();

  await page.viewport(1500, 700);

  const fullAreaEl = fullArea.query()!;
  const featureAreaEl = featureArea.query()!;
  const popoutAreaEl = popoutArea.query()!;
  const contentAreaEl = contentArea.query()!;
  const compactAreaEl = compactArea.query()!;

  expect(fullAreaEl.clientWidth).eq(1500);
  expect(featureAreaEl.clientWidth).eq(1400);
  expect(popoutAreaEl.clientWidth).eq(1200);
  expect(contentAreaEl.clientWidth).eq(800);
  expect(compactAreaEl.clientWidth).eq(400);

  await page.viewport(1000, 700);

  expect(fullAreaEl.clientWidth).eq(1000);
  expect(featureAreaEl.clientWidth).eq(1000 - 16 * 2);
  expect(popoutAreaEl.clientWidth).eq(1000 - 16 * 2);
  expect(contentAreaEl.clientWidth).eq(800);
  expect(compactAreaEl.clientWidth).eq(400);

  await page.viewport(430, 700);

  expect(fullAreaEl.clientWidth).eq(430);
  expect(featureAreaEl.clientWidth).eq(430 - 16 * 2);
  expect(popoutAreaEl.clientWidth).eq(430 - 16 * 2);
  expect(contentAreaEl.clientWidth).eq(430 - 16 * 2);
  expect(compactAreaEl.clientWidth).eq(430 - 16 * 2);
});
