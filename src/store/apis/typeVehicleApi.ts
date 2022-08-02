import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseData } from '../../models';
import { ITypeVehicle } from '../../models/TypeVehicle';



const BASE_URL = process.env.REACT_APP_API_URL

export const typeVehicleApi = createApi({
    reducerPath: 'typeVehicleApi',
    tagTypes: ['TypeVehicles'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getTypeVehicles: builder.query<ITypeVehicle[], void>({
            query: () => 'typevehicle',
            transformResponse: (response: { data: ITypeVehicle[] }, meta, arg) => response.data,
            providesTags: (result) => result
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'TypeVehicles', id } as const)),
                    { type: 'TypeVehicles', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'TypeVehicles', id: 'LIST' }],
        }),
        createTypeVehicle: builder.mutation<ResponseData, Partial<ITypeVehicle>>({
            query: (body: ITypeVehicle) => {
                return {
                    url: 'typevehicle',
                    method: 'POST',
                    headers:{
                        'Authorization':localStorage.getItem('token')!
                    },
                    body
                }
            }
            , invalidatesTags: [{ type: 'TypeVehicles', id: 'LIST' }],
        }),
        updateTypeVehicle: builder.mutation<ResponseData, Partial<ITypeVehicle>>({
            query(data: ITypeVehicle) {
                const { id, ...body } = data
                return {
                    url: `typevehicle/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, { id }) => [{ type: 'TypeVehicles', id }],
        }),
        deleteTypeVehicle: builder.mutation<ResponseData, number>({
            query(id) {
                return {
                    url: `typevehicle/${id}`,
                    method: 'DELETE',
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, id) => [{ type: 'TypeVehicles', id }],
        }),
    })
})


export const { useGetTypeVehiclesQuery,useCreateTypeVehicleMutation,useDeleteTypeVehicleMutation,useUpdateTypeVehicleMutation } = typeVehicleApi