import { Suspense } from 'react';
import OrbitControls from 'components/Visualizer/OrbitControls';
import { Canvas } from '@react-three/fiber';
import Draggable from 'components/Visualizer/Draggable';
import Loading from 'components/Visualizer/Loading';
import Scene from 'components/Visualizer/Scene';
import Axis from 'components/Visualizer/Axis';
import { useStore } from 'store/store';
import { useQuery } from 'react-query';

export default function GcodeViewer(props) {
  const selectedFile = useStore(store => store.machineState.data)?.selected;

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
            far: 10000,
          } }
       >
         <Scene toolpath={ data }/>
         <Draggable>
           <Suspense fallback={ Loading }>
           </Suspense>
         </Draggable>
         <OrbitControls/>
       </Canvas>
     </div>
  )
}
