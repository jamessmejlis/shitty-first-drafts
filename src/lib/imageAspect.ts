import { readFileSync } from "node:fs";
import { join } from "node:path";

type Dim = { w: number; h: number };

/** Default frame ratio used when an image can't be read (also the CSS fallback). */
export const DEFAULT_ASPECT = 16 / 10;

/** Read an image's intrinsic aspect ratio (width / height) from `/public` at
 *  build time, so the before/after frame can be sized to the image with no
 *  layout shift and no client-side measurement. Supports PNG and JPEG (the
 *  formats we ship); falls back to {@link DEFAULT_ASPECT} for anything it can't
 *  read. */
export function imageAspect(publicPath: string): number {
  try {
    const buf = readFileSync(join(process.cwd(), "public", publicPath));
    const dim = pngSize(buf) ?? jpegSize(buf);
    if (dim && dim.h > 0) return dim.w / dim.h;
  } catch {
    /* fall through to default */
  }
  return DEFAULT_ASPECT;
}

function pngSize(buf: Buffer): Dim | null {
  // PNG signature (89 50 4E 47), then the IHDR chunk with width/height as
  // big-endian uint32 at byte offsets 16 and 20.
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function jpegSize(buf: Buffer): Dim | null {
  // JPEG starts with SOI (FF D8). Walk the segment markers until a Start-Of-Frame
  // (SOFn) marker, whose payload is precision(1) + height(2) + width(2).
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let off = 2;
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xff) {
      off++;
      continue;
    }
    let m = off + 1;
    while (buf[m] === 0xff) m++; // skip fill bytes
    const marker = buf[m];
    if (marker === 0xd8 || marker === 0xd9) {
      off = m + 1; // SOI / EOI carry no length
      continue;
    }
    if (marker === 0xda) break; // SOS — entropy-coded image data follows
    const len = buf.readUInt16BE(m + 1);
    // SOFn markers (C0–CF) except DHT (C4), JPG (C8) and DAC (CC).
    const isSOF =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) return { h: buf.readUInt16BE(m + 4), w: buf.readUInt16BE(m + 6) };
    off = m + 1 + len;
  }
  return null;
}
