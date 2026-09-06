import { symbol } from '../path/shapes.js';
import { intersectPoint } from '../util/intersect.js';
import markItemPath from './markItemPath.js';

const unitBounds = Object.create(null);

/** Size used to construct unit bounds, resulting in a scale factor of 1. */
const UNIT_SYMBOL_SIZE = 4;

/** Fallback symbol size used when no size is specified. Results in radius of 4. */
const FALLBACK_SYMBOL_SIZE = 64;

function unitBox(shape) {
  let box = unitBounds[shape];

  if (box === undefined) {
    const b = new Bounds();
    symbol(boundContext(b, 0), { shape, size: UNIT_SYMBOL_SIZE });
    box = unitBounds[shape] = [b.x1, b.y1, b.x2, b.y2];
  }

  return box;
}

function bound(bounds, item) {
  if (item.angle) {
    // Rotated shapes need their bounds recalculated.
    symbol(boundContext(bounds, item.angle), item);
  } else {
    const u = unitBox(item.shape || 'circle');
    const size = item.size ?? FALLBACK_SYMBOL_SIZE;
    const r = Math.sqrt(size) / 2;

    bounds.set(u[0] * r, u[1] * r, u[2] * r, u[3] * r);
  }

  return boundStroke(bounds, item, true).translate(item.x || 0, item.y || 0);
}
