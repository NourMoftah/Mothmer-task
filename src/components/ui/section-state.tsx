type SectionStateProps = { className: string; message: string };

export function SectionState({ className, message }: SectionStateProps) {
  return <p className={className}>{message}</p>;
}
