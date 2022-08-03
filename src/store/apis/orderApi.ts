import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../../models/Order';
import { ResponseData } from '../../models/ResponseData';



const BASE_URL = process.env.REACT_APP_API_URL



export const orderApi = createApi({
    reducerPath: 'orderApi',
    tagTypes: ['Orders'],
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void>({
            query: () => 'order',
            transformResponse: (response: { data: Order[] }, meta, arg) => response.data,
            providesTags: (result) => result
                ? // successful query
                [
                    { type: 'Orders', id: 'LIST' },
                ]
                : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
                [{ type: 'Orders', id: 'LIST' }],
        }),
        createOrder: builder.mutation<ResponseData, Partial<Order>>({
            query: (body: Order) => {
                return {
                    url: 'order',
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


export const { useGetOrdersQuery,useCreateOrderMutation} = orderApi