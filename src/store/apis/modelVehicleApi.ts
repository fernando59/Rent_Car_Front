import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IModelVehicle } from '../../models/ModelVehice';



const BASE_URL = process.env.REACT_APP_API_URL




export const modelVehicleApi = createApi({
    reducerPath: 'modelVehicleApi',
    tagTypes: ['ModelVehicles'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getModelVehicles: builder.query<IModelVehicle[], void>({
            query: () => 'modelVehicle',
            transformResponse: (response: { data: IModelVehicle[] }, meta, arg) => response.data,
            providesTags: (result) => result
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'ModelVehicles', id } as const)),
                    { type: 'ModelVehicles', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'ModelVehicles', id: 'LIST' }],
        }),
    })
})


export const { useGetModelVehiclesQuery } = modelVehicleApi