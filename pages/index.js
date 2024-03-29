import JoggingControls from 'components/JoggingControls';
import AxisInfo from 'components/AxisInfo';
import SystemState from 'components/SystemState';
import JobTabs from 'components/JobTabs';
import { useStore } from 'store/store';
import GcodeViewer from 'components/GcodeViewer';
import { useQuery } from 'react-query';

export default function Home() {

  return (
     <div className="home">
       <div className="flex flex-row h-96">
         <div className="flex-auto">
           <GcodeViewer />
         </div>
       </div>
       <div className="flex gap-4">
         <div className="flex-2">
           <JoggingControls/>
         </div>

         <div className="flex-auto">
           <AxisInfo/>
           <SystemState/>
         </div>
       </div>

       <div className="flex flex-row gap-4">
         <div className="flex-auto">
           <JobTabs/>
         </div>
       </div>
     </div>
  )
}
