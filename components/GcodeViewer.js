import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loading from 'components/Visualizer/Loading';
import Scene from 'components/Visualizer/Scene';
import { OrbitControls } from '@react-three/drei';
import { useMachineState } from 'store/store';
import { useQuery } from 'react-query';
import DrawBounds from 'components/Visualizer/Box';
import Toolpath from 'components/Visualizer/Toolpath';

export default function GcodeViewer(props) {
  const selectedFile = useMachineState().data?.selected;

  async function getBuffer({ queryKey }) {
    const response = await fetch(`http://10.0.0.94/api${ queryKey }`);
    const arrayBuffer = await response.arrayBuffer();
    return new Float32Array(arrayBuffer);
  };

  const { data: toolpath } = useQuery(`/path/${ selectedFile }`, { enabled: !!selectedFile });
  const { data: pathPosition } = useQuery(`/path/${ selectedFile }/positions`, getBuffer, { enabled: !!selectedFile });
  const { data: pathSpeeds } = useQuery(`/path/${ selectedFile }/speeds`, getBuffer, { enabled: !!selectedFile });

  const data = {
    toolpath,
    pathPositions: pathPosition,
    pathSpeeds: pathSpeeds,
  };

  if (!selectedFile || !pathPosition || !pathSpeeds) {
    return 'loading';
  }

  return (
     <div className="machine-preview h-full">
       <Canvas
          shadows
          camera={ {
            fov: 45,
            near: 1,
            far: 10000,
            aspect: 4 / 3,
            position: [0, 0, 600],
          } }
       >
         <Scene toolpath={ data }/>
         <Suspense fallback={ Loading }>
           <DrawBounds toolpath={ data }/>
           <Toolpath toolpath={ data }/>
         </Suspense>
         <OrbitControls/>
       </Canvas>
     </div>
  )
}
