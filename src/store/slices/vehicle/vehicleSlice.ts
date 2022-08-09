import { createSlice } from "@reduxjs/toolkit"
import { IBrand } from "../../../models"

interface Values {
    brand: IBrand | null
    startDate: Date | null
    endDate: Date | null
}

const initialState: Values = {
    brand: null,
    endDate: null,
    startDate: null

}
export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        searchBrandVehicle: (state, { payload }) => {
            const starDate = payload.startDate
            const endDate= payload.endDate
            state.startDate = starDate
            state.endDate= endDate
            state.brand = payload.brand.id
            // localStorage.setItem('brand',JSON.stringify(state.brand))
            localStorage.setItem('startDate', JSON.stringify(starDate))
            localStorage.setItem('endDate', JSON.stringify(endDate))
        },
        getSearchBrandVehicle:(state)=>{
            const res = localStorage.getItem('searcVehicle')
        },
        clearBrand:(state) =>{
            state.brand = null
        }


    }


})

// Action creators are generated for each case reducer function
export const { searchBrandVehicle,clearBrand } = vehicleSlice.actions
