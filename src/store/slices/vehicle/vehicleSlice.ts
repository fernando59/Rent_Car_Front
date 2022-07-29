import { createSlice } from "@reduxjs/toolkit"

interface Values {
    valueSearch:any
}

const initialState:Values ={
    valueSearch:{}
}
export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        searchBrandVehicle: (state, { payload }) => {
            console.log(payload)
            state.valueSearch = payload
            
        }
    
    
    }


})

// Action creators are generated for each case reducer function
export const { searchBrandVehicle } = vehicleSlice.actions
