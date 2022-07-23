import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBrand } from '../../backoffice/models/Brand';



const BASE_URL = process.env.REACT_APP_API_URL



export const brandsVehicleApi = createApi({
    reducerPath: 'brandApi',
    tagTypes: ['BrandsVehicle'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getBrands: builder.query<IBrand[], void>({
            query: () => 'brandVehicle',
            providesTags: (result) => result
                ? // successful query
                [
                    ...result.map(({ id }) => ({ type: 'BrandsVehicle', id } as const)),
                    { type: 'BrandsVehicle', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'BrandsVehicle', id: 'LIST' }],
        }),
        createBrand: builder.mutation<IBrand, Partial<IBrand>>({
            query: (body: IBrand) => {
                return {
                    url: 'brandVehicle',
                    method: 'POST',
                    body
                }
            }
            , invalidatesTags: [{ type: 'BrandsVehicle', id: 'LIST' }],
        }),
        updateBrand: builder.mutation<IBrand, Partial<IBrand>>({
            query(data: IBrand) {
                const { id, ...body } = data
                return {
                    url: `brandVehicle/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, { id }) => [{ type: 'BrandsVehicle', id }],
        }),
        deleteBrand: builder.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `brandVehicle/${id}`,
                    method: 'DELETE',
                }
            },
            // Invalidates all queries that subscribe to this Post `id` only.
            invalidatesTags: (result, error, id) => [{ type: 'BrandsVehicle', id }],
        }),
    })
})


export const { useGetBrandsQuery, useUpdateBrandMutation, useCreateBrandMutation, useDeleteBrandMutation } = brandsVehicleApi