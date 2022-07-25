import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITypeVehice } from '../../models/TypeVehicle';



const BASE_URL = process.env.REACT_APP_API_URL

export const typeVehicleApi = createApi({
    reducerPath: 'typeVehicleApi',
    tagTypes: ['TypeVehicles'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getTypeVehicles: builder.query<ITypeVehice[], void>({
            query: () => 'typevehicle',
            transformResponse: (response: { data: ITypeVehice[] }, meta, arg) => response.data,
            providesTags: (result) => result
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'TypeVehicles', id } as const)),
                    { type: 'TypeVehicles', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'TypeVehicles', id: 'LIST' }],
        }),
    })
})


export const { useGetTypeVehiclesQuery } = typeVehicleApi