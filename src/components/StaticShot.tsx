import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  badge?: string;
  /** Frame height in px — matches the slider (480 home, 470 entry). */
  height: number;
  priority?: boolean;
};

/** A single screenshot in the same framed box as the before/after slider, but
 *  static — used for entries with only one image (no `nowImage`), so we don't
 *  show a slider that just reveals the same picture twice. */
export function StaticShot({ src, alt, badge, height, priority = false }: Props) {
  return (
    <div className="ba ba--static" style={{ height }}>
      <div className="ba__layer">
        <Image
          src={src}
          alt={alt}
          fill
          className="ba__img"
          sizes="(max-width: 1100px) 100vw, 980px"
          priority={priority}
          draggable={false}
        />
        {badge && <span className="ba__badge ba__badge--before">{badge}</span>}
      </div>
    </div>
  );
}
