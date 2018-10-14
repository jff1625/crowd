export function distance(origin, destination) {
  const a = origin.x - destination.x;
  const b = origin.y - destination.y;
  return Math.sqrt(a * a + b * b);
}

export function direction(origin, destination) {
  return Math.atan2(origin.y - destination.y, origin.x - destination.x);
}
