import { BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial, Uint8BufferAttribute } from 'three';

export default function Toolpath(toolpath) {
  const getColor = (speed) => {
    if (isNaN(speed)) return [255, 0, 0]; // Rapid

    let intensity = speed / toolpath.toolpath.maxSpeed;
    if (typeof speed == 'undefined') {
      intensity = 1;
    }
    return [0, 255 * intensity, 127 * (1 - intensity)];
  };

  const geometry = new BufferGeometry();
  const material = new LineBasicMaterial({
    linewidth: 1.5,
  });
  const positions = new Float32BufferAttribute()
  geometry.setAttribute('position', positions);

  const colors = new Uint8BufferAttribute(toolpath.pathSpeeds.map(speed => getColor(speed)), 3, true);
  geometry.setAttribute('color', colors);

  geometry.computeBoundingSphere();
  geometry.computeBoundingBox();

  return new Line(geometry, material);
}
