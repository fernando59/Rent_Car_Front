

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false,
        mobileMenuActive:false
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isModalOpen = false;
        },
        activeMobileMenu:(state)=>{
            state.mobileMenuActive = true
        },
        desactiveMobileMenu:(state)=>{
            state.mobileMenuActive =false 
        },

    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal,activeMobileMenu,desactiveMobileMenu } = uiSlice.actions;