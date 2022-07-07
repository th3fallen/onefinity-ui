import { useStore } from 'store/store';
import useWebSocket from 'react-use-websocket';
import { useEffect } from 'react';
import { isEmpty, omit } from 'lodash';
import { useQuery } from 'react-query';

export default function MachineStateUpdator() {

  const machineStateActions = useStore(store => store.machineState.actions);
  const configActions = useStore(store => store.config.actions);

  const { status, data, error, isFetching} = useQuery('/config/load');

  const { lastJsonMessage } = useWebSocket('ws://10.0.0.94/sockjs/websocket', {
    share: true,
  });

  useEffect(() => {
    const trimmedPayload = omit(lastJsonMessage, [
      'vdd',
      'vin',
      'vout',
      'motor',
      'temp',
      'heartbeat',
      'load1',
      'load2',
      'rpi_temp',
    ]);
    if (!isEmpty(trimmedPayload)) {
      if (trimmedPayload?.log) {
        if (trimmedPayload.log.msg === 'Switch not found') {
          // todo: PROBE FAILED
        }
        // todo: broadcast log message
        delete trimmedPayload.log;
      }
      machineStateActions.updateMachineState(trimmedPayload)
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (data) {
      configActions.updateConfig(data);
      machineStateActions.updateAxisInfo();
    }
  }, [data]);

  return null
}
