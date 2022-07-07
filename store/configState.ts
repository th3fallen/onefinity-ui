import { StateCreator } from "zustand";
import { merge } from 'lodash';
import produce from "immer";

export const createConfigSlice: StateCreator<any> = (set => ({
    config: {
        data: {},
        actions: {
            updateConfig: (data) => set(produce((state) => {
                state.config.data = merge(state.config.data, data);
            })),
        }
    },

}));
