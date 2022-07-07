import { useThree } from '@react-three/fiber';
import { MeshPhongMaterial, Mesh, FrontSide, AmbientLight, Group, DirectionalLight, Color, Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Font } from 'three/examples/jsm/loaders/FontLoader'
import font from 'assets/fonts/helvetiker_regular.typeface.json';

export default function Loading(props) {
  const {scene, camera} = useThree();


  const geometry = new TextGeometry('Loading 3D View...', {
    font: new Font(font),
    size: 40,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  });
  geometry.computeBoundingBox();

  const mesh = new Mesh(geometry, new MeshPhongMaterial({
    specular: 0x111111,
    shininess: 10,
    side: FrontSide,
    color: 0x0c2d53
  }))

  scene.add(mesh);

  camera.position.copy(new Vector3(0, 0, 600));
  camera.lookAt(new Vector3(0, 0, 0));
}
