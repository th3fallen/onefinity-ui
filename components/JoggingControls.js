import { JOGGING_CONSTS } from 'util/axis-vars';
import { useState } from 'react';
import useWebSocket from 'react-use-websocket';

import 'styles/JoggingControls.scss';
import { useMachineState, useStore } from 'store/store';
import classNames from 'classnames';
import shallow from 'zustand/shallow';

export default function JoggingControls() {

  const [jogInc, machUnits] = useStore(state => [state.machineState.data.jog_incr, state.machineState.data.mach_units], shallow);
  const { sendMessage } = useWebSocket('ws://10.0.0.94/sockjs/websocket', {
    share: true,
    filter: () => false, // ignore all message updates
  });

  console.log('JoggingControls:17', jogInc, machUnits);

  const [jogIncrement, setJogIncrement] = useState(jogInc);

  const joggingIncrements = JOGGING_CONSTS.INCREMENTS[machUnits];

  const jog = (directions) => () => {
    if (!directions.includes(',')) {
      // alt actions
      return;
    }
    const [xJog, yJog, zJog, aJog] = directions.split(',');
    const xDirection = `X${ xJog * jogIncrement }`;
    const yDirection = `Y${ yJog * jogIncrement }`;
    const zDirection = `Z${ zJog * jogIncrement }`;
    const aDirection = `A${ aJog * jogIncrement }`;

    sendMessage(`G91\nG0 ${ xDirection } ${ yDirection } ${ zDirection } ${ aDirection }\n`);
  };

  const probe = (axis) => () => {

  };

  const goToZero = () => {

  };

  const setJogIncrements = (size) => () => {
    setJogIncrement(size);
  };

  return (
     <div className="jogging-controls grid grid-cols-4 w-64 place-items-center place-content-center">
       <div className="jogging-control row-span-1" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.upperLeft) }>
         <i className="bi bi-arrow-up-left"/>
       </div>
       <div className="jogging-control row-span-1" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.forward) }>
         <i className="bi bi-arrow-up"></i>
       </div>
       <div className="jogging-control row-span-1" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.upperRight) }>
         <i className="bi bi-arrow-up-right"></i>
       </div>
       <div className="jogging-control row-span-1" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.up) }>
         Z +
       </div>

       <div className="jogging-control row-span-2" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.left) }>
         <i className="bi bi-arrow-left"></i>
       </div>
       <div className="jogging-control row-span-2" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.center) }>
         <i className="bi bi-bullseye"></i>
       </div>
       <div className="jogging-control row-span-2" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.right) }>
         <i className="bi bi-arrow-right"></i>
       </div>
       <div className="jogging-control row-span-2" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.Z0) }>
         Z 0
       </div>

       <div className="jogging-control row-span-3" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.lowerLeft) }>
         <i className="bi bi-arrow-down-left"></i>
       </div>
       <div className="jogging-control row-span-3" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.back) }>
         <i className="bi bi-arrow-down"></i>
       </div>
       <div className="jogging-control row-span-3" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.lowerRight) }>
         <i className="bi bi-arrow-down-right"></i>
       </div>
       <div className="jogging-control row-span-3" onClick={ jog(JOGGING_CONSTS.DIRECTIONS.down) }>
         Z -
       </div>

       <div
          className={ classNames('jogging-control row-span-4', {
            active: jogIncrement === joggingIncrements.fine,
          }) }
          onClick={ setJogIncrements(joggingIncrements.fine) }>
         { joggingIncrements.fine }
       </div>
       <div
          className={ classNames('jogging-control row-span-4', {
            active: jogIncrement === joggingIncrements.small,
          }) }
          onClick={ setJogIncrements(joggingIncrements.small) }>
         { joggingIncrements.small }
       </div>
       <div
          className={ classNames('jogging-control row-span-4', {
            active: jogIncrement === joggingIncrements.medium,
          }) }
          onClick={ setJogIncrements(joggingIncrements.medium) }>
         { joggingIncrements.medium }
       </div>
       <div
          className={ classNames('jogging-control row-span-4', {
            active: jogIncrement === joggingIncrements.large,
          }) }
          onClick={ setJogIncrements(joggingIncrements.large) }>
         { joggingIncrements.large }
       </div>

       <div className="probe-control col-span-2 row-span-5" onClick={ probe('xyz') }>
         Probe XYZ
       </div>
       <div className="probe-control col-span-2 row-span-5" onClick={ probe('z') }>
         Probe Z
       </div>
     </div>
  );
}
