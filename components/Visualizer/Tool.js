import { CylinderGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';

export default function Tool(box, axisData) {
  const size = box.getSize(new Vector3());
  const length = Math.max(size.x + size.y + size.z / 24, 1);

  const material = new MeshPhongMaterial({
    transparent: true,
    opacity: 0.75,
    specular: 0x161616,
    shininess: 10,
    color: 0xffa500 // Orange
  });

  const geometry = new CylinderGeometry(50 / 2, 0, 50, 128);
  geometry.translate(0, axisData.z.pos, 0);
  geometry.rotateX(0.5 * Math.PI);

  const mesh = new Mesh(geometry, material);
  mesh.position.x = axisData.x.pos;
  mesh.position.y = axisData.y.pos;
  mesh.position.z = axisData.z.pos;

  return mesh;
}
