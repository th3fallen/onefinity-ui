import { CylinderGeometry, Group, Mesh, MeshPhongMaterial, Vector3 } from 'three';
import Box from 'components/Visualizer/Box';
import { useThree } from '@react-three/fiber';

// yes i know i could use AxesHelper from three but this is prettier and i hate myself

export default function Axis() {

  const {scene} = useThree();

  const drawAxis = (axis, length, radius) => {
      let color;

      if (axis === 'x')      color = 0xff0000; // Red
      else if (axis === 'y') color = 0x00ff00; // Green
      else if (axis === 'z') color = 0x0000ff; // Blue

      const group = new Group();
      const material = new MeshPhongMaterial({
        specular: 0x161616, shininess: 10, color: color
      });
      let geometry = new CylinderGeometry(radius, radius, length, 128);
      geometry.translate(0, -length / 2, 0);
      group.add(new Mesh(geometry, material));

      geometry = new CylinderGeometry(1.5 * radius, 0, 2 * radius, 128);
      geometry.translate(0, -length - radius, 0);
      group.add(new Mesh(geometry, material));

      if (axis === 'x')      group.rotateZ((0.5) * Math.PI);
      else if (axis === 'y') group.rotateX((1) * Math.PI);
      else if (axis === 'z') group.rotateX((1.5) * Math.PI);

      return group;
  };

  const size = Box().getSize(new Vector3());
  let length = Math.max((size.x + size.y + size.z) / 3, 1);
  length /= 10;

  const radius = length / 20;
  const group = new Group();

  group.add(drawAxis('x', length, radius));
  group.add(drawAxis('y', length, radius));
  group.add(drawAxis('z', length, radius));
  // group.add(drawAxis('a', length, radius));
  // group.add(drawAxis('b', length, radius));
  // group.add(drawAxis('c', length, radius));

  scene.add(group);

  return null;
}
