
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';





interface BrandVehicle {
    id?: number
    name: string
}

const BASE_URL = process.env.REACT_APP_API_URL

export const brandsVehicleApi = createApi({
    reducerPath: 'brandVehicle',
    tagTypes: ['BrandsVehicle'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getBrands: builder.query<BrandVehicle[], void>({
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
        createBrand: builder.mutation<BrandVehicle, Partial<BrandVehicle>>({
            query: (body: BrandVehicle) => {
                return {
                    url: '/brandVehicle',
                    method: 'POST',
                    body
                }
            }
            , invalidatesTags: [{ type: 'BrandsVehicle', id: 'LIST' }],
        }),
        deletePost: builder.mutation<{ success: boolean; id: number }, number>({
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


export const { useGetBrandsQuery, useCreateBrandMutation,useDeletePostMutation } = brandsVehicleApi