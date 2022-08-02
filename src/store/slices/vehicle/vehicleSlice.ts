import { createSlice } from "@reduxjs/toolkit"

interface Values {
    valueSearch: any
}

const initialState: Values = {
    valueSearch: null
}
export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        searchBrandVehicle: (state, { payload }) => {
            const data = JSON.stringify(payload)
            state.valueSearch = payload
            localStorage.setItem('searchVehicle', data)
        }


    }


})

// Action creators are generated for each case reducer function
export const { searchBrandVehicle } = vehicleSlice.actions
