import create from 'zustand';
import { devtools } from "zustand/middleware";
import { createMachineSlice } from "store/machineState";
import { createConfigSlice } from "store/configState";

export const useStore = create()(devtools((...a) => ({
    ...createMachineSlice(...a),
    ...createConfigSlice(...a),
})))

export const { getState, setState, subscribe, destroy } = useStore;


export function useMachineState(fields = null) {
    return useStore(store => store.machineState);
}

export function useConfigState(fields = null) {
    return useStore(store => store.config);
}
