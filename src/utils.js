export function getRelativeCoordinates(evt, containerRef) {
  const right = evt.clientX;
  const top = evt.clientY;
  const x = right - containerRef.current.getBoundingClientRect().x;
  const y = top - containerRef.current.getBoundingClientRect().y;
  return { x, y };
}
