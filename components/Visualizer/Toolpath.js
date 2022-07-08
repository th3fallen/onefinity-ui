import { BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial, Uint8BufferAttribute } from 'three';

export default function Toolpath(toolpath) {
  const getColor = (speed) => {
    if (isNaN(speed)) return [255, 0, 0]; // Rapid

    let intensity = speed / toolpath.toolpath.maxSpeed;
    if (typeof speed === 'undefined') {
      intensity = 1;
    }
    return [0, 255 * intensity, 127 * (1 - intensity)];
  };

  const geometry = new BufferGeometry();
  const material = new LineBasicMaterial({
    vertexColors: true,
    linewidth: 1.5,
  });
  const positions = new Float32BufferAttribute(toolpath.pathPositions, 3)
  geometry.setAttribute('position', positions);

  let colors = [];
  for (let i = 0; i < toolpath.pathSpeeds.length; i++) {
    const color = getColor(toolpath.pathSpeeds[i]);
    Array.prototype.push.apply(colors, color);
  }
  colors = new Uint8BufferAttribute(colors, 3, true);
  geometry.setAttribute('color', colors);

  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  return new Line(geometry, material);
}
