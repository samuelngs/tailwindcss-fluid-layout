export interface LayoutLineProps {
  className: string;
}

export function LayoutLine({ className }: LayoutLineProps) {
  return (
    <div
      className={`row-start-1 border-x border-yellow-100 border-dashed ${className}`}
    />
  );
}
