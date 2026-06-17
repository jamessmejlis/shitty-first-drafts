"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeBadge?: string;
  afterBadge?: string;
  /** Frame height in px — 480 on home, 470 on entry (capped shorter on mobile via CSS). */
  height: number;
  priority?: boolean;
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

/** Horizontal drag-to-reveal. The before layer is always fully painted; the
 *  after layer is clipped via clip-path so only the portion right of the handle
 *  shows. Pointer + touch + keyboard driven. */
export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeBadge,
  afterBadge,
  height,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(52);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPct(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setFromClientX(e.clientX);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* setPointerCapture can throw in some browsers — drag still works */
    }
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") setPct((p) => clamp(p - 2));
    else if (e.key === "ArrowRight") setPct((p) => clamp(p + 2));
    else if (e.key === "Home") setPct(0);
    else if (e.key === "End") setPct(100);
    else return;
    e.preventDefault();
  };

  const sizes = "(max-width: 1100px) 100vw, 980px";

  return (
    <div
      ref={ref}
      className="ba"
      style={{ height }}
      role="slider"
      aria-label={`Reveal slider: ${beforeAlt} versus ${afterAlt}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      tabIndex={0}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onKeyDown={onKeyDown}
    >
      {/* BEFORE layer — always fully painted */}
      <div className="ba__layer">
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="ba__img"
          sizes={sizes}
          priority={priority}
          draggable={false}
        />
        {beforeBadge && <span className="ba__badge ba__badge--before">▶ {beforeBadge}</span>}
      </div>

      {/* AFTER layer — clipped to the right of the handle */}
      <div className="ba__layer" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="ba__img"
          sizes={sizes}
          draggable={false}
        />
        {afterBadge && <span className="ba__badge ba__badge--after">{afterBadge} ◀</span>}
      </div>

      {/* Handle */}
      <div className="ba__handle" style={{ left: `${pct}%` }}>
        <span className="ba__knob" aria-hidden="true">
          ‹ ›
        </span>
      </div>
    </div>
  );
}
