import { Excerpt } from "../types";

/* eslint-disable no-control-regex */

function hex(ch: string): string {
  return ch
    .charCodeAt(0)
    .toString(16)
    .toUpperCase();
}

function extract(txt: string, pos: number, len: number): string {
  return txt
    .substr(pos, len)
    .replace(/\\/g, "\\\\")
    .replace(/\x08/g, "\\b")
    .replace(/\t/g, "\\t")
    .replace(/\n/g, "\\n")
    .replace(/\f/g, "\\f")
    .replace(/\r/g, "\\r")
    .replace(/[\x00-\x07\x0B\x0E\x0F]/g, ch => "\\x0" + hex(ch))
    .replace(/[\x10-\x1F\x80-\xFF]/g, ch => "\\x" + hex(ch))
    .replace(/[\u0100-\u0FFF]/g, ch => "\\u0" + hex(ch))
    .replace(/[\u1000-\uFFFF]/g, ch => "\\u" + hex(ch));
}
/**
 * Create a source excerpt
 */
export const excerpt = (txt: string, offset: number): Excerpt => {
  const textLength = txt.length;

  let start = offset - 20;
  if (start < 0) start = 0;

  let end = offset + 20;
  if (end > textLength) end = textLength;

  return {
    prologTrunc: start > 0,
    prologText: extract(txt, start, offset - start),
    tokenText: extract(txt, offset, 1),
    epilogText: extract(txt, offset + 1, end - (offset + 1)),
    epilogTrunc: end < textLength
  };
};
