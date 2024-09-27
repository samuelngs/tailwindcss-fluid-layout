import { LayoutArea } from './LayoutArea';

export function GridAreas() {
  return (
    <div className="grid grid-cols-main row-start-1 col-start-1">
      <LayoutArea name="full" className="bg-black col-full" />
      <LayoutArea name="feature" className="bg-black/40 col-feature" />
      <LayoutArea name="popout" className="bg-black/50 col-popout" />
      <LayoutArea name="content" className="bg-black/60 col-content" />
      <LayoutArea name="compact" className="bg-black/90 col-compact" />
    </div>
  );
}
