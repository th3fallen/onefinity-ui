import { Button, Card } from 'flowbite-react';
import GcodeViewer from 'components/GcodeViewer';
import { useMachineState } from 'store/store';
import { useQuery } from 'react-query';

export default function JobTab(props) {
  const machineState = useMachineState().data;

  return (
     <Card>
       <Button.Group>
         <Button size="lg">
           <i className="bi bi-play-fill"/>
         </Button>
         <Button size="lg">
           <i className="bi bi-stop-circle"/>
         </Button>
         <Button size="lg">
           <i className="bi bi-folder-plus"/>
         </Button>
         <Button size="lg">
           <i className="bi bi-download"/>
         </Button>
         <Button size="lg">
           <i className="bi bi-trash"/>
         </Button>
       </Button.Group>

       <div className="text-white">
         <p>Selected File: { machineState.selected }</p>
         <p>Queued: { machineState.queued }</p>
       </div>

       <div className="flex flex-row">
         <GcodeViewer/>
       </div>
     </Card>
  );
}
