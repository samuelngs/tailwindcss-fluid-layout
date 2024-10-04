import { LayoutZone } from './LayoutZone';

export function GridZones() {
  return (
    <div className="grid grid-cols-main row-start-1 col-start-1">
      <LayoutZone name="full" className="bg-black col-full" />
      <LayoutZone name="feature" className="bg-black/40 col-feature" />
      <LayoutZone name="popout" className="bg-black/50 col-popout" />
      <LayoutZone name="content" className="bg-black/60 col-content" />
      <LayoutZone name="compact" className="bg-black/90 col-compact" />
    </div>
  );
}
