

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isModalOpen = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;