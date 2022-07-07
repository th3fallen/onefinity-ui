import { getCookie } from "cookies-next";
import { StateCreator } from "zustand";
import { merge } from 'lodash';
import produce from 'immer';
import getAxisInfo from "util/axis-vars";

export const createMachineSlice: StateCreator<any> = (set => ({
    machineState: {
        data: {
            mach_units: 'METRIC',
            mdi: '',
            last_file: undefined,
            last_file_time: undefined,
            toolpath: {},
            toolpath_progress: 0,
            axes: 'xyzabc',
            history: [],
            speed_override: 1,
            feed_override: 1,
            manual_home: {
                x: false,
                y: false,
                z: false,
                a: false,
                b: false,
                c: false,
            },
            position_msg: {
                x: false,
                y: false,
                z: false,
                a: false,
                b: false,
                c: false,
            },
            axis_position: 0,
            jog_step: !!getCookie('jog-step'),
            jog_adjust: parseInt(getCookie('jog-adjust') || '2'),
            deleteGCode: false,
            tab: 'auto',
            cycle: 'disconnected',
            jog_incr: 1.0,
            tool_diameter: 6.35,
            tool_diameter_for_prompt: 6.35,
            show_probe_test_modal: false,
            show_tool_diameter_modal: false,
            toolpath_msg: {
                x: false,
                y: false,
                z: false,
                a: false,
                b: false,
                c: false,
            },
            ask_home: true,
            ask_home_msg: false,
            ask_zero_xy_msg: false,
            ask_zero_z_msg: false,
            showGcodeMessage: false,
            axis_data: {
                x :{
                    pos: 0,
                    abs: 0,
                    off: 0,
                },
                y :{
                    pos: 0,
                    abs: 0,
                    off: 0,
                },
                z :{
                    pos: 0,
                    abs: 0,
                    off: 0,
                },
            }
        },
        actions: {
            updateMachineState: (data) => set(produce((state) => {
                state.machineState.data = merge(state.machineState.data, data);
                state.machineState.data.axis_data = getAxisInfo(state.machineState.data, state.config.data);
            })),
            updateAxisInfo: () => set(produce(state => {
                state.machineState.data.axis_data = getAxisInfo(state.machineState.data, state.config.data);
            })),
        }
    },
}));
