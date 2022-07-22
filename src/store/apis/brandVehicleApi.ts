
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';





interface BrandVehicle{
    id:number
    name:string
}

const BASE_URL =process.env.REACT_APP_API_URL

export const brandsVehicleApi = createApi({
    reducerPath:'brandVehicle',
    baseQuery:fetchBaseQuery({ baseUrl:BASE_URL }),
    endpoints:(builder)=>({
        getBrands:builder.query<BrandVehicle[],void>({
            query:()=>'/brandVehicle'
        })
    })
})


export const {useGetBrandsQuery} =brandsVehicleApi