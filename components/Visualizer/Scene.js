import { useThree } from '@react-three/fiber';
import { AmbientLight, Color, DirectionalLight, Group } from 'three';
import DrawBounds from 'components/Visualizer/Box';


export default function Scene() {

  const { scene } = useThree();

  const lights = () => {
    const keyLight = new DirectionalLight
    (new Color('hsl(30, 100%, 75%)'), 0.75);
    keyLight.position.set(-100, 0, 100);

    const fillLight = new DirectionalLight
    (new Color('hsl(240, 100%, 75%)'), 0.25);
    fillLight.position.set(100, 0, 100);

    const backLight = new DirectionalLight(0xffffff, 0.5);
    backLight.position.set(100, 0, -100).normalize();


    const lights = new Group()
    lights.add(keyLight);
    lights.add(fillLight);
    lights.add(backLight);

    return lights;
  };

  scene.add(new AmbientLight(0xffffff, 0.5));
  scene.add(lights())
  DrawBounds(scene);

  return null;
}
