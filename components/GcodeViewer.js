import { Suspense } from 'react';
import OrbitControls from 'components/Visualizer/OrbitControls';
import { Canvas } from '@react-three/fiber';
import Draggable from 'components/Visualizer/Draggable';
import DrawBounds from 'components/Visualizer/Box';
import Loading from 'components/Visualizer/Loading';
import Scene from 'components/Visualizer/Scene';
import Axis from 'components/Visualizer/Axis';

export default function GcodeViewer(props) {

  return (
     <div className="machine-preview h-full">
       <Canvas
          shadows
          camera={ {
            fov: 45,
            far: 10000,
          } }
       >
         <Scene/>
         <Draggable>
           <Suspense fallback={ Loading }>
             <Axis/>
           </Suspense>
         </Draggable>
         <OrbitControls/>
       </Canvas>
     </div>
  )
}
