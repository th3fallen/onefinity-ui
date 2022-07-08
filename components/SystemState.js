import { Table, Button, Select } from 'flowbite-react';

import { useMachineState, useStore } from 'store/store';
import shallow from 'zustand/shallow';

export default function SystemState() {

  const [cycle, machUnits, tool, v, feed, speed, s, load1, load2, toolpath] = useStore(store => [
     store.machineState.data.cycle,
     store.machineState.data.mach_units,
     store.machineState.data.tool,
     store.machineState.data.v,
     store.machineState.data.feed,
     store.machineState.data.speed,
     store.machineState.data.s,
     store.machineState.data['1oa'],
     store.machineState.data['2oa'],
     store.machineState.data.toolpath
  ], shallow);


  return (
     <Table className="table-auto w-full mt-10">
       <Table.Body>
       <Table.Row>
         <Table.Cell>
           <Table className="info">
             <Table.Body>
             <Table.Row>
               <Table.HeadCell>State</Table.HeadCell>
               <Table.Cell>{ cycle.toUpperCase() }</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.HeadCell>Message</Table.HeadCell>
               <Table.Cell className="message"></Table.Cell>
             </Table.Row>
             <Table.Row title="Active machine units">
               <Table.HeadCell>Units</Table.HeadCell>
               <Table.Cell className="mach_units">
                 <Select defaultValue={machUnits}>
                   <option value="METRIC">METRIC</option>
                   <option value="IMPERIAL">IMPERIAL</option>
                 </Select>
               </Table.Cell>
             </Table.Row>
             <Table.Row title="Active tool">
               <Table.HeadCell>Tool</Table.HeadCell>
               <Table.Cell>{tool}</Table.Cell>
             </Table.Row>
             </Table.Body>
           </Table>
         </Table.Cell>
         <Table.Cell>
           <Table className="info">
             <Table.Body>
             <Table.Row title="Current velocity in meters per minute">
               <Table.HeadCell>Velocity</Table.HeadCell>
               <Table.Cell>
                 {v}<span className="unit"></span> m/min
               </Table.Cell>
             </Table.Row>
             <Table.Row title="Programmed feed rate.">
               <Table.HeadCell>Feed</Table.HeadCell>
               <Table.Cell>
                 {feed}<span className="unit"></span> mm/min
               </Table.Cell>
             </Table.Row>
             <Table.Row title="Programed and actual speed.">
               <Table.HeadCell>Speed</Table.HeadCell>
               <Table.Cell>{speed}<span>&nbsp;({s})</span> RPM
               </Table.Cell>
             </Table.Row>
             <Table.Row title="Load switch states.">
               <Table.HeadCell>Loads</Table.HeadCell>
               <Table.Cell><span>1:{load1 ? 'On' : 'Off'}</span>&nbsp;<span>2:{ load2 ? 'On' : 'Off'}</span></Table.Cell>
             </Table.Row>
             </Table.Body>
           </Table>
         </Table.Cell>
         <Table.Cell>
           <Table className="info">
             <Table.Body>
             <Table.Row>
               <Table.HeadCell>Remaining</Table.HeadCell>
               <Table.Cell
                  title="Total run time (days:hours:mins:secs)">
                 <span>{ toolpath.time || '00:00:00'}</span>
               </Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.HeadCell>ETA</Table.HeadCell>
               <Table.Cell className="eta">TODO</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.HeadCell>Line</Table.HeadCell>
               <Table.Cell>{toolpath.lines}</Table.Cell>
             </Table.Row>
             <Table.Row>
               <Table.HeadCell>Progress</Table.HeadCell>
               <Table.Cell className="progress">
                 <label>TODO</label>
                 <div className="bar"></div>
               </Table.Cell>
             </Table.Row>
             </Table.Body>
           </Table>
         </Table.Cell>
       </Table.Row>
       </Table.Body>
     </Table>
  );
}
