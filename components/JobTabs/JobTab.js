import { Button, Card } from 'flowbite-react';
import GcodeViewer from 'components/GcodeViewer';
import { useMachineState } from 'store/store';
import { useQuery } from 'react-query';

export default function JobTab(props) {
  const machineState = useMachineState().data;

  return (
     <div className="card">
       <div className="card-body">
         <div className="btn-group">
           <div className="btn btn-lg">
             <i className="bi bi-play-fill"/>
           </div>
           <div className="btn btn-lg">
             <i className="bi bi-stop-circle"/>
           </div>
           <div className="btn btn-lg">
             <i className="bi bi-folder-plus"/>
           </div>
           <div className="btn btn-lg">
             <i className="bi bi-download"/>
           </div>
           <div className="btn btn-lg">
             <i className="bi bi-trash"/>
           </div>
         </div>

         <div className="text-white">
           <p>Selected File: { machineState.selected }</p>
           <p>Queued: { machineState.queued }</p>
         </div>

         <div className="flex flex-row">
           <GcodeViewer/>
         </div>
       </div>
     </div>
  );
}
