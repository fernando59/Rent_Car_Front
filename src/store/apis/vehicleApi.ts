import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBrand } from '../../models/Brand';



const BASE_URL = process.env.REACT_APP_API_URL

interface IVehicle {
    id: number
    price:number
    state:number
    plate:string
    hasAir:boolean
    modelVehicle:IBrand

}
export const vehicleApi = createApi({
    reducerPath: 'vehicleApi',
    tagTypes: ['Vehicles'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getVehicles: builder.query<IVehicle[], void>({
            query: () => 'vehicle',
            transformResponse: (response: { data: IVehicle[] }, meta, arg) => response.data,
            providesTags: (result) => result
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'Vehicles', id } as const)),
                    { type: 'Vehicles', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'Vehicles', id: 'LIST' }],
        }),
    })
})


export const { useGetVehiclesQuery } = vehicleApi