const unitBounds = Object.create(null);

function unitBox(shape) {
  let box = unitBounds[shape];

  if (box === undefined) {
    // Size 4 gives a scale of 1.
    const b = new Bounds();
    symbol(boundContext(b, 0), {shape, size: 4});
    box = unitBounds[shape] = [b.x1, b.y1, b.x2, b.y2];
  }

  return box;
}

function bound(bounds, item) {
  if (item.angle) {
    // Rotated shapes need their bounds recalculated.
    symbol(boundContext(bounds, item.angle), item);
  } else {
    const u = unitBox(item.shape || 'circle'),
          r = Math.sqrt(item.size != null ? item.size : 64) / 2;

    bounds.set(u[0] * r, u[1] * r, u[2] * r, u[3] * r);
  }

  return boundStroke(bounds, item, true).translate(item.x || 0, item.y || 0);
}
