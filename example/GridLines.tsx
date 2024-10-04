import { LayoutLine } from './LayoutLine';

export function GridLines() {
  return (
    <div className="grid grid-cols-main row-start-1 col-start-1">
      <LayoutLine className="col-full" />
      <LayoutLine className="col-feature" />
      <LayoutLine className="col-popout" />
      <LayoutLine className="col-content" />
      <LayoutLine className="col-compact" />
    </div>
  );
}
