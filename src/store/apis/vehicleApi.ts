import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IModelVehicle, IPhotosVehicle, IVehicleForm, ResponseData } from '../../models';
import { IBrand } from '../../models/Brand';

const BASE_URL = process.env.REACT_APP_API_URL

interface IVehicle {
    id: number
    price: number
    state: number
    plate: string
    hasAir: boolean
    modelVehicle: IModelVehicle
    brandVehicle: IBrand
    photosVehicles:IPhotosVehicle[]

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
        getVehicleById: builder.query<IVehicle, string>({
            query: (id:string) => `vehicle/${id}`,
            transformResponse: (response: { data: IVehicle[] }, meta, arg) => response.data[0],
        }),
        getVehiclesFilter: builder.query<IVehicle[], { page: number, quantity: number, brandId: number, modelId: number, typeVehicleId: number }>({
            query: (args) => {
                const { page, quantity, brandId, modelId, typeVehicleId } = args
                return {
                    url: 'vehicle/getvehiclesfilter',
                    params: { page, quantity, brandId, modelId, typeVehicleId }
                }
            },
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
        createVehicle: builder.mutation<ResponseData, Partial<IVehicleForm>>({
            query: (body: IVehicleForm) => {
                return {
                    url: 'vehicle',
                    method: 'POST',
                    body
                }
            }
            , invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
        }),
        updateVehicle: builder.mutation<ResponseData, Partial<IVehicleForm>>({
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


export const { 
      useGetVehiclesQuery
    , useUpdateVehicleMutation
    , useCreateVehicleMutation
    , useDeleteVehicleMutation
    , useGetVehiclesFilterQuery
    , useGetVehicleByIdQuery } = vehicleApi