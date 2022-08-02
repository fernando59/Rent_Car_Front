import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IModelVehicle } from '../../models/ModelVehicle';
import { ResponseData } from '../../models/ResponseData';



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
        createModel: builder.mutation<ResponseData, Partial<IModelVehicle>>({
            query: (body: IModelVehicle) => {
                return {
                    url: 'modelVehicle',
                    method: 'POST',
                    headers:{
                        'Authorization':localStorage.getItem('token')!
                    },
                    body
                }
            }
            , invalidatesTags: [{ type: 'ModelVehicles', id: 'LIST' }],
        }),
        updateModel: builder.mutation<ResponseData, Partial<IModelVehicle>>({
            query(data: IModelVehicle) {
                const { id, ...body } = data
                return {
                    url: `modelVehicle/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, { id }) => [{ type: 'ModelVehicles', id }],
        }),
        deleteModel: builder.mutation<ResponseData, number>({
            query(id) {
                return {
                    url: `modelVehicle/${id}`,
                    method: 'DELETE',
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, id) => [{ type: 'ModelVehicles', id }],
        }),
    })
})


export const { useGetModelVehiclesQuery,useCreateModelMutation,useDeleteModelMutation,useUpdateModelMutation } = modelVehicleApi