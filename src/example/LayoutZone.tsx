import { useMeasure } from 'react-use';

export interface LayoutZoneProps {
  name: string;
  className: string;
}

export function LayoutZone({ name, className }: LayoutZoneProps) {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`overflow-clip ${className}`}
      data-testid={`area-${name}`}
    >
      <div className="p-4 grid grid-flow-col gap-2 items-center w-fit">
        <span className="uppercase tracking-wide font-bold text-sm">
          {name}
        </span>
        <span className="text-sm text-cyan-300">({width}px)</span>
      </div>
    </div>
  );
}
