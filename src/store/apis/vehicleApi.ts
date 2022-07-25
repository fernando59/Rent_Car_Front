import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBrand } from '../../models/Brand';
import { IModelVehicle } from '../../models/ModelVehice';
import { ResponseData } from '../../models/ResponseData';
import { IVehicleForm } from '../../models/Vehicle';



const BASE_URL = process.env.REACT_APP_API_URL

interface IVehicle {
    id: number
    price: number
    state: number
    plate: string
    hasAir: boolean
    modelVehicle: IModelVehicle
    brandVehicle:IBrand

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
                ?
                [
                    ...result.map(({ id }) => ({ type: 'Vehicles', id } as const)),
                    { type: 'Vehicles', id: 'LIST' },
                ]
                :
                [{ type: 'Vehicles', id: 'LIST' }],
        }),
        createVehicle: builder.mutation<ResponseData, Partial<IVehicle>>({
            query: (body: IVehicleForm) => {
                return {
                    url: 'vehicle',
                    method: 'POST',
                    body
                }
            }
            , invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
        }),
        updateVehicle: builder.mutation<ResponseData, Partial<IBrand>>({
            query(data: IVehicleForm) {
                const { id, ...body } = data
                return {
                    url: `vehicle/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, { id }) => [{ type: 'Vehicles', id }],
        }),
        deleteVehicle: builder.mutation<ResponseData, number>({
            query(id) {
                return {
                    url: `vehicle/${id}`,
                    method: 'DELETE',
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, id) => [{ type: 'Vehicles', id }],
        }),
    })
})


export const { useGetVehiclesQuery,useUpdateVehicleMutation, useCreateVehicleMutation,useDeleteVehicleMutation } = vehicleApi