import {
  Box3,
  BoxGeometry,
  BufferGeometry,
  Float32BufferAttribute,
  FrontSide, GridHelper,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  Vector3,
} from 'three';
import { useThree } from '@react-three/fiber';
import { useMachineState } from 'store/store';
import Tool from 'components/Visualizer/Tool';

let box = new Box3(new Vector3(0, 0, 0), new Vector3(0.00001, 0.00001, 0.00001));

export function addToBox(obj) {
  if (typeof obj !== 'undefined') {
    const tempBox = new Box3();
    tempBox.setFromObject(obj);
    box = box.union(tempBox);
  }
}

function createBoxGeometry(boundingBox) {
  if (boundingBox.isEmpty()) {
    return false;
  }
  const vertices = [
    //Top
    boundingBox.min.x, boundingBox.min.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.min.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.min.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.min.y, boundingBox.max.z,
    boundingBox.max.x, boundingBox.min.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.min.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.min.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.min.y, boundingBox.min.z,
    //Bottom
    boundingBox.min.x, boundingBox.max.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.max.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.max.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.max.y, boundingBox.max.z,
    boundingBox.max.x, boundingBox.max.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.max.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.max.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.max.y, boundingBox.min.z,
    //Sides
    boundingBox.min.x, boundingBox.min.y, boundingBox.min.z,
    boundingBox.min.x, boundingBox.max.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.min.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.max.y, boundingBox.min.z,
    boundingBox.max.x, boundingBox.min.y, boundingBox.max.z,
    boundingBox.max.x, boundingBox.max.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.min.y, boundingBox.max.z,
    boundingBox.min.x, boundingBox.max.y, boundingBox.max.z,
  ];

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

  return geometry;
}

const generateEnvelope = (bounds) => {
  const envelopeGeometry = createBoxGeometry(bounds);
  return new LineSegments(envelopeGeometry, new LineBasicMaterial({ color: 0x00f7ff }))
};

export const generateWorkpiece = (toolpath, scene) => {
  if (!toolpath?.toolpath) {
    return;
  }
  let { min, max } = toolpath.toolpath.bounds;
  min = new Vector3(min.x, min.y, min.z);
  max = new Vector3(max.x, max.y, max.z);

  const dimensions = max.clone().sub(min);

  const geometry = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z);
  const mesh = new Mesh(geometry, new MeshPhongMaterial({
    specular: 0x111111,
    shininess: 10,
    side: FrontSide,
    color: 0xffffff, // White
    wireframe: true,
  }));

  const offset = dimensions.clone();
  offset.divideScalar(2);
  offset.add(min);

  mesh.position.add(offset);

  geometry.computeBoundingBox();

  scene.add(mesh);

  box = new Box3(min, max);
  return mesh;
};

export function buildBounds(axisInfo) {
  const min = new Vector3(axisInfo.x.min - axisInfo.x.off, axisInfo.y.min - axisInfo.y.off, axisInfo.z.min - axisInfo.z.off);
  const max = new Vector3(axisInfo.x.max - axisInfo.x.off, axisInfo.y.max - axisInfo.y.off, axisInfo.z.max - axisInfo.z.off);

  return new Box3(min, max);
}

export default function DrawBounds({ toolpath }) {
  const { scene } = useThree();
  const axisInfo = useMachineState().data.axis_data;

  if (!toolpath) {
    return null;
  }

  const box = buildBounds(axisInfo);

  const gridFloor = new GridHelper(1000, 10);
  gridFloor.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 2); // lay flat on  our z axis (world X)
  const center = new Vector3();
  box.getCenter(center);
  gridFloor.position.z = -33;
  gridFloor.position.x = center.x;
  gridFloor.position.y = center.y;
  scene.add(gridFloor);

  generateWorkpiece(toolpath, scene);
  scene.add(generateEnvelope(box));
  scene.add(Tool(box, axisInfo));

  return null;
}
