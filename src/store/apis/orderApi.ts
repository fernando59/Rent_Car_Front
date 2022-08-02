import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBrand } from '../../models/Brand';
import { Order } from '../../models/Order';
import { ResponseData } from '../../models/ResponseData';



const BASE_URL = process.env.REACT_APP_API_URL



export const orderApi = createApi({
    reducerPath: 'brandApi',
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getBrands: builder.query<Order[], void>({
            query: () => 'brandVehicle',
            transformResponse: (response: { data: Order[] }, meta, arg) => response.data,
            providesTags: (result) => result
                ? // successful query
                [
                    { type: 'Orders', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'Orders', id: 'LIST' }],
        }),
        createBrand: builder.mutation<ResponseData, Partial<IBrand>>({
            query: (body: IBrand) => {
                return {
                    url: 'brandVehicle',
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('token')!
                    },
                    body
                }
            }
            , invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),


    })
})


export const { } = orderApi