import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** width / height — sizes the frame to the image so it shows whole, no bands. */
  aspect: number;
  badge?: string;
  priority?: boolean;
};

/** A single screenshot in the same framed box as the before/after slider, but
 *  static — used for entries with only one image (no `nowImage`), so we don't
 *  show a slider that just reveals the same picture twice. The frame is sized to
 *  the image's aspect ratio (measured at build), so the whole shot shows with no
 *  crop and no letterbox bands. */
export function StaticShot({ src, alt, aspect, badge, priority = false }: Props) {
  return (
    <div className="ba ba--static" style={{ aspectRatio: String(aspect) }}>
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
