/** A monospace `// TODO` seam. The site admits its own unfinished state on
 *  purpose — these are intentional copy, not leftover debugging. */
export function TodoSeam({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div className={`seam${className ? ` ${className}` : ""}`}>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </div>
  );
}
