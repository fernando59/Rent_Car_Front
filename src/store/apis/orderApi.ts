import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../../models/Order';
import { ResponseData } from '../../models/ResponseData';



const BASE_URL = process.env.REACT_APP_API_URL



type OrderChange = {
    id: number,
    status: number
}

type dataChart ={
    vehicle:string
    count:number

}
type datas ={
    labels:string[]
    data:number[]
}
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
        getOrdersByDay: builder.query<number, void>({
            query: () => 'order/GetOrdersByDay',
            transformResponse: (response: { dataOnly: any }, meta, arg) => response.dataOnly,
        }),
        getOrdersChart: builder.query<any, void>({
            query: () => 'order/GetOrderChart',
            transformResponse: (response: { data: any }, meta, arg) => {
                const map:any ={}

                const responseData:datas ={
                    'labels':['A', 'B', 'C'],
                    'data':[]
                }
                response.data.map((item:dataChart)=>{
                    map[item.vehicle.toUpperCase()] = item.count
                })
                responseData.labels = Object.keys(map)
                responseData.data= Object.values(map)
                
                return responseData
            }
        }),
        getOrdersByUser: builder.query<Order[], void>({
            query: () => {
                return {
                    url: 'order/getOrdersByUser',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`
                    },
                }
            },
            keepUnusedDataFor: 10,
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
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`
                    },
                    body
                }
            }
            , invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),
        createOrderAdmin: builder.mutation<ResponseData, Partial<any>>({
            query: (body: any) => {
                return {
                    url: 'order/createOrderAdmin',
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`
                    },
                    body
                }
            }
            , invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),
        updateOrder: builder.mutation<ResponseData, Partial<OrderChange>>({
            query: (data: OrderChange) => {
                const { id, ...body } = data
                return {
                    url: `order/${id}`,
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`
                    },
                    body
                }
            }
            , invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
        }),

    })
})


export const {
      useGetOrdersQuery
    , useCreateOrderMutation
    , useGetOrdersByUserQuery
    , useUpdateOrderMutation
    , useCreateOrderAdminMutation
    , useGetOrdersByDayQuery
    , useGetOrdersChartQuery } = orderApi