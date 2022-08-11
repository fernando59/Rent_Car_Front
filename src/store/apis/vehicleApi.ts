import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IModelVehicle, IPhotosVehicle, ResponseData } from '../../models';
import { IBrand } from '../../models/Brand';

const BASE_URL = process.env.REACT_APP_API_URL

interface IVehicle {
    id: number
    price: number
    state: number
    plate: string
    year:number
    hasAir: boolean
    capacity:number
    description:string
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
        getVehiclesCount: builder.query<number, void>({
            query: () => 'vehicle/getVehiclesCount',
            transformResponse: (response: { dataOnly:any }, meta, arg) => response.dataOnly,
        }),
        getVehiclesOnlyOpen: builder.query<IVehicle[], void>({
            query: () => 'vehicle/getOnlyOpen',
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
        getVehiclePrice: builder.query<number[], void>({
            query: () => `vehicle/getPricesRange`,
            transformResponse: (response: { data: number[] }, meta, arg) => response.data,
        }),
   
        getVehiclesFilter: builder.query<IVehicle[], { page: number, quantity: number, brandId: number, modelId: number, typeVehicleId: number }>({
            query: (args) => {
                const { page, quantity, brandId, modelId, typeVehicleId } = args
                return {
                    url: 'vehicle/getvehiclesfilter',
                    params: { page, quantity, brandId, modelId, typeVehicleId }
                }
            },
            keepUnusedDataFor: 10,
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
        createVehicle: builder.mutation<ResponseData, Partial<any>>({
            query: (body: any) => {
                console.log(body)
                return {
                    url: 'vehicle',
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`,
                        // 'Content-Type': 'multipart/form-data'
                    },
                    body
                }
            }
            , invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
        }),
        updateVehicle: builder.mutation<ResponseData, Partial<any>>({
            query(body: any) {
                const id = parseInt( body.get('id'))
                // const {  ...body } = data
                return {
                    url: `vehicle/${id}`,
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`
                    },
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
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`
                    },
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
    , useGetVehiclePriceQuery
    , useGetVehicleByIdQuery
    ,useGetVehiclesOnlyOpenQuery
    ,useGetVehiclesCountQuery } = vehicleApi