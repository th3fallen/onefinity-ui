import { useStore } from 'store/store';
import { Button, Table } from 'flowbite-react';
import Number from 'components/helpers/Number';
import shallow from 'zustand/shallow';

import 'styles/AxisInfo.scss';

export default function AxisInfo() {
  const axisInfo = useStore(store => store.machineState.data.axis_data, shallow);

  const renderAxisState = (axis) => {
    const axisState = axisInfo[axis];
    if (axisState.homed) {
      return <span>
        <i className="bi bi-check-circle-fill pr-2 text-green-500"/>Homed
      </span>
    }
    return <span>
      <i className="bi bi-x-circle-fill pr-2 text-red-500"/> Unhomed
    </span>
  };

  const renderToolpathState = (axis) => {
    const axisState = axisInfo[axis];
    if (axisState.tstate) {
      return <span>
        <i className="bi bi-check-circle-fill pr-2 text-green-500"/>OK
      </span>
    }
    return <span>
      <i className="bi bi-x-circle-fill pr-2 text-red-500"/> Over
    </span>
  };

  const buildAxisRow = (axis) => {
    return (
       <tr className={ `axis axis-${ axis }` }>
         <td className="axis-name text-2xl uppercase">{ axis }</td>
         <td>
           <Number value={ axisInfo[axis].pos } precision={ 4 }/>
         </td>
         <td>
           <Number value={ axisInfo[axis].abs } precision={ 3 }/>
         </td>
         <td>
           <Number value={ axisInfo[axis].off } precision={ 3 }/>
         </td>
         <td>{ renderAxisState(axis) }</td>
         <td>{ renderToolpathState(axis) }</td>
         <td>
           <div className="flex items-center gap-1 justify-end">
             <div className="btn-group">
               <div className="btn btn-outline" title={ `Set ${ axis } axis position.` }>
                 <i className="bi bi-gear-wide"/>
               </div>
               <div className="btn btn-outline" title={ `Zero ${ axis } axis offset.` }>
                 <i className="bi bi-geo-alt-fill"/>
               </div>
               <div className="btn btn-outline" title={ `Home ${ axis } axis.` }>
                 <i className="bi bi-house-fill"/>
               </div>
             </div>
           </div>
         </td>

       </tr>
    );
  };

  return (
     <table className="axis-info table w-full">
       <thead>
         <tr>
           <th>Axis</th>
           <th className="w-96">Positions</th>
           <th>Absolute</th>
           <th>Offset</th>
           <th>State</th>
           <th>Toolpath</th>
           <th>
             <div className="flex items-center gap-1 justify-end">
               <div className="btn-group">
                 <div className="btn btn-outline" title={ `Zero all axis offset.` }>
                   <i className="bi bi-geo-alt-fill"/>
                 </div>
                 <div className="btn btn-outline" title={ `Home all axis.` }>
                   <i className="bi bi-house-fill"/>
                 </div>
               </div>
             </div>
           </th>
         </tr>
       </thead>
       <tbody>
         { buildAxisRow('x') }
         { buildAxisRow('y') }
         { buildAxisRow('z') }
       </tbody>
     </table>
  );
}
