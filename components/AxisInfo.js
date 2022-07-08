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
       <Table.Row className={ `axis axis-${ axis }` }>
         <Table.Cell className="axis-name text-2xl uppercase">{ axis }</Table.Cell>
         <Table.Cell>
           <Number value={ axisInfo[axis].pos } precision={ 4 }/>
         </Table.Cell>
         <Table.Cell>
           <Number value={ axisInfo[axis].abs } precision={ 3 }/>
         </Table.Cell>
         <Table.Cell>
           <Number value={ axisInfo[axis].off } precision={ 3 }/>
         </Table.Cell>
         <Table.Cell>{ renderAxisState(axis) }</Table.Cell>
         <Table.Cell>{ renderToolpathState(axis) }</Table.Cell>
         <Table.Cell>
           <div className="flex items-center gap-1 justify-end">
             <Button.Group outline>
               <Button color="dark" className="" title={ `Set ${ axis } axis position.` }>
                 <i className="bi bi-gear-wide"/>
               </Button>
               <Button color="dark" className="" title={ `Zero ${ axis } axis offset.` }>
                 <i className="bi bi-geo-alt-fill"/>
               </Button>
               <Button color="dark" className="" title={ `Home ${ axis } axis.` }>
                 <i className="bi bi-house-fill"/>
               </Button>
             </Button.Group>
           </div>
         </Table.Cell>

       </Table.Row>
    );
  };

  return (
     <Table className="axis-info">
       <Table.Head>
         <Table.HeadCell>Axis</Table.HeadCell>
         <Table.HeadCell className="w-96">Positions</Table.HeadCell>
         <Table.HeadCell>Absolute</Table.HeadCell>
         <Table.HeadCell>Offset</Table.HeadCell>
         <Table.HeadCell>State</Table.HeadCell>
         <Table.HeadCell>Toolpath</Table.HeadCell>
         <Table.HeadCell>
           <div className="flex items-center gap-1 justify-end">
             <Button.Group outline>
               <Button color="dark" className="" title={ `Zero all axis offset.` }>
                 <i className="bi bi-geo-alt-fill"/>
               </Button>
               <Button color="dark" className="" title={ `Home all axis.` }>
                 <i className="bi bi-house-fill"/>
               </Button>
             </Button.Group>
           </div>
         </Table.HeadCell>
       </Table.Head>
       <Table.Body>
         { buildAxisRow('x') }
         { buildAxisRow('y') }
         { buildAxisRow('z') }
       </Table.Body>
     </Table>
  );
}
