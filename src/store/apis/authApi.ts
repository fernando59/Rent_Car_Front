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
interface IRegister{
    username:string
    email:string
    password:string
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
        register:builder.mutation({
            query: (body: IRegister) => {
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body
                }
            }, 
        })
    })
})


export const { useLoginMutation,useRegisterMutation } = authApi