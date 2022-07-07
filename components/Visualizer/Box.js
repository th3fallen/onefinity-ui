import { Box3, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, LineSegments, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { useStore } from 'store/store';
import Tool from 'components/Visualizer/Tool';

export function Box(props) {

  const addObject = (object) => {
    if (typeof object !== 'undefined') {
      const tempBox = new Box3();
      tempBox.setFromObject(object);
      boundaryBox.union(tempBox);
    }
  };

  const boundaryBox = new Box3(new Vector3(0,0,0), new Vector3(0.00001, 0.00001, 0.00001));


  return boundaryBox;
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

export default function DrawBounds() {
  const { scene } = useThree();
  const axisInfo = useStore(store => store.machineState.data.axis_data);


  let min = new Vector3();
  let max = new Vector3();

  min.x = axisInfo.x.min - axisInfo.x.off;
  min.y = axisInfo.y.min - axisInfo.y.off;
  min.z = axisInfo.z.min - axisInfo.z.off;
  max.x = axisInfo.x.max - axisInfo.x.off;
  max.y = axisInfo.y.max - axisInfo.y.off;
  max.z = axisInfo.z.max - axisInfo.z.off;

  const bounds = new Box3(min, max);


  const geometry = createBoxGeometry(bounds);
  const material = new LineBasicMaterial({color: 0xffffff});
  const line = new LineSegments(geometry, material);
  const envelopeLine = new LineSegments(geometry, new LineBasicMaterial({color: 0x00f7ff}))

  scene.add(line);
  scene.add(envelopeLine);
  scene.add(Tool(bounds, axisInfo));


  return bounds;
}
