import { Button, Card } from 'flowbite-react';
import GcodeViewer from 'components/GcodeViewer';
import { useStore } from 'store/store';
import { useQuery } from 'react-query';

export default function JobTab(props) {
  const selectedFile = useStore(store => store.machineState.data)?.selected;
  const { data: toolpath } = useQuery(`/path/${ selectedFile }`);
  const { data: pathPositions } = useQuery(`/path/${ selectedFile }/positions`);
  const { data: pathSpeeds } = useQuery(`/path/${ selectedFile }/speeds`);

  const data = {
    toolpath,
    pathPositions,
    pathSpeeds,
  };

  if (!selectedFile || !pathSpeeds) {
    return null;
  }
  console.log('JobTab:21', data);
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

       <div className="flex flex-row">
         <GcodeViewer toolpath={ data }/>
       </div>
     </Card>
  );
}
