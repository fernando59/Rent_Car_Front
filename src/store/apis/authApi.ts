import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const BASE_URL = process.env.REACT_APP_API_URL

interface ResponseAuth {
    token: string
    expiration: string
}
interface ILogin {
    email: string
    password: string
}
interface IRegister {
    username: string
    email: string
    password: string
}
interface UsersList {
    id: string
    email: string
    username: string
}
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (body: ILogin) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body
                }
            },

        }),
        register: builder.mutation({
            query: (body: IRegister) => {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body
                }
            },
            // transformResponse: (response: { dataOnly: any }, meta, arg) => response.dataOnly,
        }),
        getUsers: builder.query<UsersList[], void>({
            query: () => {
                return {
                    url: '/auth/getUsers',
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')!}`
                    },
                }
            },
            transformResponse: (response: { data: UsersList[] }, meta, arg) => response.data,

        }),
    })
})


export const { useLoginMutation, useRegisterMutation,useGetUsersQuery } = authApi