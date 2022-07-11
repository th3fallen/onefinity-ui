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
     <table className="table w-full mt-10">
       <tbody>
       <tr>
         <td>
           <table className="table w-full info border-1">
             <tbody>
             <tr>
               <th>State</th>
               <td>{ cycle.toUpperCase() }</td>
             </tr>
             <tr>
               <th>Message</th>
               <td className="message"></td>
             </tr>
             <tr title="Active machine units">
               <th>Units</th>
               <td className="mach_units">
                 <select className="select select-bordered" defaultValue={machUnits}>
                   <option value="METRIC">METRIC</option>
                   <option value="IMPERIAL">IMPERIAL</option>
                 </select>
               </td>
             </tr>
             <tr title="Active tool">
               <th>Tool</th>
               <td>{tool}</td>
             </tr>
             </tbody>
           </table>
         </td>
         <td>
           <table className="table w-full info">
             <tbody>
             <tr title="Current velocity in meters per minute">
               <th>Velocity</th>
               <td>
                 {v}<span className="unit"></span> m/min
               </td>
             </tr>
             <tr title="Programmed feed rate.">
               <th>Feed</th>
               <td>
                 {feed}<span className="unit"></span> mm/min
               </td>
             </tr>
             <tr title="Programed and actual speed.">
               <th>Speed</th>
               <td>{speed}<span>&nbsp;({s})</span> RPM
               </td>
             </tr>
             <tr title="Load switch states.">
               <th>Loads</th>
               <td><span>1:{load1 ? 'On' : 'Off'}</span>&nbsp;<span>2:{ load2 ? 'On' : 'Off'}</span></td>
             </tr>
             </tbody>
           </table>
         </td>
         <td>
           <table className="table w-full info">
             <tbody>
             <tr>
               <th>Remaining</th>
               <td
                  title="Total run time (days:hours:mins:secs)">
                 <span>{ toolpath.time || '00:00:00'}</span>
               </td>
             </tr>
             <tr>
               <th>ETA</th>
               <td className="eta">TODO</td>
             </tr>
             <tr>
               <th>Line</th>
               <td>{toolpath.lines}</td>
             </tr>
             <tr>
               <th>Progress</th>
               <td className="progress">
                 <label>TODO</label>
                 <div className="bar"></div>
               </td>
             </tr>
             </tbody>
           </table>
         </td>
       </tr>
       </tbody>
     </table>
  );
}
